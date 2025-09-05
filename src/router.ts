import BigNumber from "bignumber.js";
import {ethers} from "ethers";
import {type Curve, OLD_CHAINS} from "./curve.js";
import {IChainId, IDict, IPoolData, IRoute, IRouteOutputAndCost, IRouteStep, IRouteTvl, ISwapType} from "./interfaces";
import {
    _cutZeros,
    _get_price_impact,
    _get_small_x,
    _getCoinAddresses,
    _getCoinDecimals,
    _getUsdRate,
    BN,
    DIGas,
    ensureAllowance,
    ensureAllowanceEstimateGas,
    ETH_ADDRESS,
    fromBN,
    getGasPriceFromL1,
    getTxCostsUsd,
    hasAllowance,
    isEth,
    parseUnits,
    runWorker,
    smartNumber,
    toBN,
} from "./utils.js";
import { getPoolForStatLiquidity } from "./pools/index.js";
import { _getAmplificationCoefficientsFromApi } from "./pools/utils.js";
import { L2Networks } from "./constants/L2Networks.js";

import {getPool} from "./pools/index.js";
import {IRouteGraphInput, routeGraphWorker, routeGraphWorkerCode} from "./route-graph.worker.js";
import {memoizeMethod} from "./constants/utils.js";
import memoize from "memoizee";
import { curve } from "./curve.js";

const MAX_STEPS = 5;
const ROUTE_LENGTH = (MAX_STEPS * 2) + 1;
const GRAPH_MAX_EDGES = 3;
const MAX_ROUTES_FOR_ONE_COIN = 5; // these chains have non-ng pools

const _removeDuplications = (routes: IRouteTvl[]) => {
    return routes.filter((r, i, _routes) => {
        const routesByPoolIds = _routes.map((r) => r.route.map((s) => s.poolId).toString());
        return routesByPoolIds.indexOf(r.route.map((s) => s.poolId).toString()) === i;
    })
}

async function entriesToDictAsync<T, U>(entries: [string, T][], mapper: (key: string, value: T) => Promise<U>): Promise<IDict<U>> {
    const result: IDict<U> = {};
    await Promise.all(entries.map(async ([key, value]) => result[key] = await mapper(key, value)));
    return result;
}

const _sortByTvl = (a: IRouteTvl, b: IRouteTvl) => b.minTvl - a.minTvl || b.totalTvl - a.totalTvl || a.route.length - b.route.length;
const _sortByLength = (a: IRouteTvl, b: IRouteTvl) => a.route.length - b.route.length || b.minTvl - a.minTvl || b.totalTvl - a.totalTvl;

const _getTVL = memoize(
    async (poolId: string, poolData: IPoolData) => {
        const pool = getPoolForStatLiquidity(poolId, poolData);
        return Number(await pool.stats.totalLiquidity())
    },
    {
        promise: true,
        maxAge: 5 * 60 * 1000, // 5m
    });

// 4 --> 6, 5 --> 7 not allowed
// 4 --> 7, 5 --> 6 allowed
const _handleSwapType = (swapType: ISwapType): string => {
    if (swapType === 6) return "4";
    if (swapType === 7) return "5";
    return swapType.toString();
}

const SNX = {
    10: {
        swap: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4".toLowerCase(),
        coins: [  // Optimism
            "0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9", // sUSD
            "0xFBc4198702E81aE77c06D58f81b629BDf36f0a71", // sEUR
            "0xe405de8f52ba7559f9df3c368500b6e6ae6cee49", // sETH
            "0x298b9b95708152ff6968aafd889c6586e9169f1d", // sBTC
        ].map((a) => a.toLowerCase()),
    },
}

function mapDict<T, U>(dict: IDict<T>, mapper: (key: string, value: T) => U): IDict<U> {
    const result: IDict<U> = {};
    Object.entries(dict).forEach(([key, value]) => result[key] = mapper(key, value));
    return result;
}

async function _buildRouteGraphImpl(this: Curve, chainId: IChainId, isLiteChain: boolean): Promise<IDict<IDict<IRouteStep[]>>> {
    const constants = this.constants;
    const allPools = Object.entries(this.getPoolsData()).filter(([id]) => !["crveth", "y", "busd", "pax", "susd"].includes(id));
    const amplificationCoefficientDict = await _getAmplificationCoefficientsFromApi.call(this);
    const poolTvlDict: IDict<number> = await entriesToDictAsync(allPools, _getTVL.bind(this));
    const input: IRouteGraphInput = { constants, chainId, isLiteChain, allPools, amplificationCoefficientDict, poolTvlDict };
    return runWorker(routeGraphWorkerCode, routeGraphWorker, {type: 'createRouteGraph', ...input});
}

