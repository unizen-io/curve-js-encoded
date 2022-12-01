import axios from "axios";
import memoize from "memoizee";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { curve } from "./curve";
import { IDict, IRoute, IRoute_, IRouteStep, IPoolData } from "./interfaces";
import {
    _getCoinAddresses,
    _getCoinDecimals,
    _getUsdRate,
    ensureAllowance,
    ensureAllowanceEstimateGas,
    fromBN,
    hasAllowance,
    isEth,
    toBN,
    parseUnits,
    _cutZeros,
    ETH_ADDRESS,
    _get_small_x,
    _get_price_impact,
} from "./utils";
import { getPool } from "./pools";
import { _getAmplificationCoefficientsFromApi } from "./pools/utils";

// --------------------------- LEGACY ROUTER ---------------------------

// Inspired by Dijkstra's algorithm
export const _findAllRoutesTheShorterTheBetter = async (inputCoinAddress: string, outputCoinAddress: string): Promise<IRouteStep[][]> => {
    inputCoinAddress = inputCoinAddress.toLowerCase();
    outputCoinAddress = outputCoinAddress.toLowerCase();

    const ALL_POOLS = Object.entries({
        ...curve.constants.POOLS_DATA,
        ...curve.constants.FACTORY_POOLS_DATA as IDict<IPoolData>,
        ...curve.constants.CRYPTO_FACTORY_POOLS_DATA as IDict<IPoolData>,
    });

    const basePoolsSet: Set<string> = new Set();
    for (const pool of ALL_POOLS) {
        if (pool[1].wrapped_coin_addresses.length < 6) basePoolsSet.add(pool[0]);
    }
    const basePoolIds = Array.from(basePoolsSet);


    // Coins for which all routes have already been found
    const markedCoins: string[] = [];
    // Coins we are searching routes for on the current step
    let curCoins: string[] = [inputCoinAddress];
    // Coins we will search routes for on the next step
    let nextCoins: Set<string> = new Set();
    // Routes for all coins found
    const routes: IDict<IRouteStep[][]> = {
        [inputCoinAddress]: [[]],
    };

    // No more than 4 steps (swaps)
    for (let step = 0; step < 4; step++) {
        for (const inCoin of curCoins) {
            for (const [poolId, poolData] of ALL_POOLS) {
                const wrapped_coin_addresses = poolData.wrapped_coin_addresses.map((a: string) => a.toLowerCase());
                const underlying_coin_addresses = poolData.underlying_coin_addresses.map((a: string) => a.toLowerCase());
                const base_pool = poolData.is_meta ? curve.constants.POOLS_DATA[poolData.base_pool as string] : null;
                const meta_coin_addresses = base_pool ? base_pool.underlying_coin_addresses.map((a: string) => a.toLowerCase()) : [];
                const token_address = poolData.token_address.toLowerCase();
                const is_lending = poolData.is_lending ?? false;

                const inCoinIndexes = {
                    wrapped_coin: wrapped_coin_addresses.indexOf(inCoin),
                    underlying_coin: underlying_coin_addresses.indexOf(inCoin),
                    meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inCoin) : -1,
                }

                // LP -> wrapped coin "swaps" (actually remove_liquidity_one_coin)
                if (basePoolIds.includes(poolId) && inCoin === token_address) {
                    for (let j = 0; j < wrapped_coin_addresses.length; j++) {
                        // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                        if (markedCoins.includes(wrapped_coin_addresses[j]) || curCoins.includes(wrapped_coin_addresses[j])) continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && wrapped_coin_addresses[j] !== outputCoinAddress) continue;

                        const swapType = poolId === 'aave' ? 11 : 10;
                        for (const inCoinRoute of routes[inCoin]) {
                            routes[wrapped_coin_addresses[j]] = (routes[wrapped_coin_addresses[j]] ?? []).concat(
                                [[
                                    ...inCoinRoute,
                                    {
                                        poolId,
                                        poolAddress: poolData.swap_address,
                                        inputCoinAddress: inCoin,
                                        outputCoinAddress: wrapped_coin_addresses[j],
                                        i: 0,
                                        j,
                                        swapType,
                                        swapAddress: ethers.constants.AddressZero,
                                    },
                                ]]
                            );
                        }

                        nextCoins.add(wrapped_coin_addresses[j]);
                    }
                }

                // Wrapped coin -> LP "swaps" (actually add_liquidity)
                if (basePoolIds.includes(poolId) && wrapped_coin_addresses.includes(inCoin)) {
                    let flag = true;
                    // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                    if (markedCoins.includes(token_address) || curCoins.includes(token_address)) flag = false;
                    // Looking for outputCoinAddress only on the final step
                    if (step === 3 && token_address !== outputCoinAddress) flag = false;

                    if (flag) {
                        const swapType = is_lending ? 9 : wrapped_coin_addresses.length === 2 ? 7 : 8;
                        for (const inCoinRoute of routes[inCoin]) {
                            routes[token_address] = (routes[token_address] ?? []).concat(
                                [[
                                    ...inCoinRoute,
                                    {
                                        poolId,
                                        poolAddress: poolData.swap_address,
                                        inputCoinAddress: inCoin,
                                        outputCoinAddress: token_address,
                                        i: wrapped_coin_addresses.indexOf(inCoin),
                                        j: 0,
                                        swapType,
                                        swapAddress: ethers.constants.AddressZero,
                                    },
                                ]]
                            );
                        }

                        nextCoins.add(token_address);
                    }
                }

                // No input coin in this pool --> skip
                if (inCoinIndexes.wrapped_coin === -1 && inCoinIndexes.underlying_coin === -1 && inCoinIndexes.meta_coin === -1) continue;

                // Wrapped swaps
                if (inCoinIndexes.wrapped_coin >= 0 && !poolData.is_fake) {
                    for (let j = 0; j < wrapped_coin_addresses.length; j++) {
                        // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                        if (markedCoins.includes(wrapped_coin_addresses[j]) || curCoins.includes(wrapped_coin_addresses[j])) continue;
                        // Native swaps spend less gas
                        if (wrapped_coin_addresses[j] !== outputCoinAddress && wrapped_coin_addresses[j] === curve.constants.NATIVE_TOKEN.wrappedAddress) continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && wrapped_coin_addresses[j] !== outputCoinAddress) continue;
                        // Skip empty pools
                        const tvl = Number(await (getPool(poolId)).stats.totalLiquidity());
                        if (tvl === 0) continue;

                        const swapType = poolData.is_crypto ? 3 : 1;
                        for (const inCoinRoute of routes[inCoin]) {
                            routes[wrapped_coin_addresses[j]] = (routes[wrapped_coin_addresses[j]] ?? []).concat(
                                [[
                                    ...inCoinRoute,
                                    {
                                        poolId,
                                        poolAddress: poolData.swap_address,
                                        inputCoinAddress: inCoin,
                                        outputCoinAddress: wrapped_coin_addresses[j],
                                        i: inCoinIndexes.wrapped_coin,
                                        j,
                                        swapType,
                                        swapAddress: ethers.constants.AddressZero,
                                    },
                                ]]
                            );
                        }

                        nextCoins.add(wrapped_coin_addresses[j]);
                    }
                }

                // Only for underlying swaps
                const poolAddress = (poolData.is_crypto && poolData.is_meta) || (base_pool?.is_lending && poolData.is_factory) ?
                    poolData.deposit_address as string : poolData.swap_address;

                // Underlying swaps
                if (!poolData.is_plain && inCoinIndexes.underlying_coin >= 0) {
                    for (let j = 0; j < underlying_coin_addresses.length; j++) {
                        // Don't swap metacoins since they can be swapped directly in base pool
                        if (inCoinIndexes.meta_coin >= 0 && meta_coin_addresses.includes(underlying_coin_addresses[j])) continue;
                        // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                        if (markedCoins.includes(underlying_coin_addresses[j]) || curCoins.includes(underlying_coin_addresses[j])) continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress) continue;
                        // Skip empty pools
                        const tvl = Number(await (getPool(poolId)).stats.totalLiquidity());
                        if (tvl === 0) continue;

                        const hasEth = (inCoin === curve.constants.NATIVE_TOKEN.address || underlying_coin_addresses[j] === curve.constants.NATIVE_TOKEN.address);
                        const swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) ? 6
                            : (base_pool?.is_lending && poolData.is_factory) ? 5
                            : hasEth ? 3
                            : poolData.is_crypto ? 4
                            : 2;
                        for (const inCoinRoute of routes[inCoin]) {
                            routes[underlying_coin_addresses[j]] = (routes[underlying_coin_addresses[j]] ?? []).concat(
                                [[
                                    ...inCoinRoute,
                                    {
                                        poolId,
                                        poolAddress,
                                        inputCoinAddress: inCoin,
                                        outputCoinAddress: underlying_coin_addresses[j],
                                        i: inCoinIndexes.underlying_coin,
                                        j,
                                        swapType,
                                        swapAddress: (swapType === 5 || swapType === 6) ? poolData.swap_address : ethers.constants.AddressZero,
                                    },
                                ]]
                            );
                        }

                        nextCoins.add(underlying_coin_addresses[j]);
                    }
                }
            }
        }

        // If target output coin is reached, search is finished. Assumption: the shorter route, the better.
        if (outputCoinAddress in routes) break;

        markedCoins.push(...curCoins);
        curCoins = Array.from(nextCoins);
        nextCoins = new Set();
    }

    return routes[outputCoinAddress] ?? []
}

