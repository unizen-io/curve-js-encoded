import curve from "./index";
import { ICalldata } from "./interfaces";

const rpc = "https://silent-white-wave.quiknode.pro/c4ad4fd208cc28788dff5c6ac55e445d91b6d88b/";
const chainId = 1;
const srcTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // weth polygon
// const srcTokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // usdc polygon
const dstTokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // usdt polygon
// const rpc = "https://arb1.arbitrum.io/rpc";
// const chainId = 42161;
// const srcTokenAddress = "0xca5ca9083702c56b481d1eec86f1776fdbd2e594"; // rsr polygon
// const dstTokenAddress = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"; // weth polygon
// const dstTokenAddress = "0xaf88d065e77c8cc2239327c5edb3a432268e5831"; // usdc polygon
// const rpc = "https://ancient-dry-friday.matic.quiknode.pro/8ff6b30f0829e4bded452e60d0bcf9ac712002db/";
// const chainId = 137;
// const srcTokenAddress = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'; // usdc polygon
// const dstTokenAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'; // usdt
// const srcTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'; // wmatic polygon
// const dstTokenAddress = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'; // usdc polygon
const amountIn = "10";

export const sleep = async (time: number) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

// To run this test:
// nvm use v18.16.0
// npx ts-node --project tsconfig.build.json src/test.ts
export const main = async () => {
    console.log("start");
    const start0 = new Date().getTime();
    await curve.init("JsonRpc", { url: rpc }, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0, chainId });
    await curve.factory.fetchPools(true);
    await curve.crvUSDFactory.fetchPools(true);
    await curve.EYWAFactory.fetchPools(true);
    await curve.cryptoFactory.fetchPools(true);
    await curve.twocryptoFactory.fetchPools(true);
    await curve.tricryptoFactory.fetchPools(true);
    await curve.stableNgFactory.fetchPools(true);
    await curve.getAmplificationCoefficientsFromApi();
    console.log("factory pool list", curve.factory.getPoolList().length);
    const start = new Date().getTime();
    const bestRouteAndOutput = await curve.router.getBestRouteAndOutput(srcTokenAddress, dstTokenAddress, amountIn);
    const end = new Date().getTime();
    console.log("fetch time", start - start0, "ms");
    console.log("total time", end - start, "ms");
    console.log(
        "bestRouteAndOutput",
        bestRouteAndOutput.route.map((item) => item.inputCoinAddress)
    );
    const swapTx = (await curve.router.swap(srcTokenAddress, dstTokenAddress, amountIn, 0.01, true)) as ICalldata;
    console.log("quote", swapTx.actualQuote);
    for (const [key,value] of Object.entries(process.memoryUsage())){
        console.log(`Memory usage by ${key}, ${value/1000000}MB `)
    }
    console.log("CPU usage", process.cpuUsage());
    // await sleep(60000*6);
    // console.log("Start get route second time")
    // const start2 = new Date().getTime()
    // await curve.router.getBestRouteAndOutput(
    //     srcTokenAddress,
    //     dstTokenAddress,
    //     amountIn
    // );
    // const end2 = new Date().getTime()
    // console.log("Done get route second time", end2 - start2, 'ms')
    // const swapTx1 = (await curve.router.swap(
    //     srcTokenAddress,
    //     dstTokenAddress,
    //     amountIn,
    //     0.01,
    //     true
    // )) as ICalldata;
    // console.log('quote', swapTx1.actualQuote)
};

main().catch((err) => {
    console.log("err", err);
});