const _buildRouteGraph = memoize(async (ALL_POOLS_DATA: IDict<IPoolData>): Promise<IDict<IDict<IRouteStep[]>>> => {
    const routerGraph: IDict<IDict<IRouteStep[]>> = {}

    // ETH <-> WETH (exclude Celo)
    if (curve.chainId !== 42220) {
        routerGraph[curve.constants.NATIVE_TOKEN.address] = {};
        routerGraph[curve.constants.NATIVE_TOKEN.address][curve.constants.NATIVE_TOKEN.wrappedAddress] = [{
            poolId: "WETH wrapper",
            swapAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
            inputCoinAddress: curve.constants.NATIVE_TOKEN.address,
            outputCoinAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
            swapParams: [0, 0, 8, 0, 0],
            poolAddress: curve.constants.ZERO_ADDRESS,
            basePool: curve.constants.ZERO_ADDRESS,
            baseToken: curve.constants.ZERO_ADDRESS,
            secondBasePool: curve.constants.ZERO_ADDRESS,
            secondBaseToken: curve.constants.ZERO_ADDRESS,
            tvl: Infinity,
        }];

        routerGraph[curve.constants.NATIVE_TOKEN.wrappedAddress] = {};
        routerGraph[curve.constants.NATIVE_TOKEN.wrappedAddress][curve.constants.NATIVE_TOKEN.address] = [{
            poolId: "WETH wrapper",
            swapAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
            inputCoinAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
            outputCoinAddress: curve.constants.NATIVE_TOKEN.address,
            swapParams: [0, 0, 8, 0, 0],
            poolAddress: curve.constants.ZERO_ADDRESS,
            basePool: curve.constants.ZERO_ADDRESS,
            baseToken: curve.constants.ZERO_ADDRESS,
            secondBasePool: curve.constants.ZERO_ADDRESS,
            secondBaseToken: curve.constants.ZERO_ADDRESS,
            tvl: Infinity,
        }];
    }

    // ETH -> stETH, ETH -> frxETH, ETH -> wBETH (Ethereum only)
    if (curve.chainId === 1) {
        for (const outCoin of ["stETH", "frxETH", "wBETH"]) {
            routerGraph[curve.constants.NATIVE_TOKEN.address][curve.constants.COINS[outCoin.toLowerCase()]] = [{
                poolId: outCoin + " minter",
                swapAddress: outCoin === "frxETH" ? "0xbAFA44EFE7901E04E39Dad13167D089C559c1138".toLowerCase() : curve.constants.COINS[outCoin.toLowerCase()],
                inputCoinAddress: curve.constants.NATIVE_TOKEN.address,
                outputCoinAddress: curve.constants.COINS[outCoin.toLowerCase()],
                swapParams: [0, 0, 8, 0, 0],
                poolAddress: curve.constants.ZERO_ADDRESS,
                basePool: curve.constants.ZERO_ADDRESS,
                baseToken: curve.constants.ZERO_ADDRESS,
                secondBasePool: curve.constants.ZERO_ADDRESS,
                secondBaseToken: curve.constants.ZERO_ADDRESS,
                tvl: Infinity,
            }]
        }

        // stETH <-> wstETH (Ethereum only)
        routerGraph[curve.constants.COINS.steth] = {};
        routerGraph[curve.constants.COINS.steth][curve.constants.COINS.wsteth] = [{
            poolId: "wstETH wrapper",
            swapAddress: curve.constants.COINS.wsteth,
            inputCoinAddress: curve.constants.COINS.steth,
            outputCoinAddress: curve.constants.COINS.wsteth,
            swapParams: [0, 0, 8, 0, 0],
            poolAddress: curve.constants.ZERO_ADDRESS,
            basePool: curve.constants.ZERO_ADDRESS,
            baseToken: curve.constants.ZERO_ADDRESS,
            secondBasePool: curve.constants.ZERO_ADDRESS,
            secondBaseToken: curve.constants.ZERO_ADDRESS,
            tvl: Infinity,
        }];

        routerGraph[curve.constants.COINS.wsteth] = {};
        routerGraph[curve.constants.COINS.wsteth][curve.constants.COINS.steth] = [{
            poolId: "wstETH wrapper",
            swapAddress: curve.constants.COINS.wsteth,
            inputCoinAddress: curve.constants.COINS.wsteth,
            outputCoinAddress: curve.constants.COINS.steth,
            swapParams: [0, 0, 8, 0, 0],
            poolAddress: curve.constants.ZERO_ADDRESS,
            basePool: curve.constants.ZERO_ADDRESS,
            baseToken: curve.constants.ZERO_ADDRESS,
            secondBasePool: curve.constants.ZERO_ADDRESS,
            secondBaseToken: curve.constants.ZERO_ADDRESS,
            tvl: Infinity,
        }];

        // frxETH <-> sfrxETH (Ethereum only)
        routerGraph[curve.constants.COINS.frxeth] = {};
        routerGraph[curve.constants.COINS.frxeth][curve.constants.COINS.sfrxeth] = [{
            poolId: "sfrxETH wrapper",
            swapAddress: curve.constants.COINS.sfrxeth,
            inputCoinAddress: curve.constants.COINS.frxeth,
            outputCoinAddress: curve.constants.COINS.sfrxeth,
            swapParams: [0, 0, 8, 0, 0],
            poolAddress: curve.constants.ZERO_ADDRESS,
            basePool: curve.constants.ZERO_ADDRESS,
            baseToken: curve.constants.ZERO_ADDRESS,
            secondBasePool: curve.constants.ZERO_ADDRESS,
            secondBaseToken: curve.constants.ZERO_ADDRESS,
            tvl: Infinity,
        }];

        routerGraph[curve.constants.COINS.sfrxeth] = {};
        routerGraph[curve.constants.COINS.sfrxeth][curve.constants.COINS.frxeth] = [{
            poolId: "sfrxETH wrapper",
            swapAddress: curve.constants.COINS.sfrxeth,
            inputCoinAddress: curve.constants.COINS.sfrxeth,
            outputCoinAddress: curve.constants.COINS.frxeth,
            swapParams: [0, 0, 8, 0, 0],
            poolAddress: curve.constants.ZERO_ADDRESS,
            basePool: curve.constants.ZERO_ADDRESS,
            baseToken: curve.constants.ZERO_ADDRESS,
            secondBasePool: curve.constants.ZERO_ADDRESS,
            secondBaseToken: curve.constants.ZERO_ADDRESS,
            tvl: Infinity,
        }];
    }

    // SNX swaps
    if (curve.chainId in SNX) {
        // @ts-ignore
        for (const inCoin of SNX[curve.chainId].coins) {
            // @ts-ignore
            for (const outCoin of SNX[curve.chainId].coins) {
                if (inCoin === outCoin) continue;

                if (!routerGraph[inCoin]) routerGraph[inCoin] = {};
                routerGraph[inCoin][outCoin] = [{
                    poolId: "SNX exchanger",
                    // @ts-ignore
                    swapAddress: SNX[curve.chainId].swap,
                    inputCoinAddress: inCoin,
                    outputCoinAddress: outCoin,
                    swapParams: [0, 0, 9, 0, 0],
                    poolAddress: curve.constants.ZERO_ADDRESS,
                    basePool: curve.constants.ZERO_ADDRESS,
                    baseToken: curve.constants.ZERO_ADDRESS,
                    secondBasePool: curve.constants.ZERO_ADDRESS,
                    secondBaseToken: curve.constants.ZERO_ADDRESS,
                    tvl: Infinity,
                }];
            }
        }
    }

    // const ALL_POOLS_DATA = curve.getPoolsData();
    // const ALL_POOLS = Object.entries(ALL_POOLS_DATA).filter(([id, _]) => !["crveth", "y", "busd", "pax"].includes(id));

    // const BASE_POOL = { ...curve.constants.POOLS_DATA, ...curve.constants.FACTORY_POOLS_DATA };
    // const SECOND_BASE_POOL = {
    //     ...curve.constants.POOLS_DATA,
    //     ...curve.constants.FACTORY_POOLS_DATA,
    //     ...curve.constants.CRVUSD_FACTORY_POOLS_DATA,
    // }

    const amplificationCoefficientDict = curve.poolAmplifications; 

    for (const poolId in ALL_POOLS_DATA) {
        const poolData = ALL_POOLS_DATA[poolId];
        if (["crveth", "y", "busd", "pax"].includes(poolId)) continue;
        
        const wrappedCoinAddresses = poolData.wrapped_coin_addresses;
        const underlyingCoinAddresses = poolData.underlying_coin_addresses;
        const poolAddress = poolData.swap_address;
        const tokenAddress = poolData.token_address;
        const isAaveLikeLending = poolData.is_lending && wrappedCoinAddresses.length === 3 && !poolData.deposit_address;
        // pool_type: 1 - stable, 2 - twocrypto, 3 - tricrypto, 4 - llamma
        //            10 - stable-ng, 20 - twocrypto-ng, 30 - tricrypto-ng
        let poolType = poolData.is_llamma ? 4 : poolData.is_crypto ? Math.min(poolData.wrapped_coins.length, 3) : 1;
        if (poolData.is_ng) poolType *= 10;
        const tvlMultiplier = poolData.is_crypto ? 1 : (amplificationCoefficientDict[poolData.swap_address] ?? 1);
        // const tvlMultiplier = poolData.is_crypto ? 1 : (poolData.amplification_coeff ?? 1);
        const basePool = poolData.is_meta ? ALL_POOLS_DATA[poolData.base_pool as string] : null; // ALL_POOLS_DATA is original BASE_POOL
        const basePoolAddress = basePool ? basePool.swap_address : curve.constants.ZERO_ADDRESS;
        let baseTokenAddress = basePool ? basePool.token_address : curve.constants.ZERO_ADDRESS;
        const secondBasePool = basePool && basePool.base_pool ? ALL_POOLS_DATA[basePool.base_pool as string] : null; // ALL_POOLS_DATA is original SECOND_BASE_POOL
        const secondBasePoolAddress = secondBasePool ? secondBasePool.swap_address : curve.constants.ZERO_ADDRESS;
        // for double meta underlying (crv/tricrypto, wmatic/tricrypto)
        if (basePool && secondBasePoolAddress !== curve.constants.ZERO_ADDRESS) baseTokenAddress = basePool.deposit_address as string;
        const secondBaseTokenAddress = secondBasePool ? secondBasePool.token_address : curve.constants.ZERO_ADDRESS;
        const metaCoinAddresses = basePool ? basePool.underlying_coin_addresses : [];
        let swapAddress = poolData.is_fake ? poolData.deposit_address as string : poolAddress;
        
        const tvl = (await _getTVL(poolId, poolData)) * tvlMultiplier;

        // Skip empty pools
        if (curve.chainId === 1 && tvl < 10000) continue;
        if (curve.chainId !== 1 && tvl < 1000) continue;

        const excludedUnderlyingSwaps = (poolId === 'ib' && curve.chainId === 1) ||
                                        (poolId === 'geist' && curve.chainId === 250) ||
                                        (poolId === 'saave' && curve.chainId === 1);

        // Wrapped coin <-> LP "swaps" (actually add_liquidity/remove_liquidity_one_coin)
        if (!poolData.is_fake && !poolData.is_llamma && wrappedCoinAddresses.length < 6) {
            const coins = [tokenAddress, ...wrappedCoinAddresses];
            for (let k = 0; k < coins.length; k++) {
                for (let l = 0; l < coins.length; l++) {
                    if (k > 0 && l > 0) continue;
                    if (k == 0 && l == 0) continue;
                    const i = Math.max(k - 1, 0);
                    const j = Math.max(l - 1, 0);
                    const swapType = k == 0 ? 6 : 4;

                    if (!routerGraph[coins[k]]) routerGraph[coins[k]] = {};
                    if (!routerGraph[coins[k]][coins[l]]) routerGraph[coins[k]][coins[l]] = [];
                    routerGraph[coins[k]][coins[l]].push({
                        poolId,
                        swapAddress,
                        inputCoinAddress: coins[k],
                        outputCoinAddress: coins[l],
                        swapParams: [i, j, swapType, poolType, wrappedCoinAddresses.length],
                        poolAddress: curve.constants.ZERO_ADDRESS,
                        basePool: curve.constants.ZERO_ADDRESS,
                        baseToken: curve.constants.ZERO_ADDRESS,
                        secondBasePool: curve.constants.ZERO_ADDRESS,
                        secondBaseToken: curve.constants.ZERO_ADDRESS,
                        tvl,
                    });
                }
            }
        }

        // Underlying coin <-> LP "swaps" (actually add_liquidity/remove_liquidity_one_coin)
        if ((poolData.is_fake || isAaveLikeLending) && underlyingCoinAddresses.length < 6 && !excludedUnderlyingSwaps) {
            const coins = [tokenAddress, ...underlyingCoinAddresses];
            for (let k = 0; k < coins.length; k++) {
                for (let l = 0; l < coins.length; l++) {
                    if (k > 0 && l > 0) continue;
                    if (k == 0 && l == 0) continue;
                    const i = Math.max(k - 1, 0);
                    const j = Math.max(l - 1, 0);
                    let swapType: ISwapType = isAaveLikeLending ? 7 : 6;
                    if (k > 0) swapType = isAaveLikeLending ? 5 : 4;

                    if (!routerGraph[coins[k]]) routerGraph[coins[k]] = {};
                    if (!routerGraph[coins[k]][coins[l]]) routerGraph[coins[k]][coins[l]] = [];
                    routerGraph[coins[k]][coins[l]].push({
                        poolId,
                        swapAddress,
                        inputCoinAddress: coins[k],
                        outputCoinAddress: coins[l],
                        swapParams: [i, j, swapType, poolType, underlyingCoinAddresses.length],
                        poolAddress: curve.constants.ZERO_ADDRESS,
                        basePool: curve.constants.ZERO_ADDRESS,
                        baseToken: curve.constants.ZERO_ADDRESS,
                        secondBasePool: curve.constants.ZERO_ADDRESS,
                        secondBaseToken: curve.constants.ZERO_ADDRESS,
                        tvl,
                    });
                }
            }
        }

        // Wrapped swaps
        if (!poolData.is_fake) {
            for (let i = 0; i < wrappedCoinAddresses.length; i++) {
                for (let j = 0; j < wrappedCoinAddresses.length; j++) {
                    if (i == j) continue;
                    if (!routerGraph[wrappedCoinAddresses[i]]) routerGraph[wrappedCoinAddresses[i]] = {};
                    if (!routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]]) routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]] = [];
                    routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]] = routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]].concat({
                        poolId,
                        swapAddress,
                        inputCoinAddress: wrappedCoinAddresses[i],
                        outputCoinAddress: wrappedCoinAddresses[j],
                        swapParams: [i, j, 1, poolType, wrappedCoinAddresses.length],
                        poolAddress,
                        basePool: basePoolAddress,
                        baseToken: baseTokenAddress,
                        secondBasePool: secondBasePoolAddress,
                        secondBaseToken: secondBaseTokenAddress,
                        tvl,
                    }).sort((a, b) => b.tvl - a.tvl).slice(0, GRAPH_MAX_EDGES);
                }
            }
        }

        // Only for underlying swaps
        swapAddress = (poolData.is_crypto && poolData.is_meta) || (basePool?.is_lending && poolData.is_factory) ?
            poolData.deposit_address as string : poolData.swap_address;

        // Underlying swaps
        if (!poolData.is_plain && !excludedUnderlyingSwaps) {
            for (let i = 0; i < underlyingCoinAddresses.length; i++) {
                for (let j = 0; j < underlyingCoinAddresses.length; j++) {
                    if (i === j) continue;
                    // Don't swap metacoins since they can be swapped directly in base pool
                    if (metaCoinAddresses.includes(underlyingCoinAddresses[i]) && metaCoinAddresses.includes(underlyingCoinAddresses[j])) continue;
                    // avWBTC is frozen by Aave on Avalanche, deposits are not working
                    if (curve.chainId === 43114 && poolId === "atricrypto" && i === 3) continue;

                    const hasEth = underlyingCoinAddresses.includes(curve.constants.NATIVE_TOKEN.address);
                    const swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) || (basePool?.is_lending && poolData.is_factory) ? 3
                        : hasEth && poolId !== 'avaxcrypto' ? 1 : 2;

                    if (!routerGraph[underlyingCoinAddresses[i]]) routerGraph[underlyingCoinAddresses[i]] = {};
                    if (!routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]]) routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]] = [];
                    routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]] = routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]].concat({
                        poolId,
                        swapAddress,
                        inputCoinAddress: underlyingCoinAddresses[i],
                        outputCoinAddress: underlyingCoinAddresses[j],
                        swapParams: [i, j, swapType, poolType, underlyingCoinAddresses.length],
                        poolAddress,
                        basePool: basePoolAddress,
                        baseToken: baseTokenAddress,
                        secondBasePool: secondBasePoolAddress,
                        secondBaseToken: secondBaseTokenAddress,
                        tvl,
                    }).sort((a, b) => b.tvl - a.tvl).slice(0, GRAPH_MAX_EDGES);
                }
            }
        }
    }
    return routerGraph
},
{
    promise: true,
    maxAge: 5 * 1000, // 5m
});