const getNewRoute = (
    route: IRoute_,
    poolId: string,
    poolAddress: string,
    inputCoinAddress: string,
    outputCoinAddress: string,
    i: number,
    j: number,
    swapType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14,
    swapAddress: string,
    tvl: number
): IRoute_ => {
    const routePoolIds = route.steps.map((s) => s.poolId);
    // Steps <= 4
    if (routePoolIds.length >= 4) return { steps: [], minTvl: Infinity, totalTvl: 0 };
    // Exclude such cases as cvxeth -> tricrypto2 -> tricrypto2 -> susd
    if (routePoolIds.includes(poolId)) return { steps: [], minTvl: Infinity, totalTvl: 0 };
    return {
        steps: [...route.steps, { poolId, poolAddress, inputCoinAddress, outputCoinAddress, i, j, swapType, swapAddress }],
        minTvl: Math.min(tvl, route.minTvl),
        totalTvl: route.totalTvl + tvl,
    }
}

// --------------------------- MAIN ROUTER ---------------------------

const MAX_ROUTES_FOR_ONE_COIN = 3;
const filterRoutes = (routes: IRoute_[], inputCoinAddress: string, sortFn: (a: IRoute_, b: IRoute_) => number) => {
    const routesByPoolIds = routes.map((r) => r.steps.map((s) => s.poolId).toString());
    return routes
        .filter((r) => r.steps.length > 0)
        .filter((r) => r.steps[0].inputCoinAddress === inputCoinAddress) // Truncated routes
        .filter((r, i) => routesByPoolIds.indexOf(r.steps.map((s) => s.poolId).toString()) === i) // Route duplications
        .sort(sortFn).slice(0, MAX_ROUTES_FOR_ONE_COIN);
}

