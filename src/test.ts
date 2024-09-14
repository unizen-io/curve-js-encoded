import { resolve } from 'path';
import curve from './index'
import {ICalldata} from './interfaces'

const rpc = "https://ancient-dry-friday.matic.quiknode.pro/8ff6b30f0829e4bded452e60d0bcf9ac712002db/";
const chainId = 137;
const srcTokenAddress = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'; // usdc polygon
const dstTokenAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'; // usdt
const amountIn = '10';

export const sleep = async (time: number) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

// To run this test:
// nvm use v18.16.0
// npx ts-node --project tsconfig.build.json src/test.ts
export const main = async () => {
    console.log('start')
    const start0 = new Date().getTime()
    await curve.init("JsonRpc", { url: rpc }, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0, chainId });
    const in0 = new Date().getTime()
    await curve.factory.fetchPools(true);
    const in1 = new Date().getTime()
    console.log("one factory", in1-in0, 'ms')
    await curve.crvUSDFactory.fetchPools(true);
    await curve.EYWAFactory.fetchPools(true);
    await curve.cryptoFactory.fetchPools(true);
    await curve.twocryptoFactory.fetchPools(true);
    await curve.tricryptoFactory.fetchPools(true);
    await curve.stableNgFactory.fetchPools(true);
    await curve.getAmplificationCoefficientsFromApi();
    console.log('factory pool list',curve.factory.getPoolList().length)
    const start = new Date().getTime()
    const bestRouteAndOutput = await curve.router.getBestRouteAndOutput(
        srcTokenAddress,
        dstTokenAddress,
        amountIn
    );
    const end = new Date().getTime()
    console.log("fetch time", start-start0, 'ms')
    console.log("total time", end-start, 'ms')
    console.log('bestRouteAndOutput', bestRouteAndOutput.route.map((item)=>item.inputCoinAddress))
    const swapTx = (await curve.router.swap(
        srcTokenAddress,
        dstTokenAddress,
        amountIn,
        0.01,
        true
    )) as ICalldata; 
    console.log('quote', swapTx.actualQuote)

    await sleep(60000*6);
    console.log("Start get route second time")
    const start2 = new Date().getTime()
    await curve.router.getBestRouteAndOutput(
        srcTokenAddress,
        dstTokenAddress,
        amountIn
    );
    const end2 = new Date().getTime()
    console.log("Done get route second time", end2 - start2, 'ms')
    const swapTx1 = (await curve.router.swap(
        srcTokenAddress,
        dstTokenAddress,
        amountIn,
        0.01,
        true
    )) as ICalldata; 
    console.log('quote', swapTx1.actualQuote)
};

main().catch((err) => {
    console.log("err", err);
});