const _isVisitedCoin = (coinAddress: string, route: IRouteTvl): boolean => {
    return route.route.findIndex((item: IRouteStep) => item.inputCoinAddress === coinAddress) !== -1;
    // return route.route.map((r) => r.inputCoinAddress).includes(coinAddress);
}

const _isVisitedPool = (poolId: string, route: IRouteTvl): boolean => {
    return route.route.findIndex((item: IRouteStep) => item.poolId === poolId) !== -1;
    // return route.route.map((r) => r.poolId).includes(poolId);
}

// Breadth-first search
const _findRoutes = async (inputCoinAddress: string, outputCoinAddress: string): Promise<IRoute[]>  => {
    inputCoinAddress = inputCoinAddress.toLowerCase();
    outputCoinAddress = outputCoinAddress.toLowerCase();

    const routes: IRouteTvl[] = [{ route: [], minTvl: Infinity, totalTvl: 0 }];
    let targetRoutes: IRouteTvl[] = [];
    
    const ALL_POOLS = curve.getPoolsData();
    const routerGraph = await _buildRouteGraph(ALL_POOLS);

    while (routes.length > 0) {
        // @ts-ignore
        const route: IRouteTvl = routes.pop();
        const inCoin = route.route.length > 0 ? route.route[route.route.length - 1].outputCoinAddress : inputCoinAddress;

        if (inCoin === outputCoinAddress) {
            targetRoutes.push(route);
        } else if (route.route.length < 5) {
            const routePoolIdsPlusSwapType = route.route.map((s) => s.poolId + "+" + _handleSwapType(s.swapParams[2]));
            
            for (const outCoin in routerGraph[inCoin]) {
                if (_isVisitedCoin(outCoin, route)) continue;

                for (const step of routerGraph[inCoin][outCoin]) {
                    const poolData = ALL_POOLS[step.poolId];
                   
                    if (!poolData?.is_lending && _isVisitedPool(step.poolId, route)) continue;

                    // 4 --> 6, 5 --> 7 not allowed
                    // 4 --> 7, 5 --> 6 allowed
                    if (routePoolIdsPlusSwapType.includes(step.poolId + "+" + _handleSwapType(step.swapParams[2]))) continue;

                    const poolCoins = poolData ? poolData.wrapped_coin_addresses.concat(poolData.underlying_coin_addresses) : [];
                    const poolCoinsIncludesOutputCoin = poolCoins.includes(outputCoinAddress) && outCoin !== outputCoinAddress;
                    // Exclude such cases as:
                    // cvxeth -> tricrypto2 -> tusd -> susd (cvxeth -> tricrypto2 -> tusd instead)
                    if (!poolData?.is_lending && poolCoinsIncludesOutputCoin) continue;
                    // Exclude such cases as:
                    // aave -> aave -> 3pool (aave -> aave instead)
                    if (poolData?.is_lending && poolCoinsIncludesOutputCoin && outCoin !== poolData.token_address) continue;
                    
                    routes.push({
                        route: [...route.route, step],
                        minTvl: Math.min(step.tvl, route.minTvl),
                        totalTvl: route.totalTvl + step.tvl,
                    });
                }
            }
        }
    }

    targetRoutes = _removeDuplications([
        ...targetRoutes.sort(_sortByTvl).slice(0, MAX_ROUTES_FOR_ONE_COIN),
        ...targetRoutes.sort(_sortByLength).slice(0, MAX_ROUTES_FOR_ONE_COIN),
    ]);
   
    return targetRoutes.map((r) => r.route);
}