const sortByTvl = (a: IRoute_, b: IRoute_) => b.minTvl - a.minTvl || b.totalTvl - a.totalTvl || a.steps.length - b.steps.length;
const sortByLength = (a: IRoute_, b: IRoute_) => a.steps.length - b.steps.length || b.minTvl - a.minTvl || b.totalTvl - a.totalTvl;

// Inspired by Dijkstra's algorithm
export const _findAllRoutesTvl = async (inputCoinAddress: string, outputCoinAddress: string): Promise<IRouteStep[][]> => {
    inputCoinAddress = inputCoinAddress.toLowerCase();
    outputCoinAddress = outputCoinAddress.toLowerCase();

    const ALL_POOLS = Object.entries({
        ...curve.constants.POOLS_DATA,
        ...curve.constants.FACTORY_POOLS_DATA as IDict<IPoolData>,
        ...curve.constants.CRYPTO_FACTORY_POOLS_DATA as IDict<IPoolData>,
    });
    const amplificationCoefficientDict = await _getAmplificationCoefficientsFromApi();

    // Coins we are searching routes for on the current step
    let curCoins: string[] = [inputCoinAddress];
    // Coins we will search routes for on the next step
    let nextCoins: Set<string> = new Set();
    // Routes for all coins found
    const routesByTvl: IDict<IRoute_[]> = {
        [inputCoinAddress]: [{ steps: [], minTvl: Infinity, totalTvl: 0 }],
    };
    const routesByLength: IDict<IRoute_[]> = {
        [inputCoinAddress]: [{ steps: [], minTvl: Infinity, totalTvl: 0 }],
    };

    // No more than 4 steps (swaps)
    for (let step = 0; step < 4; step++) {
        for (const inCoin of curCoins) {
            for (const [poolId, poolData] of ALL_POOLS) {
                const wrapped_coin_addresses = poolData.wrapped_coin_addresses.map((a: string) => a.toLowerCase());
                const underlying_coin_addresses = poolData.underlying_coin_addresses.map((a: string) => a.toLowerCase());
                const base_pool = poolData.is_meta ? curve.constants.POOLS_DATA[poolData.base_pool as string] : null;
                const meta_coin_addresses = base_pool ? base_pool.underlying_coin_addresses.map((a: string) => a.toLowerCase()) : [];
                const token_address = poolData.token_address.toLowerCase();
                const is_lending = poolData.is_lending ?? false;
                const tvlMultiplier = poolData.is_crypto ? 1 : (amplificationCoefficientDict[poolData.swap_address] ?? 1);

                const inCoinIndexes = {
                    wrapped_coin: wrapped_coin_addresses.indexOf(inCoin),
                    underlying_coin: underlying_coin_addresses.indexOf(inCoin),
                    meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inCoin) : -1,
                }

                // Skip pools which don't contain inCoin
                if (inCoinIndexes.wrapped_coin === -1 && inCoinIndexes.underlying_coin === -1 && inCoinIndexes.meta_coin === -1 && inCoin !== token_address) continue;

                const tvl = Number(await (getPool(poolId)).stats.totalLiquidity()) * tvlMultiplier;
                // Skip empty pools
                if (tvl === 0) continue;

                let poolAddress = poolData.is_fake ? poolData.deposit_address as string : poolData.swap_address;
                const coin_addresses = (is_lending || poolData.is_fake) ? underlying_coin_addresses : wrapped_coin_addresses;

                // LP -> wrapped coin (underlying for lending or fake pool) "swaps" (actually remove_liquidity_one_coin)
                if (coin_addresses.length < 6 && inCoin === token_address) {
                    for (let j = 0; j < coin_addresses.length; j++) {
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && coin_addresses[j] !== outputCoinAddress) continue;

                        // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                        const outputCoinIdx = coin_addresses.indexOf(outputCoinAddress);
                        if (outputCoinIdx >= 0 && j !== outputCoinIdx) continue;

                        const swapType = poolData.is_crypto ? 14 : is_lending ? 13 : 12;

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                coin_addresses[j],
                                0,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                coin_addresses[j],
                                0,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[coin_addresses[j]] = [...(routesByTvl[coin_addresses[j]] ?? []), ...newRoutesByTvl]
                        routesByTvl[coin_addresses[j]] = filterRoutes(routesByTvl[coin_addresses[j]], inputCoinAddress, sortByTvl);

                        routesByLength[coin_addresses[j]] = [...(routesByLength[coin_addresses[j]] ?? []), ...newRoutesByLength]
                        routesByLength[coin_addresses[j]] = filterRoutes(routesByLength[coin_addresses[j]], inputCoinAddress, sortByLength);

                        nextCoins.add(coin_addresses[j]);
                    }
                }

                // Wrapped coin (underlying for lending or fake pool) -> LP "swaps" (actually add_liquidity)
                const inCoinIndex = (is_lending || poolData.is_fake) ? inCoinIndexes.underlying_coin : inCoinIndexes.wrapped_coin;
                if (coin_addresses.length < 6 && inCoinIndex >= 0) {
                    // Looking for outputCoinAddress only on the final step
                    if (!(step === 3 && token_address !== outputCoinAddress)) {
                        // const swapType = is_lending ? 9 : wrapped_coin_addresses.length === 2 ? 7 : 8;  // TODO change for atricrypto3 base pool
                        const swapType = is_lending ? 9
                            : coin_addresses.length === 2 ? 7
                            : coin_addresses.length === 3 ? 8
                            : coin_addresses.length === 4 ? 10 : 11;

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                token_address,
                                coin_addresses.indexOf(inCoin),
                                0,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                token_address,
                                coin_addresses.indexOf(inCoin),
                                0,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[token_address] = [...(routesByTvl[token_address] ?? []), ...newRoutesByTvl]
                        routesByTvl[token_address] = filterRoutes(routesByTvl[token_address], inputCoinAddress, sortByTvl);

                        routesByLength[token_address] = [...(routesByLength[token_address] ?? []), ...newRoutesByLength];
                        routesByLength[token_address] = filterRoutes(routesByLength[token_address], inputCoinAddress, sortByLength);

                        nextCoins.add(token_address);
                    }
                }

                // Wrapped swaps
                if (inCoinIndexes.wrapped_coin >= 0 && !poolData.is_fake) {
                    for (let j = 0; j < wrapped_coin_addresses.length; j++) {
                        if (j === inCoinIndexes.wrapped_coin) continue;
                        // Native swaps spend less gas
                        if (wrapped_coin_addresses[j] !== outputCoinAddress && wrapped_coin_addresses[j] === curve.constants.NATIVE_TOKEN.wrappedAddress) continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && wrapped_coin_addresses[j] !== outputCoinAddress) continue;
                        // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                        const outputCoinIdx = wrapped_coin_addresses.indexOf(outputCoinAddress);
                        if (outputCoinIdx >= 0 && j !== outputCoinIdx) continue;

                        const swapType = poolData.is_crypto ? 3 : 1;

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                wrapped_coin_addresses[j],
                                inCoinIndexes.wrapped_coin,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                wrapped_coin_addresses[j],
                                inCoinIndexes.wrapped_coin,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[wrapped_coin_addresses[j]] = [...(routesByTvl[wrapped_coin_addresses[j]] ?? []), ...newRoutesByTvl];
                        routesByTvl[wrapped_coin_addresses[j]] = filterRoutes(routesByTvl[wrapped_coin_addresses[j]], inputCoinAddress, sortByTvl);

                        routesByLength[wrapped_coin_addresses[j]] = [...(routesByLength[wrapped_coin_addresses[j]] ?? []), ...newRoutesByLength];
                        routesByLength[wrapped_coin_addresses[j]] = filterRoutes(routesByLength[wrapped_coin_addresses[j]], inputCoinAddress, sortByLength);

                        nextCoins.add(wrapped_coin_addresses[j]);
                    }
                }

                // Only for underlying swaps
                poolAddress = (poolData.is_crypto && poolData.is_meta) || (base_pool?.is_lending && poolData.is_factory) ?
                    poolData.deposit_address as string : poolData.swap_address;

                // Underlying swaps
                if (!poolData.is_plain && inCoinIndexes.underlying_coin >= 0) {
                    for (let j = 0; j < underlying_coin_addresses.length; j++) {
                        if (j === inCoinIndexes.underlying_coin) continue;
                        // Don't swap metacoins since they can be swapped directly in base pool
                        if (inCoinIndexes.meta_coin >= 0 && meta_coin_addresses.includes(underlying_coin_addresses[j])) continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress) continue;
                        // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                        const outputCoinIdx = underlying_coin_addresses.indexOf(outputCoinAddress);
                        if (outputCoinIdx >= 0 && j !== outputCoinIdx) continue;

                        // Skip empty pools
                        const tvl = Number(await (getPool(poolId)).stats.totalLiquidity());
                        if (tvl === 0) continue;

                        const hasEth = (inCoin === curve.constants.NATIVE_TOKEN.address || underlying_coin_addresses[j] === curve.constants.NATIVE_TOKEN.address);
                        const swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) ? 6
                            : (base_pool?.is_lending && poolData.is_factory) ? 5
                            : hasEth ? 3
                            : poolData.is_crypto ? 4
                            : 2;

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                underlying_coin_addresses[j],
                                inCoinIndexes.underlying_coin,
                                j,
                                swapType,
                                (swapType === 5 || swapType === 6) ? poolData.swap_address : ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                underlying_coin_addresses[j],
                                inCoinIndexes.underlying_coin,
                                j,
                                swapType,
                                (swapType === 5 || swapType === 6) ? poolData.swap_address : ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[underlying_coin_addresses[j]] = [...(routesByTvl[underlying_coin_addresses[j]] ?? []), ...newRoutesByTvl];
                        routesByTvl[underlying_coin_addresses[j]] = filterRoutes(routesByTvl[underlying_coin_addresses[j]], inputCoinAddress, sortByTvl);

                        routesByLength[underlying_coin_addresses[j]] = [...(routesByLength[underlying_coin_addresses[j]] ?? []), ...newRoutesByLength];
                        routesByLength[underlying_coin_addresses[j]] = filterRoutes(routesByLength[underlying_coin_addresses[j]], inputCoinAddress, sortByLength);

                        nextCoins.add(underlying_coin_addresses[j]);
                    }
                }
            }
        }

        curCoins = Array.from(nextCoins);
        nextCoins = new Set();
    }

    const routes = [...(routesByTvl[outputCoinAddress] ?? []), ...(routesByLength[outputCoinAddress] ?? [])];
    return routes.map((r) => r.steps);
}

