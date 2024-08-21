import curve from './index'
import {ICalldata} from './interfaces'

const rpc = "https://ancient-dry-friday.matic.quiknode.pro/8ff6b30f0829e4bded452e60d0bcf9ac712002db/";
const chainId = 137;
const srcTokenAddress = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'; // usdc polygon
const dstTokenAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'; // usdt
const amountIn = '10';

// To run this test:
// npx ts-node --project tsconfig.build.json src/test.ts
export const main = async () => {
    console.log('start')
    await curve.init("JsonRpc", { url: rpc }, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0, chainId });
    await curve.factory.fetchPools(true);
    await curve.crvUSDFactory.fetchPools(true);
    await curve.EYWAFactory.fetchPools(true);
    await curve.cryptoFactory.fetchPools(true);
    await curve.twocryptoFactory.fetchPools(true);
    await curve.tricryptoFactory.fetchPools(true);
    await curve.stableNgFactory.fetchPools(true);
    console.log('factory pool list',curve.factory.getPoolList().length)
    const start = new Date().getTime()
    const bestRouteAndOutput = await curve.router.getBestRouteAndOutput(
        srcTokenAddress,
        dstTokenAddress,
        amountIn
    );
    const end = new Date().getTime()
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
};

main().catch((err) => {
    console.log("err", err);
});