/* async function _findRoutes(this: Curve, inputCoinAddress: string, outputCoinAddress: string): Promise<IRoute[]> {
    const _buildRouteGraph = memoizeMethod(this, '_buildRouteGraph', _buildRouteGraphImpl);
    const routerGraph = await _buildRouteGraph.call(this, this.chainId, this.isLiteChain); // It's important to pass chainId to not use cache from another network
    // extract only the fields we need for the worker
    const poolData = mapDict(
        this.getPoolsData(),
        (_, { is_lending, wrapped_coin_addresses, underlying_coin_addresses, token_address }) => ({ is_lending, wrapped_coin_addresses, underlying_coin_addresses, token_address })
    );
    const input: IRouterWorkerInput = {inputCoinAddress, outputCoinAddress, routerGraph, poolData};
    return runWorker(routeFinderWorkerCode, routeFinderWorker, {type: 'findRoutes', ...input});
} */

const _getRouteKey = (route: IRoute, inputCoinAddress: string, outputCoinAddress: string): string => {
    const sortedCoins = [inputCoinAddress, outputCoinAddress].sort();
    let key = `${sortedCoins[0]}-->`;
    for (const routeStep of route) {
        key += `${routeStep.poolId}-->`;
    }
    key += sortedCoins[1];
    return key
}