export const _findAllRoutes = async (inputCoinAddress: string, outputCoinAddress: string): Promise<IRouteStep[][]> => {
    return await _findAllRoutesTvl(inputCoinAddress, outputCoinAddress);
    // if (routes.length > 0) return routes;
    //
    // return await _findAllRoutesTheShorterTheBetter(inputCoinAddress, outputCoinAddress);
}

const _getRouteKey = (route: IRoute, inputCoinAddress: string, outputCoinAddress: string): string => {
    const sortedCoins = [inputCoinAddress, outputCoinAddress].sort();
    let key = `${sortedCoins[0]}-->`;
    for (const routeStep of route.steps) {
        key += `${routeStep.poolId}-->`;
    }
    key += sortedCoins[1];

    return key
}

const _getExchangeMultipleArgs = (inputCoinAddress: string, route: IRoute): { _route: string[], _swapParams: number[][], _factorySwapAddresses: string[] } => {
    let _route = [inputCoinAddress];
    let _swapParams = [];
    let _factorySwapAddresses = [];
    for (const routeStep of route.steps) {
        _route.push(routeStep.poolAddress, routeStep.outputCoinAddress);
        _swapParams.push([routeStep.i, routeStep.j, routeStep.swapType]);
        _factorySwapAddresses.push(routeStep.swapAddress);
    }
    _route = _route.concat(Array(9 - _route.length).fill(ethers.constants.AddressZero));
    _swapParams = _swapParams.concat(Array(4 - _swapParams.length).fill([0, 0, 0]));
    _factorySwapAddresses = _factorySwapAddresses.concat(Array(4 - _factorySwapAddresses.length).fill(ethers.constants.AddressZero));

    return { _route, _swapParams, _factorySwapAddresses }
}

const _estimatedGasForDifferentRoutesCache: IDict<{ gas: ethers.BigNumber, time: number }> = {};

const _estimateGasForDifferentRoutes = async (routes: IRoute[], inputCoinAddress: string, outputCoinAddress: string, _amount: ethers.BigNumber): Promise<number[]> => {
    inputCoinAddress = inputCoinAddress.toLowerCase();
    outputCoinAddress = outputCoinAddress.toLowerCase();

    const contract = curve.contracts[curve.constants.ALIASES.registry_exchange].contract;
    const gasPromises: Promise<ethers.BigNumber>[] = [];
    const value = isEth(inputCoinAddress) ? _amount : ethers.BigNumber.from(0);
    for (const route of routes) {
        const routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
        let gasPromise: Promise<ethers.BigNumber>;
        const { _route, _swapParams, _factorySwapAddresses } = _getExchangeMultipleArgs(inputCoinAddress, route);

        if ((_estimatedGasForDifferentRoutesCache[routeKey]?.time || 0) + 3600000 < Date.now()) {
            gasPromise = contract.estimateGas.exchange_multiple(_route, _swapParams, _amount, 0, _factorySwapAddresses, { ...curve.constantOptions, value});
        } else {
            gasPromise = Promise.resolve(_estimatedGasForDifferentRoutesCache[routeKey].gas);
        }

        gasPromises.push(gasPromise);
    }

    try {
        const _gasAmounts: ethers.BigNumber[] = await Promise.all(gasPromises);

        routes.forEach((route, i: number) => {
            const routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
            _estimatedGasForDifferentRoutesCache[routeKey] = { 'gas': _gasAmounts[i], 'time': Date.now() };
        })

        return _gasAmounts.map((_g) => Number(ethers.utils.formatUnits(_g, 0)));
    } catch (err) { // No allowance
        return routes.map(() => 0);
    }
}