function _getExchangeArgs(this: Curve, route: IRoute): {
    _route: string[],
    _swapParams: number[][],
    _pools?: string[],
    _basePools?: string[],
    _baseTokens?: string[],
    _secondBasePools?: string[],
    _secondBaseTokens?: string[]
} {
    if (OLD_CHAINS.includes(this.chainId)) {
        let _route = [];
        if (route.length > 0) _route.push(route[0].inputCoinAddress);
        let _swapParams = [];
        let _pools = [];
        let _basePools = [];
        let _baseTokens = [];
        let _secondBasePools = [];
        let _secondBaseTokens = [];
        for (const routeStep of route) {
            _route.push(routeStep.swapAddress, routeStep.outputCoinAddress);
            _swapParams.push(routeStep.swapParams);
            _pools.push(routeStep.poolAddress);
            _basePools.push(routeStep.basePool);
            _baseTokens.push(routeStep.baseToken);
            _secondBasePools.push(routeStep.secondBasePool);
            _secondBaseTokens.push(routeStep.secondBaseToken);
        }
        _route = _route.concat(Array(ROUTE_LENGTH - _route.length).fill(this.constants.ZERO_ADDRESS));
        _swapParams = _swapParams.concat(Array(MAX_STEPS - _swapParams.length).fill([0, 0, 0, 0, 0]));
        _pools = _pools.concat(Array(MAX_STEPS - _pools.length).fill(this.constants.ZERO_ADDRESS));
        _basePools = _basePools.concat(Array(MAX_STEPS - _basePools.length).fill(this.constants.ZERO_ADDRESS));
        _baseTokens = _baseTokens.concat(Array(MAX_STEPS - _baseTokens.length).fill(this.constants.ZERO_ADDRESS));
        _secondBasePools = _secondBasePools.concat(Array(MAX_STEPS - _secondBasePools.length).fill(this.constants.ZERO_ADDRESS));
        _secondBaseTokens = _secondBaseTokens.concat(Array(MAX_STEPS - _secondBaseTokens.length).fill(this.constants.ZERO_ADDRESS));

        return {_route, _swapParams, _pools, _basePools, _baseTokens, _secondBasePools, _secondBaseTokens}
    } else {  // RouterNgPoolsOnly
        let _route = [];
        if (route.length > 0) _route.push(route[0].inputCoinAddress);
        let _swapParams = [];
        for (const routeStep of route) {
            _route.push(routeStep.swapAddress, routeStep.outputCoinAddress);
            _swapParams.push(routeStep.swapParams.slice(0, 4));
        }
        _route = _route.concat(Array(ROUTE_LENGTH - _route.length).fill(this.constants.ZERO_ADDRESS));
        _swapParams = _swapParams.concat(Array(MAX_STEPS - _swapParams.length).fill([0, 0, 0, 0]));

        return {_route, _swapParams}
    }
}

const _estimatedGasForDifferentRoutesCache: IDict<{ gas: bigint | bigint[], time: number }> = {};

async function _estimateGasForDifferentRoutes(this: Curve, routes: IRoute[], inputCoinAddress: string, outputCoinAddress: string, _amount: bigint): Promise<Array<number | number[]>> {
    inputCoinAddress = inputCoinAddress.toLowerCase();
    outputCoinAddress = outputCoinAddress.toLowerCase();

    const contract = this.contracts[this.constants.ALIASES.router].contract;
    const gasPromises: Promise<bigint | bigint[]>[] = [];
    const value = isEth(inputCoinAddress) ? _amount : this.parseUnits("0");
    for (const route of routes) {
        const routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
        let gasPromise: Promise<bigint | bigint[]>;
        const {_route, _swapParams, _pools} = _getExchangeArgs.call(this, route);

        if ((_estimatedGasForDifferentRoutesCache[routeKey]?.time || 0) + 3600000 < Date.now()) {
            if (_pools) {
                gasPromise = contract.exchange.estimateGas(_route, _swapParams, _amount, 0, _pools, { ...this.constantOptions, value});
            } else {
                gasPromise = contract.exchange.estimateGas(_route, _swapParams, _amount, 0, { ...this.constantOptions, value});
            }
        } else {
            gasPromise = Promise.resolve(_estimatedGasForDifferentRoutesCache[routeKey].gas);
        }

        gasPromises.push(gasPromise);
    }
    try {
        const _gasAmounts: Array<bigint | bigint[]> = await Promise.all(gasPromises);

        routes.forEach((route, i: number) => {
            const routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
            _estimatedGasForDifferentRoutesCache[routeKey] = {'gas': _gasAmounts[i], 'time': Date.now()};
        })

        return _gasAmounts.map((_g) => smartNumber(_g));
    } catch { // No allowance
        return routes.map(() => 0);
    }
}

/* const _getBestRoute = memoize(
    async (inputCoinAddress: string, outputCoinAddress: string, amount: number | string): Promise<IRouteOutputAndCost | undefined> => {
        const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals(inputCoinAddress, outputCoinAddress);
        const _amount = parseUnits(amount, inputCoinDecimals);
        if (_amount === curve.parseUnits("0")) return undefined;

        const routesRaw: IRouteOutputAndCost[] = (await _findRoutes(inputCoinAddress, outputCoinAddress)).map(
            (route) => ({ route, _output: curve.parseUnits("0"), outputUsd: 0, txCostUsd: 0 })
        );
       
        const routes: IRouteOutputAndCost[] = [];

        try {
            const calls = [];
            const contract = curve.contracts[curve.constants.ALIASES.router].contract;
            const abi = contract.interface.fragments as any;
            for (const r of routesRaw) {
                const { _route, _swapParams, _pools } = _getExchangeArgs(r.route);
                const params = _pools ? [_route, _swapParams, _amount, _pools] : [_route, _swapParams, _amount];
                calls.push({                       
                    address: curve.constants.ALIASES.router as `0x${string}`,
                    functionName: "get_dy",
                    args: params,
                    abi: abi,                         
                })
            }

            const multiCallResult = await curve.viemProvider.multicall({ contracts: calls });

            for (let i = 0; i < multiCallResult.length; i++) {
                if (multiCallResult[i].status !== 'success') {
                    console.log(`Route ${(routesRaw[i].route.map((s) => s.poolId)).join(" --> ")} is unavailable`);
                    continue;
                }
                routesRaw[i]._output = multiCallResult[i].result as bigint;
                routes.push(routesRaw[i]);
            }
        } catch (err) {
            const contract = curve.contracts[curve.constants.ALIASES.router].contract;
            const _outputs = [];
            
            for (const r of routesRaw) {
                const { _route, _swapParams, _pools } = _getExchangeArgs(r.route);
                try {
                    if (_pools) {
                        _outputs.push(await contract.get_dy(_route, _swapParams, _amount, _pools, curve.constantOptions));
                    } else {
                        _outputs.push(await contract.get_dy(_route, _swapParams, _amount, curve.constantOptions));
                    }
                } catch (e) {
                    _outputs.push(curve.parseUnits('-1', 0));
                }
            }
    
            for (let i = 0; i < _outputs.length; i++) {
                if (_outputs[i] < 0) {
                    console.log(`Route ${(routesRaw[i].route.map((s) => s.poolId)).join(" --> ")} is unavailable`);
                    continue;
                }
                routesRaw[i]._output = _outputs[i];
                routes.push(routesRaw[i]);
            }
        }
        if (routes.length === 0) return undefined;
        if (routes.length === 1) return routes[0];

        const gasAmounts = Array(routes.length).fill(0);
        const [outputCoinUsdRate, ethUsdRate] = await Promise.all([
            // _estimateGasForDifferentRoutes(routes.map((r) => r.route), inputCoinAddress, outputCoinAddress, _amount),
            _getUsdRate(outputCoinAddress),
            // axios.get("https://api.curve.fi/api/getGas"),
            _getUsdRate(ETH_ADDRESS),
        ]);

        // const gasPrice = gasData.data.data.gas.standard;
        const gasPrice = 1;
        const expectedAmounts = (routes).map(
            (route) => Number(curve.formatUnits(route._output, outputCoinDecimals))
        );

        const expectedAmountsUsd = expectedAmounts.map((a) => a * outputCoinUsdRate);
        const L1GasPrice = 0; // L2Networks.includes(curve.chainId) ? await getGasPriceFromL1() : 0;

        const txCostsUsd = gasAmounts.map((a) => getTxCostsUsd(ethUsdRate, gasPrice, a, L1GasPrice));

        routes.forEach((route, i) => {
            route.outputUsd = expectedAmountsUsd[i];
            route.txCostUsd = txCostsUsd[i]
        });

        return routes.reduce((route1, route2) => {
            const diff = (route1.outputUsd - route1.txCostUsd) - (route2.outputUsd - route2.txCostUsd);
            if (diff > 0) return route1
            if (diff === 0 && route1.route.length < route2.route.length) return route1
            return route2
        });
    },
    {
        promise: true,
        maxAge: 5 * 60 * 1000, // 5m
    }
) */

/* const _getOutputForRoute = memoize(
    async (route: IRoute, _amount: bigint): Promise<bigint> => {
        const contract = curve.contracts[curve.constants.ALIASES.router].contract;
        const { _route, _swapParams, _pools } = _getExchangeArgs(route);
        if (_pools) {
            return await contract.get_dy(_route, _swapParams, _amount, _pools, curve.constantOptions);
        } else {
            return await contract.get_dy(_route, _swapParams, _amount, curve.constantOptions);
        }
    },
    {
        promise: true,
        maxAge: 15 * 1000, // 15s
    }
); */

async function _getBestRouteImpl(this: Curve, inputCoinAddress: string, outputCoinAddress: string, amount: number | string): Promise<IRoute> {
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals.call(this, inputCoinAddress, outputCoinAddress);
    const _amount = parseUnits(amount, inputCoinDecimals);
    if (_amount === this.parseUnits("0")) return [];

    const routesRaw: IRouteOutputAndCost[] = (await _findRoutes.call(this, inputCoinAddress, outputCoinAddress)).map(
        (route) => ({route, _output: this.parseUnits("0"), outputUsd: 0, txCostUsd: 0})
    );
    const routes: IRouteOutputAndCost[] = [];

    try {
        const calls = [];
        const multicallContract = this.contracts[this.constants.ALIASES.router].multicallContract;
        for (const r of routesRaw) {
            const {_route, _swapParams, _pools} = _getExchangeArgs.call(this, r.route);
            if (_pools) {
                calls.push(multicallContract.get_dy(_route, _swapParams, _amount, _pools));
            } else {
                calls.push(multicallContract.get_dy(_route, _swapParams, _amount));
            }
        }

        const _outputAmounts = await this.multicallProvider.all(calls) as bigint[];

        for (let i = 0; i < _outputAmounts.length; i++) {
            routesRaw[i]._output = _outputAmounts[i];
            routes.push(routesRaw[i]);
        }
    } catch {
        // const promises = [];
        // const contract = this.contracts[this.constants.ALIASES.router].contract;
        // for (const r of routesRaw) {
        //     const { _route, _swapParams, _pools } = _getExchangeArgs(r.route);
        //     promises.push(contract.get_dy(_route, _swapParams, _amount, _pools, this.constantOptions));
        // }
        //
        // const res = await Promise.allSettled(promises);
        //
        // for (let i = 0; i < res.length; i++) {
        //     if (res[i].status === 'rejected') {
        //         console.log(`Route ${(routesRaw[i].route.map((s) => s.poolId)).join(" --> ")} is unavailable`);
        //         continue;
        //     }
        //     routesRaw[i]._output = (res[i] as PromiseFulfilledResult<bigint>).value;
        //     routes.push(routesRaw[i]);
        // }

        const contract = this.contracts[this.constants.ALIASES.router].contract;
        const _outputs = [];
        for (const r of routesRaw) {
            const {_route, _swapParams, _pools} = _getExchangeArgs.call(this, r.route);
            try {
                if (_pools) {
                    _outputs.push(await contract.get_dy(_route, _swapParams, _amount, _pools, this.constantOptions));
                } else {
                    _outputs.push(await contract.get_dy(_route, _swapParams, _amount, this.constantOptions));
                }
            } catch {
                _outputs.push(this.parseUnits('-1', 0));
            }
        }

        for (let i = 0; i < _outputs.length; i++) {
            if (_outputs[i] < 0) {
                console.log(`Route ${(routesRaw[i].route.map((s) => s.poolId)).join(" --> ")} is unavailable`);
                continue;
            }
            routesRaw[i]._output = _outputs[i];
            routes.push(routesRaw[i]);
        }
    }
    if (routes.length === 0) return [];
    if (routes.length === 1) return routes[0].route;

    const [gasAmounts, outputCoinUsdRate, gasData, ethUsdRate] = await Promise.all([
        _estimateGasForDifferentRoutes.call(this, routes.map((r) => r.route), inputCoinAddress, outputCoinAddress, _amount),
        _getUsdRate.call(this, outputCoinAddress),
        fetch("https://api.curve.finance/api/getGas").then((res) => res.json()),
        _getUsdRate.call(this, ETH_ADDRESS),
    ]);
    const gasPrice = gasData.data.gas.standard;
    const expectedAmounts = (routes).map(
        (route) => Number(this.formatUnits(route._output, outputCoinDecimals))
    );

    const expectedAmountsUsd = expectedAmounts.map((a) => a * outputCoinUsdRate);

    const L1GasPrice = L2Networks.includes(this.chainId) ? await getGasPriceFromL1.call(this) : 0;

    const txCostsUsd = gasAmounts.map((a) => getTxCostsUsd(ethUsdRate, gasPrice, a, L1GasPrice));

    routes.forEach((route, i) => {
        route.outputUsd = expectedAmountsUsd[i];
        route.txCostUsd = txCostsUsd[i]
    });

    return routes.reduce((route1, route2) => {
        const diff = (route1.outputUsd - route1.txCostUsd) - (route2.outputUsd - route2.txCostUsd);
        if (diff > 0) return route1
        if (diff === 0 && route1.route.length < route2.route.length) return route1
        return route2
    }).route;
}