const _getBestRouteAndOutput = memoize(
    async (inputCoinAddress: string, outputCoinAddress: string, amount: number | string): Promise<IRoute> => {
        const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals(inputCoinAddress, outputCoinAddress);
        const _amount = parseUnits(amount, inputCoinDecimals);
        if (_amount.eq(0)) return {
            steps: [],
            _output: ethers.BigNumber.from(0),
            outputUsd: 0,
            txCostUsd: 0,
        }

        const routesRaw: IRoute[] = (await _findAllRoutes(inputCoinAddress, outputCoinAddress)).map(
            (steps) => ({ steps, _output: ethers.BigNumber.from(0), outputUsd: 0, txCostUsd: 0 })
        );
        const routes: IRoute[] = [];

        try {
            const calls = [];
            const multicallContract = curve.contracts[curve.constants.ALIASES.registry_exchange].multicallContract;
            for (const route of routesRaw) {
                const { _route, _swapParams, _factorySwapAddresses } = _getExchangeMultipleArgs(inputCoinAddress, route);
                calls.push(multicallContract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses));
            }

            const _outputAmounts = await curve.multicallProvider.all(calls) as ethers.BigNumber[];

            for (let i = 0; i < _outputAmounts.length; i++) {
                routesRaw[i]._output = _outputAmounts[i];
                routes.push(routesRaw[i]);
            }
        } catch (err) {
            const promises = [];
            const contract = curve.contracts[curve.constants.ALIASES.registry_exchange].contract;
            for (const route of routesRaw) {
                const { _route, _swapParams, _factorySwapAddresses } = _getExchangeMultipleArgs(inputCoinAddress, route);
                promises.push(contract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses, curve.constantOptions));
            }

            // @ts-ignore
            const res = await Promise.allSettled(promises);

            for (let i = 0; i < res.length; i++) {
                if (res[i].status === 'rejected') {
                    console.log(`Route ${(routesRaw[i].steps.map((s) => s.poolId)).join(" --> ")} is unavailable`);
                    continue;
                }
                routesRaw[i]._output = res[i].value;
                routes.push(routesRaw[i]);
            }
        }

        if (routes.length === 0) {
            return {
                steps: [],
                _output: ethers.BigNumber.from(0),
                outputUsd: 0,
                txCostUsd: 0,
            }
        }
        if (routes.length === 1) return routes[0];

        const [gasAmounts, outputCoinUsdRate, gasData, ethUsdRate] = await Promise.all([
            _estimateGasForDifferentRoutes(routes, inputCoinAddress, outputCoinAddress, _amount),
            _getUsdRate(outputCoinAddress),
            axios.get("https://api.curve.fi/api/getGas"),
            _getUsdRate(ETH_ADDRESS),
        ]);
        const gasPrice = gasData.data.data.gas.standard;
        const expectedAmounts = (routes).map(
            (route) => Number(ethers.utils.formatUnits(route._output, outputCoinDecimals))
        );

        const expectedAmountsUsd = expectedAmounts.map((a) => a * outputCoinUsdRate);
        const txCostsUsd = gasAmounts.map((a) => ethUsdRate * a * gasPrice / 1e18);

        routes.forEach((route, i) => {
            route.outputUsd = expectedAmountsUsd[i];
            route.txCostUsd = txCostsUsd[i]
        });

        return  routes.reduce((route1, route2) => {
            const diff = (route1.outputUsd - route1.txCostUsd) - (route2.outputUsd - route2.txCostUsd);
            if (diff > 0) return route1
            if (diff === 0 && route1.steps.length < route2.steps.length) return route1
            return route2
        });
    },
    {
        promise: true,
        maxAge: 5 * 60 * 1000, // 5m
    }
)