async function _getBestRoute(this: Curve, inputCoinAddress: string, outputCoinAddress: string, amount: number | string): Promise<IRoute> {
    return memoizeMethod(this, '_getBestRoute', _getBestRouteImpl).call(this, inputCoinAddress, outputCoinAddress, amount);
}

async function _getOutputForRouteImpl(this: Curve, route: IRoute, _amount: bigint): Promise<bigint> {
    const contract = this.contracts[this.constants.ALIASES.router].contract;
    const { _route, _swapParams, _pools } = _getExchangeArgs.call(this, route);
    if (_pools) {
        return await contract.get_dy(_route, _swapParams, _amount, _pools, this.constantOptions);
    } else {
        return await contract.get_dy(_route, _swapParams, _amount, this.constantOptions);
    }
}

async function _getOutputForRoute(this: Curve, route: IRoute, _amount: bigint): Promise<bigint> {
    return memoizeMethod(this, '_getOutputForRoute', _getOutputForRouteImpl).call(this, route, _amount);
}

const _routesCache: IDict<{ route: IRoute, output: string, timestamp: number }> = {};
function _getBestRouteAndOutput(this: Curve, inputCoin: string, outputCoin: string, amount: number | string): { route: IRoute, output: string, timestamp: number } {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses.call(this, inputCoin, outputCoin);
    const key = `${inputCoinAddress}-${outputCoinAddress}-${amount}`
    if (!(key in _routesCache)) throw Error("You must call getBestRouteAndOutput first");
    return _routesCache[key]
}
/* export const getBestRouteAndOutput = async (inputCoin: string, outputCoin: string, amount: number | string): Promise<{ route: IRoute, output: string }> => {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses(inputCoin, outputCoin);
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals(inputCoinAddress, outputCoinAddress);
    const bestRoute = await _getBestRoute(inputCoinAddress, outputCoinAddress, amount); // 5 minutes cache
    if (!bestRoute) return { route: [], output: '0.0' };

    // const _output = await _getOutputForRoute(bestRoute.route, parseUnits(amount, inputCoinDecimals)); // 15 seconds cache, so we call it to get fresh output estimation
    _routesCache[`${inputCoinAddress}-${outputCoinAddress}-${amount}`] = {
        route: bestRoute.route,
        output: curve.formatUnits(bestRoute._output + BigInt(1), outputCoinDecimals),
        timestamp: Date.now(),
    }

    return { route: bestRoute.route, output: curve.formatUnits(bestRoute._output + BigInt(1), outputCoinDecimals) } */

export async function getBestRouteAndOutput(this: Curve, inputCoin: string, outputCoin: string, amount: number | string): Promise<{ route: IRoute, output: string }> {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses.call(this, inputCoin, outputCoin);
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals.call(this, inputCoinAddress, outputCoinAddress);

    const route = await _getBestRoute.call(this, inputCoinAddress, outputCoinAddress, amount); // 5 minutes cache
    if (route.length === 0) return { route, output: '0.0' };

    const _output = await _getOutputForRoute.call(this, route, parseUnits(amount, inputCoinDecimals)); // 15 seconds cache, so we call it to get fresh output estimation
    _routesCache[`${inputCoinAddress}-${outputCoinAddress}-${amount}`] = {
        route,
        output: this.formatUnits(_output + BigInt(1), outputCoinDecimals),
        timestamp: Date.now(),
    }

    return { route, output: this.formatUnits(_output + BigInt(1), outputCoinDecimals) }
}

export function getArgs(this: Curve, route: IRoute): {
    _route: string[],
    _swapParams: number[][],
    _pools?: string[],
    _basePools?: string[],
    _baseTokens?: string[],
    _secondBasePools?: string[],
    _secondBaseTokens?: string[]
} {
    return _getExchangeArgs.call(this, route)
}

export async function swapExpected(this: Curve, inputCoin: string, outputCoin: string, amount: number | string): Promise<string> {
    return (await getBestRouteAndOutput.call(this, inputCoin, outputCoin, amount))['output']
}


export async function swapRequired(this: Curve, inputCoin: string, outputCoin: string, outAmount: number | string): Promise<string> {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses.call(this, inputCoin, outputCoin);
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals.call(this, inputCoinAddress, outputCoinAddress);
    const _outAmount = parseUnits(outAmount, outputCoinDecimals);
    const p1 = (await _getUsdRate.call(this, inputCoinAddress)) || 1;
    const p2 = (await _getUsdRate.call(this, outputCoinAddress)) || 1;
    const approximateRequiredAmount = Number(outAmount) * p2 / p1;
    const route = await _getBestRoute.call(this, inputCoinAddress, outputCoinAddress, approximateRequiredAmount);

    const contract = this.contracts[this.constants.ALIASES.router].contract;
    const { _route, _swapParams, _pools, _basePools, _baseTokens, _secondBasePools, _secondBaseTokens } = _getExchangeArgs.call(this, route);

    let _required;
    if ("get_dx(address[11],uint256[5][5],uint256,address[5],address[5],address[5],address[5],address[5])" in contract) {
        _required = await contract.get_dx(_route, _swapParams, _outAmount, _pools, _basePools, _baseTokens, _secondBasePools, _secondBaseTokens, this.constantOptions);
    } else if (_pools) {
        _required = await contract.get_dx(_route, _swapParams, _outAmount, _pools, _basePools, _baseTokens, this.constantOptions);
    } else {
        _required = await contract.get_dx(_route, _swapParams, _outAmount, this.constantOptions);
    }

    return this.formatUnits(_required, inputCoinDecimals)
}