export const getBestRouteAndOutput = async (inputCoin: string, outputCoin: string, amount: number | string): Promise<{ route: IRouteStep[], output: string }> => {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses(inputCoin, outputCoin);
    const [outputCoinDecimals] = _getCoinDecimals(outputCoinAddress);

    const { steps, _output } = await _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount);

    return { route: steps, output: ethers.utils.formatUnits(_output, outputCoinDecimals) }
}

export const swapExpected = async (inputCoin: string, outputCoin: string, amount: number | string): Promise<string> => {
    return (await getBestRouteAndOutput(inputCoin, outputCoin, amount))['output'];
}

export const swapPriceImpact = async (inputCoin: string, outputCoin: string, amount: number | string): Promise<number> => {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses(inputCoin, outputCoin);
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals(inputCoinAddress, outputCoinAddress);
    const route = await _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount);
    const _amount = parseUnits(amount, inputCoinDecimals);
    const _output = route._output;

    const smallAmountIntBN = _get_small_x(_amount, _output, inputCoinDecimals, outputCoinDecimals);
    const amountIntBN = toBN(_amount, 0);
    if (smallAmountIntBN.gte(amountIntBN)) return 0;

    const contract = curve.contracts[curve.constants.ALIASES.registry_exchange].contract;
    const _smallAmount = fromBN(smallAmountIntBN.div(10 ** inputCoinDecimals), inputCoinDecimals);
    const { _route, _swapParams, _factorySwapAddresses } = _getExchangeMultipleArgs(inputCoinAddress, route);
    const _smallOutput = await contract.get_exchange_multiple_amount(_route, _swapParams, _smallAmount, _factorySwapAddresses, curve.constantOptions);
    const priceImpactBN = _get_price_impact(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);

    return Number(_cutZeros(priceImpactBN.toFixed(4)))
}