export async function swapPriceImpact(this: Curve, inputCoin: string, outputCoin: string, amount: number | string): Promise<number> {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses.call(this, inputCoin, outputCoin);
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals.call(this, inputCoinAddress, outputCoinAddress);
    const { route, output } = _getBestRouteAndOutput.call(this, inputCoinAddress, outputCoinAddress, amount);
    const _amount = parseUnits(amount, inputCoinDecimals);
    const _output = parseUnits(output, outputCoinDecimals);

    const smallAmountIntBN = _get_small_x(_amount, _output, inputCoinDecimals, outputCoinDecimals);
    const amountIntBN = toBN(_amount, 0);
    if (smallAmountIntBN.gte(amountIntBN)) return 0;

    const contract = this.contracts[this.constants.ALIASES.router].contract;
    let _smallAmount = fromBN(smallAmountIntBN.div(10 ** inputCoinDecimals), inputCoinDecimals);
    const { _route, _swapParams, _pools } = _getExchangeArgs.call(this, route);
    let _smallOutput: bigint;
    try {
        if (_pools) {
            _smallOutput = await contract.get_dy(_route, _swapParams, _smallAmount, _pools, this.constantOptions);
        } else {
            _smallOutput = await contract.get_dy(_route, _swapParams, _smallAmount, this.constantOptions);
        }
    } catch {
        _smallAmount = this.parseUnits("1", inputCoinDecimals);  // Dirty hack
        if (_pools) {
            _smallOutput = await contract.get_dy(_route, _swapParams, _smallAmount, _pools, this.constantOptions);
        } else {
            _smallOutput = await contract.get_dy(_route, _swapParams, _smallAmount, this.constantOptions);
        }
    }
    const priceImpactBN = _get_price_impact(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);

    return Number(_cutZeros(priceImpactBN.toFixed(4)))
}

export async function swapIsApproved(this: Curve, inputCoin: string, amount: number | string): Promise<boolean> {
    return await hasAllowance.call(this, [inputCoin], [amount], this.signerAddress, this.constants.ALIASES.router);
}

export async function swapApproveEstimateGas(this: Curve, inputCoin: string, amount: number | string): Promise<number | number[]> {
    return await ensureAllowanceEstimateGas.call(this, [inputCoin], [amount], this.constants.ALIASES.router);
}

export async function swapApprove(this: Curve, inputCoin: string, amount: number | string): Promise<string[]> {
    return await ensureAllowance.call(this, [inputCoin], [amount], this.constants.ALIASES.router);
}

export async function swapEstimateGas(this: Curve, inputCoin: string, outputCoin: string, amount: number | string): Promise<number | number[]> {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses.call(this, inputCoin, outputCoin);
    const [inputCoinDecimals] = _getCoinDecimals.call(this, inputCoinAddress, outputCoinAddress);
    const { route } = _getBestRouteAndOutput.call(this, inputCoinAddress, outputCoinAddress, amount);
    if (route.length === 0) return 0

    const _amount = parseUnits(amount, inputCoinDecimals);
    const [gas] = await _estimateGasForDifferentRoutes.call(this, [route], inputCoinAddress, outputCoinAddress, _amount);
    return gas
}

export async function swap(this: Curve, inputCoin: string, outputCoin: string, amount: number | string, slippage = 0.5): Promise<ethers.ContractTransactionResponse> {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses.call(this, inputCoin, outputCoin);
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals.call(this, inputCoinAddress, outputCoinAddress);

    await swapApprove.call(this, inputCoin, amount);
    const { route, output } = _getBestRouteAndOutput.call(this, inputCoinAddress, outputCoinAddress, amount);

    if (route.length === 0) {
        throw new Error("This pair can't be exchanged");
    }

    const { _route, _swapParams, _pools } = _getExchangeArgs.call(this, route);
    const _amount = parseUnits(amount, inputCoinDecimals);
    const minRecvAmountBN: BigNumber = BN(output).times(100 - slippage).div(100);
    const _minRecvAmount = fromBN(minRecvAmountBN, outputCoinDecimals);

    const contract = this.contracts[this.constants.ALIASES.router].contract;
    const value = isEth(inputCoinAddress) ? _amount : this.parseUnits("0");

    await this.updateFeeData();
    if (_pools) {
        const gasLimit = (DIGas(await contract.exchange.estimateGas(
            _route,
            _swapParams,
            _amount,
            _minRecvAmount,
            _pools,
            { ...this.constantOptions, value }
        ))) * (this.chainId === 1 ? this.parseUnits("130", 0) : this.parseUnits("160", 0)) / this.parseUnits("100", 0);
        return await contract.exchange(_route, _swapParams, _amount, _minRecvAmount, _pools, { ...this.options, value, gasLimit });
    } else {
        const gasLimit = (DIGas(await contract.exchange.estimateGas(
            _route,
            _swapParams,
            _amount,
            _minRecvAmount,
            { ...this.constantOptions, value }
        ))) * this.parseUnits("160", 0) / this.parseUnits("100", 0);
        return await contract.exchange(_route, _swapParams, _amount, _minRecvAmount, { ...this.options, value, gasLimit });
    }
}

export async function getSwappedAmount(this: Curve, tx: ethers.ContractTransactionResponse, outputCoin: string): Promise<string> {
    const [outputCoinAddress] = _getCoinAddresses.call(this, outputCoin);
    const [outputCoinDecimals] = _getCoinDecimals.call(this, outputCoinAddress);
    const txInfo: ethers.ContractTransactionReceipt | null = await tx.wait();

    if (txInfo === null) return '0.0'

    let res;
    for (let i = 1; i <= txInfo.logs.length; i++) {
        try {
            const abiCoder = ethers.AbiCoder.defaultAbiCoder()
            res = abiCoder.decode(
                [`address[${ROUTE_LENGTH}]`, `uint256[${MAX_STEPS}][${MAX_STEPS}]`, `address[${MAX_STEPS}]`, 'uint256', 'uint256'],
                ethers.dataSlice(txInfo.logs[txInfo.logs.length - i].data, 0)
            );
            break;
        } catch {}
    }

    if (res === undefined) return '0.0'

    return this.formatUnits(res[res.length - 1], outputCoinDecimals);
}