export const swapIsApproved = async (inputCoin: string, amount: number | string): Promise<boolean> => {
    return await hasAllowance([inputCoin], [amount], curve.signerAddress, curve.constants.ALIASES.registry_exchange);
}

export const swapApproveEstimateGas = async (inputCoin: string, amount: number | string): Promise<number> => {
    return await ensureAllowanceEstimateGas([inputCoin], [amount], curve.constants.ALIASES.registry_exchange);
}

export const swapApprove = async (inputCoin: string, amount: number | string): Promise<string[]> => {
    return await ensureAllowance([inputCoin], [amount], curve.constants.ALIASES.registry_exchange);
}

export const swapEstimateGas = async (inputCoin: string, outputCoin: string, amount: number | string): Promise<number> => {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses(inputCoin, outputCoin);
    const [inputCoinDecimals] = _getCoinDecimals(inputCoinAddress, outputCoinAddress);
    const route = await _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount);
    if (route.steps.length === 0) return 0

    const _amount = parseUnits(amount, inputCoinDecimals);
    const [gas] = await _estimateGasForDifferentRoutes([route], inputCoinAddress, outputCoinAddress, _amount);
    return gas
}

export const swap = async (inputCoin: string, outputCoin: string, amount: number | string, slippage = 0.5): Promise<string> => {
    const [inputCoinAddress, outputCoinAddress] = _getCoinAddresses(inputCoin, outputCoin);
    const [inputCoinDecimals, outputCoinDecimals] = _getCoinDecimals(inputCoinAddress, outputCoinAddress);

    await swapApprove(inputCoin, amount);
    const route = await _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount);

    if (route.steps.length === 0) {
        throw new Error("This pair can't be exchanged");
    }

    const { _route, _swapParams, _factorySwapAddresses } = _getExchangeMultipleArgs(inputCoinAddress, route);
    const _amount = parseUnits(amount, inputCoinDecimals);
    const minRecvAmountBN: BigNumber = toBN(route._output, outputCoinDecimals).times(100 - slippage).div(100);
    const _minRecvAmount = fromBN(minRecvAmountBN, outputCoinDecimals);

    const contract = curve.contracts[curve.constants.ALIASES.registry_exchange].contract;
    const value = isEth(inputCoinAddress) ? _amount : ethers.BigNumber.from(0);

    await curve.updateFeeData();
    const gasLimit = (await contract.estimateGas.exchange_multiple(
        _route,
        _swapParams,
        _amount,
        _minRecvAmount,
        _factorySwapAddresses,
        { ...curve.constantOptions, value }
    )).mul(curve.chainId === 1 ? 130 : 160).div(100);
    return (await contract.exchange_multiple(_route, _swapParams, _amount, _minRecvAmount, _factorySwapAddresses, { ...curve.options, value, gasLimit })).hash
}
