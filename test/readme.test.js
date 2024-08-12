var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import curve from "../src/index.js";
var generalMethodsTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, balances1, balances2, spender, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _l.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, curve.getTVL()];
            case 2:
                _b.apply(_a, [_l.sent()]);
                // 7867623953.766793
                _d = (_c = console).log;
                return [4 /*yield*/, curve.getVolume()];
            case 3:
                // 7867623953.766793
                _d.apply(_c, [_l.sent()]);
                return [4 /*yield*/, curve.getBalances(['DAI', 'sUSD'])];
            case 4:
                balances1 = _l.sent();
                // OR const balances1 = await curve.getBalances(['0x6B175474E89094C44Da98b954EedeAC495271d0F', '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51']);
                console.log(balances1);
                return [4 /*yield*/, curve.getBalances(['aDAI', 'aSUSD'], "0x0063046686E46Dc6F15918b61AE2B121458534a5", "0x66aB6D9362d4F35596279692F0251Db635165871")];
            case 5:
                balances2 = _l.sent();
                // OR const balances2 = await curve.getBalances(['0x028171bCA77440897B824Ca71D1c56caC55b68A3', '0x6c5024cd4f8a59110119c56f8933403a539555eb'], ["0x0063046686E46Dc6F15918b61AE2B121458534a5", "0x66aB6D9362d4F35596279692F0251Db635165871"]);
                console.log(balances2);
                spender = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7" // 3pool swap address
                ;
                _f = (_e = console).log;
                return [4 /*yield*/, curve.getAllowance(["DAI", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"], curve.signerAddress, spender)];
            case 6:
                _f.apply(_e, [_l.sent()]);
                // [ '0.0', '0.0' ]
                _h = (_g = console).log;
                return [4 /*yield*/, curve.hasAllowance(["DAI", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"], ['1000', '1000'], curve.signerAddress, spender)];
            case 7:
                // [ '0.0', '0.0' ]
                _h.apply(_g, [_l.sent()]);
                // false
                _k = (_j = console).log;
                return [4 /*yield*/, curve.ensureAllowance(["DAI", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"], ['1000', '1000'], spender)];
            case 8:
                // false
                _k.apply(_j, [_l.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var availablePoolsTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _a.sent();
                return [4 /*yield*/, curve.factory.fetchPools()];
            case 2:
                _a.sent();
                return [4 /*yield*/, curve.crvUSDFactory.fetchPools()];
            case 3:
                _a.sent();
                return [4 /*yield*/, curve.EYWAFactory.fetchPools()];
            case 4:
                _a.sent();
                return [4 /*yield*/, curve.cryptoFactory.fetchPools()];
            case 5:
                _a.sent();
                return [4 /*yield*/, curve.tricryptoFactory.fetchPools()];
            case 6:
                _a.sent();
                console.log(curve.getMainPoolList());
                console.log(curve.factory.getPoolList());
                console.log(curve.crvUSDFactory.getPoolList());
                console.log(curve.EYWAFactory.getPoolList());
                console.log(curve.cryptoFactory.getPoolList());
                console.log(curve.tricryptoFactory.getPoolList());
                console.log(curve.getPoolList());
                return [2 /*return*/];
        }
    });
}); };
var poolFieldsTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _a.sent();
                return [4 /*yield*/, curve.factory.fetchPools()];
            case 2:
                _a.sent();
                return [4 /*yield*/, curve.crvUSDFactory.fetchPools()];
            case 3:
                _a.sent();
                return [4 /*yield*/, curve.cryptoFactory.fetchPools()];
            case 4:
                _a.sent();
                return [4 /*yield*/, curve.EYWAFactory.fetchPools()];
            case 5:
                _a.sent();
                return [4 /*yield*/, curve.tricryptoFactory.fetchPools()];
            case 6:
                _a.sent();
                pool = curve.getPool('factory-v2-11');
                console.log(pool.id);
                console.log(pool.name);
                console.log(pool.fullName);
                console.log(pool.symbol);
                console.log(pool.referenceAsset);
                console.log(pool.address);
                console.log(pool.lpToken);
                console.log(pool.gauge);
                console.log(pool.zap);
                console.log(pool.rewardContract);
                console.log(pool.isPlain);
                console.log(pool.isLending);
                console.log(pool.isMeta);
                console.log(pool.isCrypto);
                console.log(pool.isFake);
                console.log(pool.isFactory);
                console.log(pool.basePool);
                console.log(pool.underlyingCoins);
                console.log(pool.wrappedCoins);
                console.log(pool.underlyingCoinAddresses);
                console.log(pool.wrappedCoinAddresses);
                console.log(pool.underlyingDecimals);
                console.log(pool.wrappedDecimals);
                console.log(pool.useLending);
                console.log(pool.inApi);
                console.log(pool.isGaugeKilled);
                return [2 /*return*/];
        }
    });
}); };
var walletBalancesTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var saave, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __generator(this, function (_q) {
        switch (_q.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _q.sent();
                saave = curve.getPool('saave');
                // Current address (signer) balances
                _b = (_a = console).log;
                return [4 /*yield*/, saave.wallet.balances()];
            case 2:
                // Current address (signer) balances
                _b.apply(_a, [_q.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, saave.wallet.lpTokenBalances()];
            case 3:
                _d.apply(_c, [_q.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, saave.wallet.underlyingCoinBalances()];
            case 4:
                _f.apply(_e, [_q.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, saave.wallet.wrappedCoinBalances()];
            case 5:
                _h.apply(_g, [_q.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, saave.wallet.allCoinBalances()];
            case 6:
                _k.apply(_j, [_q.sent()]);
                // For every method above you can specify address
                _m = (_l = console).log;
                return [4 /*yield*/, saave.wallet.balances("0x0063046686E46Dc6F15918b61AE2B121458534a5")];
            case 7:
                // For every method above you can specify address
                _m.apply(_l, [_q.sent()]);
                // Or several addresses
                _p = (_o = console).log;
                return [4 /*yield*/, saave.wallet.balances("0x0063046686E46Dc6F15918b61AE2B121458534a5", "0x66aB6D9362d4F35596279692F0251Db635165871")];
            case 8:
                // Or several addresses
                _p.apply(_o, [_q.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var statsTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var compound, _a, _b, _c, _d, _e, _f, _g, _h, steth, _j, _k, _l, _m, _o, _p, _q, _r;
    return __generator(this, function (_s) {
        switch (_s.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _s.sent();
                compound = curve.getPool('compound');
                _b = (_a = console).log;
                return [4 /*yield*/, compound.stats.parameters()];
            case 2:
                _b.apply(_a, [_s.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, compound.stats.underlyingBalances()];
            case 3:
                _d.apply(_c, [_s.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, compound.stats.wrappedBalances()];
            case 4:
                _f.apply(_e, [_s.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, compound.stats.totalLiquidity()];
            case 5:
                _h.apply(_g, [_s.sent()]);
                steth = curve.getPool('steth');
                _k = (_j = console).log;
                return [4 /*yield*/, steth.stats.volume()];
            case 6:
                _k.apply(_j, [_s.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, steth.stats.baseApy()];
            case 7:
                _m.apply(_l, [_s.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, steth.stats.tokenApy()];
            case 8:
                _p.apply(_o, [_s.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, steth.stats.rewardsApy()];
            case 9:
                _r.apply(_q, [_s.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var depositTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, depositTx, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, depositWrappedTx, _8, _9, _10, _11;
    return __generator(this, function (_12) {
        switch (_12.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _12.sent();
                pool = curve.getPool('mim');
                console.log('--- UNDERLYING ---');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 2:
                _b.apply(_a, [_12.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 3:
                _d.apply(_c, [_12.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.depositBalancedAmounts()];
            case 4:
                _f.apply(_e, [_12.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.depositExpected([100, 100, 100, 100])];
            case 5:
                _h.apply(_g, [_12.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.depositBonus([100, 100, 100, 100])];
            case 6:
                _k.apply(_j, [_12.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.depositIsApproved([100, 100, 100, 100])];
            case 7:
                _m.apply(_l, [_12.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.depositApprove([100, 100, 100, 100])];
            case 8:
                _p.apply(_o, [_12.sent()]);
                return [4 /*yield*/, pool.deposit(['100', '100', '100', '100'], 0.1)];
            case 9:
                depositTx = _12.sent();
                console.log(depositTx);
                _r = (_q = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 10:
                _r.apply(_q, [_12.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 11:
                _t.apply(_s, [_12.sent()]);
                console.log('--- WRAPPED ---');
                _v = (_u = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 12:
                _v.apply(_u, [_12.sent()]);
                _x = (_w = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 13:
                _x.apply(_w, [_12.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, pool.depositWrappedBalancedAmounts()];
            case 14:
                _z.apply(_y, [_12.sent()]);
                _1 = (_0 = console).log;
                return [4 /*yield*/, pool.depositWrappedExpected(['100', '100'])];
            case 15:
                _1.apply(_0, [_12.sent()]);
                _3 = (_2 = console).log;
                return [4 /*yield*/, pool.depositWrappedBonus([100, 100])];
            case 16:
                _3.apply(_2, [_12.sent()]);
                _5 = (_4 = console).log;
                return [4 /*yield*/, pool.depositWrappedIsApproved([100, 100])];
            case 17:
                _5.apply(_4, [_12.sent()]);
                _7 = (_6 = console).log;
                return [4 /*yield*/, pool.depositWrappedApprove([100, 100])];
            case 18:
                _7.apply(_6, [_12.sent()]);
                return [4 /*yield*/, pool.depositWrapped([100, 100], 0.1)];
            case 19:
                depositWrappedTx = _12.sent();
                console.log(depositWrappedTx);
                _9 = (_8 = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 20:
                _9.apply(_8, [_12.sent()]);
                _11 = (_10 = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 21:
                _11.apply(_10, [_12.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var stakingTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, balances, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _o.sent();
                pool = curve.getPool('mim');
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 2:
                balances = _o.sent();
                console.log(balances);
                _b = (_a = console).log;
                return [4 /*yield*/, pool.stakeIsApproved(balances.lpToken)];
            case 3:
                _b.apply(_a, [_o.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.stakeApprove(balances.lpToken)];
            case 4:
                _d.apply(_c, [_o.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.stake(balances.lpToken)];
            case 5:
                _f.apply(_e, [_o.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 6:
                _h.apply(_g, [_o.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.unstake(balances.lpToken)];
            case 7:
                _k.apply(_j, [_o.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 8:
                _m.apply(_l, [_o.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var withdrawTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, withdrawTx, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, withdrawWrappedTx, _w, _x, _y, _z;
    return __generator(this, function (_0) {
        switch (_0.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _0.sent();
                pool = curve.getPool('mim');
                // --- UNDERLYING ---
                console.log('--- UNDERLYING ---');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 2:
                _b.apply(_a, [_0.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 3:
                _d.apply(_c, [_0.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.withdrawExpected(10)];
            case 4:
                _f.apply(_e, [_0.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.withdrawIsApproved(10)];
            case 5:
                _h.apply(_g, [_0.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.withdrawApprove(10)];
            case 6:
                _k.apply(_j, [_0.sent()]);
                return [4 /*yield*/, pool.withdraw('10', 0.1)];
            case 7:
                withdrawTx = _0.sent();
                console.log(withdrawTx);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 8:
                _m.apply(_l, [_0.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 9:
                _p.apply(_o, [_0.sent()]);
                // --- WRAPPED ---
                console.log('--- WRAPPED ---');
                _r = (_q = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 10:
                _r.apply(_q, [_0.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 11:
                _t.apply(_s, [_0.sent()]);
                _v = (_u = console).log;
                return [4 /*yield*/, pool.withdrawWrappedExpected('10')];
            case 12:
                _v.apply(_u, [_0.sent()]);
                return [4 /*yield*/, pool.withdrawWrapped(10, 0.5)];
            case 13:
                withdrawWrappedTx = _0.sent();
                console.log(withdrawWrappedTx);
                _x = (_w = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 14:
                _x.apply(_w, [_0.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 15:
                _z.apply(_y, [_0.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var withdrawImbalanceTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, withdrawImbalanceTx, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, withdrawImbalanceWrappedTx, _0, _1, _2, _3;
    return __generator(this, function (_4) {
        switch (_4.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _4.sent();
                pool = curve.getPool('mim');
                // --- UNDERLYING ---
                console.log('--- UNDERLYING ---');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 2:
                _b.apply(_a, [_4.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 3:
                _d.apply(_c, [_4.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.withdrawImbalanceExpected(['10', '10', '10', '10'])];
            case 4:
                _f.apply(_e, [_4.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.withdrawImbalanceBonus(['10', '10', '10', '10'])];
            case 5:
                _h.apply(_g, [_4.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.withdrawImbalanceIsApproved(['10', '10', '10', '10'])];
            case 6:
                _k.apply(_j, [_4.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.withdrawImbalanceApprove(['10', '10', '10', '10'])];
            case 7:
                _m.apply(_l, [_4.sent()]);
                return [4 /*yield*/, pool.withdrawImbalance(['10', '10', '10', '10'], 0.1)];
            case 8:
                withdrawImbalanceTx = _4.sent();
                console.log(withdrawImbalanceTx);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 9:
                _p.apply(_o, [_4.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 10:
                _r.apply(_q, [_4.sent()]);
                // --- WRAPPED ---
                console.log('--- WRAPPED ---');
                _t = (_s = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 11:
                _t.apply(_s, [_4.sent()]);
                _v = (_u = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 12:
                _v.apply(_u, [_4.sent()]);
                _x = (_w = console).log;
                return [4 /*yield*/, pool.withdrawImbalanceWrappedExpected(['10', '10'])];
            case 13:
                _x.apply(_w, [_4.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, pool.withdrawImbalanceWrappedBonus(['10', '10'])];
            case 14:
                _z.apply(_y, [_4.sent()]);
                return [4 /*yield*/, pool.withdrawImbalanceWrapped(['10', '10'], 0.1)];
            case 15:
                withdrawImbalanceWrappedTx = _4.sent();
                console.log(withdrawImbalanceWrappedTx);
                _1 = (_0 = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 16:
                _1.apply(_0, [_4.sent()]);
                _3 = (_2 = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 17:
                _3.apply(_2, [_4.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var withdrawOneCoinTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, _c, _d, underlyingExpected, _e, _f, _g, _h, _j, _k, underlyingTx, _l, _m, _o, _p, _q, _r, _s, _t, wrappedExpected, _u, _v, wrappedTx, _w, _x, _y, _z;
    return __generator(this, function (_0) {
        switch (_0.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _0.sent();
                pool = curve.getPool('mim');
                // --- UNDERLYING ---
                console.log('--- UNDERLYING ---');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 2:
                _b.apply(_a, [_0.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 3:
                _d.apply(_c, [_0.sent()]);
                return [4 /*yield*/, pool.withdrawOneCoinExpected(10, 'DAI')];
            case 4:
                underlyingExpected = _0.sent();
                // OR const underlyingExpected = await pool.withdrawOneCoinExpected('10', '0x6B175474E89094C44Da98b954EedeAC495271d0F');
                // OR const underlyingExpected = await pool.withdrawOneCoinExpected('10', 1);
                console.log(underlyingExpected);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.withdrawOneCoinBonus(10, 'DAI')];
            case 5:
                _f.apply(_e, [_0.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.withdrawOneCoinIsApproved(10)];
            case 6:
                _h.apply(_g, [_0.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.withdrawOneCoinApprove(10)];
            case 7:
                _k.apply(_j, [_0.sent()]);
                return [4 /*yield*/, pool.withdrawOneCoin(10, 'DAI', 0.1)];
            case 8:
                underlyingTx = _0.sent();
                // OR const underlyingTx = await pool.withdrawOneCoin('10', '0x6B175474E89094C44Da98b954EedeAC495271d0F');
                // OR const underlyingTx = await pool.withdrawOneCoin('10', 1);
                console.log(underlyingTx);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 9:
                _m.apply(_l, [_0.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 10:
                _p.apply(_o, [_0.sent()]);
                // --- WRAPPED ---
                console.log('--- WRAPPED ---');
                _r = (_q = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 11:
                _r.apply(_q, [_0.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 12:
                _t.apply(_s, [_0.sent()]);
                return [4 /*yield*/, pool.withdrawOneCoinWrappedExpected('10', 'MIM')];
            case 13:
                wrappedExpected = _0.sent();
                // OR const wrappedExpected = await pool.withdrawOneCoinWrappedExpected('10', '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3');
                // OR const wrappedExpected = await pool.withdrawOneCoinWrappedExpected('10', 0);
                console.log(wrappedExpected);
                _v = (_u = console).log;
                return [4 /*yield*/, pool.withdrawOneCoinWrappedBonus(10, 'MIM')];
            case 14:
                _v.apply(_u, [_0.sent()]);
                return [4 /*yield*/, pool.withdrawOneCoinWrapped('10', 'MIM', 0.1)];
            case 15:
                wrappedTx = _0.sent();
                // OR await pool.withdrawOneCoinWrapped('10', '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3');
                // OR await pool.withdrawOneCoinWrapped('10', 0);
                console.log(wrappedTx);
                _x = (_w = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 16:
                _x.apply(_w, [_0.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 17:
                _z.apply(_y, [_0.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var poolSwapTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, underlyingExpected, underlyingRequired, _c, _d, _e, _f, swapTx, _g, _h, _j, _k, wrappedExpected, wrappedRequired, _l, _m, _o, _p, swapWrappedTx, _q, _r;
    return __generator(this, function (_s) {
        switch (_s.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _s.sent();
                pool = curve.getPool('mim');
                // --- UNDERLYING ---
                console.log('--- UNDERLYING ---');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 2:
                _b.apply(_a, [_s.sent()]);
                return [4 /*yield*/, pool.swapExpected('MIM', 'DAI', 10)];
            case 3:
                underlyingExpected = _s.sent();
                // OR const underlyingExpected = await pool.swapExpected('0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3', '0x6B175474E89094C44Da98b954EedeAC495271d0F', '10');
                // OR const underlyingExpected = await pool.swapExpected(0, 1, '10');
                console.log(underlyingExpected);
                return [4 /*yield*/, pool.swapRequired('MIM', 'DAI', 10)];
            case 4:
                underlyingRequired = _s.sent();
                // OR const underlyingRequired = await pool.swapRequired('0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3', '0x6B175474E89094C44Da98b954EedeAC495271d0F', '10');
                // OR const underlyingRequired = await pool.swapRequired(0, 1, '10');
                console.log(underlyingRequired);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.swapIsApproved('MIM', 10)];
            case 5:
                _d.apply(_c, [_s.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.swapApprove('MIM', 10)];
            case 6:
                _f.apply(_e, [_s.sent()]);
                return [4 /*yield*/, pool.swap('MIM', 'DAI', 10, 0.1)];
            case 7:
                swapTx = _s.sent();
                // OR const swapTx = await pool.swap('0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3', '0x6B175474E89094C44Da98b954EedeAC495271d0F', '10');
                // OR const swapTx = await pool.swap(0, 1, 10);
                console.log(swapTx);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 8:
                _h.apply(_g, [_s.sent()]);
                // --- WRAPPED ---
                console.log('--- WRAPPED ---');
                _k = (_j = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 9:
                _k.apply(_j, [_s.sent()]);
                return [4 /*yield*/, pool.swapWrappedExpected('3crv', 'MIM', 10)];
            case 10:
                wrappedExpected = _s.sent();
                // OR const wrappedExpected = await pool.swapWrappedExpected('0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490', '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3', '10');
                // OR const wrappedExpected = await pool.swapWrappedExpected(1, 0, '10');
                console.log(wrappedExpected);
                return [4 /*yield*/, pool.swapWrappedRequired('3crv', 'MIM', 10)];
            case 11:
                wrappedRequired = _s.sent();
                // OR const wrappedRequired = await pool.swapWrappedRequired('0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490', '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3', '10');
                // OR const wrappedRequired = await pool.swapWrappedRequired(1, 0, '10');
                console.log(wrappedRequired);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.swapWrappedIsApproved('3crv', 10)];
            case 12:
                _m.apply(_l, [_s.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.swapWrappedApprove('3crv', 10)];
            case 13:
                _p.apply(_o, [_s.sent()]);
                return [4 /*yield*/, pool.swapWrapped('3crv', 'MIM', 10, 0.1)];
            case 14:
                swapWrappedTx = _s.sent();
                // OR const swapWrappedTx = await pool.swapWrapped('0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490', '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3', '10');
                // OR const swapWrappedTx = await pool.swapWrapped(1, 0, '10');
                console.log(swapWrappedTx);
                _r = (_q = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 15:
                _r.apply(_q, [_s.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var depositAndStakeTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, amounts, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
    return __generator(this, function (_12) {
        switch (_12.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _12.sent();
                console.log(curve.hasDepositAndStake());
                pool = curve.getPool('compound');
                amounts = [1000, 1000];
                // --- UNDERLYING ---
                console.log('--- UNDERLYING ---');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 2:
                _b.apply(_a, [_12.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 3:
                _d.apply(_c, [_12.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.depositAndStakeExpected(amounts)];
            case 4:
                _f.apply(_e, [_12.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.depositAndStakeBonus(amounts)];
            case 5:
                _h.apply(_g, [_12.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.depositAndStakeIsApproved(amounts)];
            case 6:
                _k.apply(_j, [_12.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.depositAndStakeApprove(amounts)];
            case 7:
                _m.apply(_l, [_12.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.depositAndStake(amounts)];
            case 8:
                _p.apply(_o, [_12.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, pool.wallet.underlyingCoinBalances()];
            case 9:
                _r.apply(_q, [_12.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 10:
                _t.apply(_s, [_12.sent()]);
                // --- WRAPPED ---
                console.log('--- WRAPPED ---');
                _v = (_u = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 11:
                _v.apply(_u, [_12.sent()]);
                _x = (_w = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 12:
                _x.apply(_w, [_12.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, pool.depositAndStakeWrappedExpected(amounts)];
            case 13:
                _z.apply(_y, [_12.sent()]);
                _1 = (_0 = console).log;
                return [4 /*yield*/, pool.depositAndStakeWrappedBonus(amounts)];
            case 14:
                _1.apply(_0, [_12.sent()]);
                _3 = (_2 = console).log;
                return [4 /*yield*/, pool.depositAndStakeWrappedIsApproved(amounts)];
            case 15:
                _3.apply(_2, [_12.sent()]);
                _5 = (_4 = console).log;
                return [4 /*yield*/, pool.depositAndStakeWrappedApprove(amounts)];
            case 16:
                _5.apply(_4, [_12.sent()]);
                _7 = (_6 = console).log;
                return [4 /*yield*/, pool.depositAndStakeWrapped(amounts)];
            case 17:
                _7.apply(_6, [_12.sent()]);
                _9 = (_8 = console).log;
                return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
            case 18:
                _9.apply(_8, [_12.sent()]);
                _11 = (_10 = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 19:
                _11.apply(_10, [_12.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var routerSwapTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, route, output, expected, required, priceImpact, args, _d, _e, _f, _g, swapTx, swappedAmount, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _k.sent();
                console.log(curve.hasRouter());
                _b = (_a = console).log;
                return [4 /*yield*/, curve.getBalances(['DAI', 'CRV'])];
            case 2:
                _b.apply(_a, [_k.sent()]);
                return [4 /*yield*/, curve.router.getBestRouteAndOutput('DAI', 'CRV', 1000)];
            case 3:
                _c = _k.sent(), route = _c.route, output = _c.output;
                return [4 /*yield*/, curve.router.expected('DAI', 'CRV', 1000)];
            case 4:
                expected = _k.sent();
                return [4 /*yield*/, curve.router.required('DAI', 'CRV', expected)];
            case 5:
                required = _k.sent();
                return [4 /*yield*/, curve.router.priceImpact('DAI', 'CRV', '1000')];
            case 6:
                priceImpact = _k.sent();
                args = curve.router.getArgs(route);
                console.log(route, output, expected, required, priceImpact, args);
                _e = (_d = console).log;
                return [4 /*yield*/, curve.router.isApproved('DAI', 1000)];
            case 7:
                _e.apply(_d, [_k.sent()]);
                _g = (_f = console).log;
                return [4 /*yield*/, curve.router.approve('DAI', 1000)];
            case 8:
                _g.apply(_f, [_k.sent()]);
                return [4 /*yield*/, curve.router.swap('DAI', 'CRV', 1000)];
            case 9:
                swapTx = _k.sent();
                // OR await curve.router.swap('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
                console.log(swapTx.hash);
                return [4 /*yield*/, curve.router.getSwappedAmount(swapTx, 'CRV')];
            case 10:
                swappedAmount = _k.sent();
                console.log(swappedAmount);
                _j = (_h = console).log;
                return [4 /*yield*/, curve.getBalances(['DAI', 'CRV'])];
            case 11:
                _j.apply(_h, [_k.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var boostingTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, lockedAmount, unlockTime, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    return __generator(this, function (_3) {
        switch (_3.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _3.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, curve.boosting.getCrv()];
            case 2:
                _b.apply(_a, [_3.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, curve.boosting.isApproved(1000)];
            case 3:
                _d.apply(_c, [_3.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, curve.boosting.approve(1000)];
            case 4:
                _f.apply(_e, [_3.sent()]);
                console.log(curve.boosting.calcUnlockTime(365));
                return [4 /*yield*/, curve.boosting.createLock(1000, 365)];
            case 5:
                _3.sent();
                _h = (_g = console).log;
                return [4 /*yield*/, curve.boosting.getCrv()];
            case 6:
                _h.apply(_g, [_3.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, curve.boosting.getLockedAmountAndUnlockTime()];
            case 7:
                _k.apply(_j, [_3.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, curve.boosting.getVeCrv()];
            case 8:
                _m.apply(_l, [_3.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, curve.boosting.getVeCrvPct()];
            case 9:
                _p.apply(_o, [_3.sent()]);
                return [4 /*yield*/, curve.boosting.increaseAmount('500')];
            case 10:
                _3.sent();
                _r = (_q = console).log;
                return [4 /*yield*/, curve.boosting.getCrv()];
            case 11:
                _r.apply(_q, [_3.sent()]);
                return [4 /*yield*/, curve.boosting.getLockedAmountAndUnlockTime()];
            case 12:
                _s = _3.sent(), lockedAmount = _s.lockedAmount, unlockTime = _s.unlockTime;
                console.log({ lockedAmount: lockedAmount, unlockTime: unlockTime });
                _u = (_t = console).log;
                return [4 /*yield*/, curve.boosting.getVeCrv()];
            case 13:
                _u.apply(_t, [_3.sent()]);
                _w = (_v = console).log;
                return [4 /*yield*/, curve.boosting.getVeCrvPct()];
            case 14:
                _w.apply(_v, [_3.sent()]);
                console.log(curve.boosting.calcUnlockTime(365, unlockTime));
                return [4 /*yield*/, curve.boosting.increaseUnlockTime(365)];
            case 15:
                _3.sent();
                _y = (_x = console).log;
                return [4 /*yield*/, curve.boosting.getLockedAmountAndUnlockTime()];
            case 16:
                _y.apply(_x, [_3.sent()]);
                _0 = (_z = console).log;
                return [4 /*yield*/, curve.boosting.getVeCrv()];
            case 17:
                _0.apply(_z, [_3.sent()]);
                _2 = (_1 = console).log;
                return [4 /*yield*/, curve.boosting.getVeCrvPct()];
            case 18:
                _2.apply(_1, [_3.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var sidechainBoostingTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, blockToSend, _l, _m, lastEthBlock, _o, _p;
    return __generator(this, function (_q) {
        switch (_q.label) {
            case 0: 
            // --- SIDECHAIN ---
            return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                // --- SIDECHAIN ---
                _q.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, curve.boosting.sidechain.lastEthBlock()];
            case 2:
                _b.apply(_a, [_q.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, curve.boosting.sidechain.getAnycallBalance()];
            case 3:
                _d.apply(_c, [_q.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, curve.boosting.sidechain.topUpAnycall(0.1)];
            case 4:
                _f.apply(_e, [_q.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, curve.boosting.sidechain.getAnycallBalance()];
            case 5:
                _h.apply(_g, [_q.sent()]);
                // --- MAINNET (ETHEREUM) ---
                return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 6:
                // --- MAINNET (ETHEREUM) ---
                _q.sent();
                _k = (_j = console).log;
                return [4 /*yield*/, curve.boosting.sidechain.lastBlockSent(137)];
            case 7:
                _k.apply(_j, [_q.sent()]); // Polygon
                return [4 /*yield*/, curve.boosting.sidechain.blockToSend()];
            case 8:
                blockToSend = _q.sent();
                // 17377005
                _m = (_l = console).log;
                return [4 /*yield*/, curve.boosting.sidechain.sendBlockhash(blockToSend, 137)];
            case 9:
                // 17377005
                _m.apply(_l, [_q.sent()]); // Polygon
                // --- SIDECHAIN ---
                // Wait until blockhash is delivered
                return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 10:
                // --- SIDECHAIN ---
                // Wait until blockhash is delivered
                _q.sent();
                return [4 /*yield*/, curve.boosting.sidechain.lastEthBlock()];
            case 11:
                lastEthBlock = _q.sent();
                // 17377005
                _p = (_o = console).log;
                return [4 /*yield*/, curve.boosting.sidechain.submitProof(lastEthBlock, "0x33A4622B82D4c04a53e170c638B944ce27cffce3")];
            case 12:
                // 17377005
                _p.apply(_o, [_q.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var claimFeesTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {})];
            case 1:
                _l.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, curve.getBalances(['3crv'])];
            case 2:
                _b.apply(_a, [_l.sent()]);
                // ['0.0']
                _d = (_c = console).log;
                return [4 /*yield*/, curve.boosting.claimableFees()];
            case 3:
                // ['0.0']
                _d.apply(_c, [_l.sent()]);
                // 1.30699696445248888
                _f = (_e = console).log;
                return [4 /*yield*/, curve.boosting.claimFees()];
            case 4:
                // 1.30699696445248888
                _f.apply(_e, [_l.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, curve.getBalances(['3crv'])];
            case 5:
                _h.apply(_g, [_l.sent()]);
                // ['1.30699696445248888']
                _k = (_j = console).log;
                return [4 /*yield*/, curve.boosting.claimableFees()];
            case 6:
                // ['1.30699696445248888']
                _k.apply(_j, [_l.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var crvTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    return __generator(this, function (_6) {
        switch (_6.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _6.sent();
                pool = curve.getPool('compound');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.depositAndStake([1000, 1000])];
            case 2:
                _b.apply(_a, [_6.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.crvProfit()];
            case 3:
                _d.apply(_c, [_6.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.stats.tokenApy()];
            case 4:
                _f.apply(_e, [_6.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.userCrvApy()];
            case 5:
                _h.apply(_g, [_6.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.userBoost()];
            case 6:
                _k.apply(_j, [_6.sent()]);
                return [4 /*yield*/, curve.boosting.createLock(10000, 365 * 4)];
            case 7:
                _6.sent();
                _m = (_l = console).log;
                return [4 /*yield*/, pool.depositAndStake([1000, 1000])];
            case 8:
                _m.apply(_l, [_6.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.crvProfit()];
            case 9:
                _p.apply(_o, [_6.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, pool.stats.tokenApy()];
            case 10:
                _r.apply(_q, [_6.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, pool.userCrvApy()];
            case 11:
                _t.apply(_s, [_6.sent()]);
                _v = (_u = console).log;
                return [4 /*yield*/, pool.userBoost()];
            case 12:
                _v.apply(_u, [_6.sent()]);
                _x = (_w = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 13:
                _x.apply(_w, [_6.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, pool.maxBoostedStake()];
            case 14:
                _z.apply(_y, [_6.sent()]);
                // ------ Wait some time... ------
                _1 = (_0 = console).log;
                return [4 /*yield*/, pool.claimableCrv()];
            case 15:
                // ------ Wait some time... ------
                _1.apply(_0, [_6.sent()]);
                _3 = (_2 = console).log;
                return [4 /*yield*/, pool.claimCrv()];
            case 16:
                _3.apply(_2, [_6.sent()]);
                _5 = (_4 = console).log;
                return [4 /*yield*/, pool.claimableCrv()];
            case 17:
                _5.apply(_4, [_6.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var rewardsTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _o.sent();
                pool = curve.getPool('susd');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.rewardTokens()];
            case 2:
                _b.apply(_a, [_o.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.depositAndStake([1000, 1000, 1000, 1000])];
            case 3:
                _d.apply(_c, [_o.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.rewardsProfit()];
            case 4:
                _f.apply(_e, [_o.sent()]);
                // ------ Wait some time... ------
                _h = (_g = console).log;
                return [4 /*yield*/, pool.claimableRewards()];
            case 5:
                // ------ Wait some time... ------
                _h.apply(_g, [_o.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.claimRewards()];
            case 6:
                _k.apply(_j, [_o.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.claimableRewards()];
            case 7:
                _m.apply(_l, [_o.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var userBalancesBaseProfitAndShareTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    return __generator(this, function (_u) {
        switch (_u.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _u.sent();
                pool = curve.getPool('frax');
                _b = (_a = console).log;
                return [4 /*yield*/, pool.deposit([1000, 1000, 1000, 1000])];
            case 2:
                _b.apply(_a, [_u.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 3:
                _d.apply(_c, [_u.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, pool.stake(2000)];
            case 4:
                _f.apply(_e, [_u.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, pool.wallet.lpTokenBalances()];
            case 5:
                _h.apply(_g, [_u.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, pool.userBalances()];
            case 6:
                _k.apply(_j, [_u.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, pool.userWrappedBalances()];
            case 7:
                _m.apply(_l, [_u.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, pool.userLiquidityUSD()];
            case 8:
                _p.apply(_o, [_u.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, pool.baseProfit()];
            case 9:
                _r.apply(_q, [_u.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, pool.userShare()];
            case 10:
                _t.apply(_s, [_u.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var fetchNewFactoryPoolsTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _a.sent();
                // Fetch pools from api (if false arg is not passed)
                return [4 /*yield*/, curve.factory.fetchPools()];
            case 2:
                // Fetch pools from api (if false arg is not passed)
                _a.sent();
                return [4 /*yield*/, curve.cryptoFactory.fetchPools()];
            case 3:
                _a.sent();
                return [4 /*yield*/, curve.tricryptoFactory.fetchPools()];
            case 4:
                _a.sent();
                // Fetch very new pools (that haven't been added to api yet) from blockchain
                return [4 /*yield*/, curve.factory.fetchNewPools()];
            case 5:
                // Fetch very new pools (that haven't been added to api yet) from blockchain
                _a.sent();
                // [ 'factory-v2-285' ]
                return [4 /*yield*/, curve.cryptoFactory.fetchNewPools()];
            case 6:
                // [ 'factory-v2-285' ]
                _a.sent();
                // [ 'factory-crypto-232' ]
                return [4 /*yield*/, curve.tricryptoFactory.fetchNewPools()];
            case 7:
                // [ 'factory-crypto-232' ]
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var deployPlainPoolTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var coins, gas, deployPoolTx, poolAddress, gaugeGas, deployGaugeTx, gaugeAddress, poolId, pool, balances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _a.sent();
                coins = [
                    "0x1456688345527bE1f37E9e627DA0837D6f08C925",
                    "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3",
                    "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0", // LUSD
                ];
                return [4 /*yield*/, curve.factory.estimateGas.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 1)];
            case 2:
                gas = _a.sent();
                console.log(gas);
                return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 1)];
            case 3:
                deployPoolTx = _a.sent();
                console.log(deployPoolTx);
                return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
            case 4:
                poolAddress = _a.sent();
                console.log(poolAddress);
                // Deploy gauge
                console.log(curve.factory.gaugeImplementation());
                return [4 /*yield*/, curve.factory.estimateGas.deployGauge(poolAddress)];
            case 5:
                gaugeGas = _a.sent();
                console.log(gaugeGas);
                return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
            case 6:
                deployGaugeTx = _a.sent();
                console.log(deployGaugeTx);
                return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
            case 7:
                gaugeAddress = _a.sent();
                console.log(gaugeAddress);
                return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
            case 8:
                poolId = _a.sent();
                console.log(poolId);
                pool = curve.getPool(poolId);
                return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
            case 9:
                _a.sent(); // Initial amounts for stable pool must be equal
                return [4 /*yield*/, pool.stats.underlyingBalances()];
            case 10:
                balances = _a.sent();
                console.log(balances);
                return [2 /*return*/];
        }
    });
}); };
var deployMetaPoolTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var basePool, coin, gas, deployPoolTx, poolAddress, gaugeGas, deployGaugeTx, gaugeAddress, poolId, pool, balances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _a.sent();
                basePool = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
                coin = "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3";
                return [4 /*yield*/, curve.factory.estimateGas.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 0)];
            case 2:
                gas = _a.sent();
                console.log(gas);
                return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 0)];
            case 3:
                deployPoolTx = _a.sent();
                console.log(deployPoolTx);
                return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
            case 4:
                poolAddress = _a.sent();
                console.log(poolAddress);
                // Deploy gauge
                console.log(curve.factory.gaugeImplementation());
                return [4 /*yield*/, curve.factory.estimateGas.deployGauge(poolAddress)];
            case 5:
                gaugeGas = _a.sent();
                console.log(gaugeGas);
                return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
            case 6:
                deployGaugeTx = _a.sent();
                console.log(deployGaugeTx);
                return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
            case 7:
                gaugeAddress = _a.sent();
                console.log(gaugeAddress);
                return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
            case 8:
                poolId = _a.sent();
                console.log(poolId);
                pool = curve.getPool(poolId);
                // Deposit & Stake Wrapped
                return [4 /*yield*/, pool.depositAndStakeWrapped([10, 10])];
            case 9:
                // Deposit & Stake Wrapped
                _a.sent(); // Initial wrapped amounts for stable metapool must be equal
                return [4 /*yield*/, pool.stats.wrappedBalances()];
            case 10:
                balances = _a.sent();
                console.log(balances);
                return [2 /*return*/];
        }
    });
}); };
var deployCryptoPoolTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var coins, gas, deployPoolTx, poolAddress, gaugeGas, deployGaugeTx, gaugeAddress, poolId, pool, amounts, underlyingBalances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _a.sent();
                coins = [
                    "0xC581b735A1688071A1746c968e0798D642EDE491",
                    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
                ];
                return [4 /*yield*/, curve.cryptoFactory.estimateGas.deployPool("Test crypto pool", "TCP", coins, 400000, 0.0000725, 0.25, 0.45, 0.000002, 0.00023, 0.000146, 600, 1500)];
            case 2:
                gas = _a.sent();
                console.log(gas);
                return [4 /*yield*/, curve.cryptoFactory.deployPool("Test crypto pool", "TCP", coins, 400000, 0.0000725, 0.25, 0.45, 0.000002, 0.00023, 0.000146, 600, 1500)];
            case 3:
                deployPoolTx = _a.sent();
                console.log(deployPoolTx);
                return [4 /*yield*/, curve.cryptoFactory.getDeployedPoolAddress(deployPoolTx)];
            case 4:
                poolAddress = _a.sent();
                console.log(poolAddress);
                // Deploy gauge
                console.log(curve.cryptoFactory.gaugeImplementation());
                return [4 /*yield*/, curve.cryptoFactory.estimateGas.deployGauge(poolAddress)];
            case 5:
                gaugeGas = _a.sent();
                console.log(gaugeGas);
                return [4 /*yield*/, curve.cryptoFactory.deployGauge(poolAddress)];
            case 6:
                deployGaugeTx = _a.sent();
                console.log(deployPoolTx);
                return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
            case 7:
                gaugeAddress = _a.sent();
                console.log(gaugeAddress);
                return [4 /*yield*/, curve.cryptoFactory.fetchRecentlyDeployedPool(poolAddress)];
            case 8:
                poolId = _a.sent();
                console.log(poolId);
                pool = curve.getPool(poolId);
                return [4 /*yield*/, pool.cryptoSeedAmounts(30)];
            case 9:
                amounts = _a.sent();
                console.log(amounts);
                return [4 /*yield*/, pool.depositAndStake(amounts)];
            case 10:
                _a.sent();
                return [4 /*yield*/, pool.stats.underlyingBalances()];
            case 11:
                underlyingBalances = _a.sent();
                console.log(underlyingBalances);
                return [2 /*return*/];
        }
    });
}); };
var deployTricryptoPoolTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var coins, gas, deployPoolTx, poolAddress, gaugeGas, deployGaugeTx, gaugeAddress, poolId, pool, amounts, underlyingBalances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _a.sent();
                coins = [
                    "0xC581b735A1688071A1746c968e0798D642EDE491",
                    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
                ];
                return [4 /*yield*/, curve.tricryptoFactory.estimateGas.deployPool("Test tricrypto pool", "TTP", coins, 400000, 0.0000725, 0.25, 0.45, 0.000002, 0.00023, 0.000146, 600, [1700, 27000])];
            case 2:
                gas = _a.sent();
                console.log(gas);
                return [4 /*yield*/, curve.tricryptoFactory.deployPool("Test tricrypto pool", "TTP", coins, 400000, 0.0000725, 0.25, 0.45, 0.000002, 0.00023, 0.000146, 600, [1700, 27000])];
            case 3:
                deployPoolTx = _a.sent();
                console.log(deployPoolTx);
                return [4 /*yield*/, curve.tricryptoFactory.getDeployedPoolAddress(deployPoolTx)];
            case 4:
                poolAddress = _a.sent();
                console.log(poolAddress);
                // Deploy gauge
                console.log(curve.tricryptoFactory.gaugeImplementation());
                return [4 /*yield*/, curve.tricryptoFactory.estimateGas.deployGauge(poolAddress)];
            case 5:
                gaugeGas = _a.sent();
                console.log(gaugeGas);
                return [4 /*yield*/, curve.tricryptoFactory.deployGauge(poolAddress)];
            case 6:
                deployGaugeTx = _a.sent();
                console.log(deployPoolTx);
                return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
            case 7:
                gaugeAddress = _a.sent();
                console.log(gaugeAddress);
                return [4 /*yield*/, curve.tricryptoFactory.fetchRecentlyDeployedPool(poolAddress)];
            case 8:
                poolId = _a.sent();
                console.log(poolId);
                pool = curve.getPool(poolId);
                return [4 /*yield*/, pool.cryptoSeedAmounts(30)];
            case 9:
                amounts = _a.sent();
                console.log(amounts);
                return [4 /*yield*/, pool.depositAndStake(amounts)];
            case 10:
                _a.sent();
                return [4 /*yield*/, pool.stats.underlyingBalances()];
            case 11:
                underlyingBalances = _a.sent();
                console.log(underlyingBalances);
                return [2 /*return*/];
        }
    });
}); };
var deployStableNgPlainPool = function () { return __awaiter(void 0, void 0, void 0, function () {
    var coins, assetTypes, oracleAddresses, methodNames, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, salt, deployGaugeSidechain, gaugeSidechainAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _a.sent();
                coins = [
                    "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
                    "0xac3e018457b222d93114458476f3e3416abbe38f", // sfrxETH
                ];
                assetTypes = [2, 1];
                oracleAddresses = [
                    '0x0000000000000000000000000000000000000000',
                    '0xac3e018457b222d93114458476f3e3416abbe38f',
                ];
                methodNames = [
                    '',
                    'pricePerShare',
                ];
                return [4 /*yield*/, curve.stableNgFactory.deployPlainPool('Test pool', 'test', coins, 5, 0.05, 5, assetTypes, 0, 600, oracleAddresses, methodNames)];
            case 2:
                deployPoolTx = _a.sent();
                return [4 /*yield*/, curve.stableNgFactory.getDeployedPlainPoolAddress(deployPoolTx)];
            case 3:
                poolAddress = _a.sent();
                console.log(poolAddress);
                if (!(curve.chainId === 1)) return [3 /*break*/, 6];
                return [4 /*yield*/, curve.stableNgFactory.deployGauge(poolAddress)];
            case 4:
                deployGaugeTx = _a.sent();
                return [4 /*yield*/, curve.stableNgFactory.getDeployedGaugeAddress(deployGaugeTx)];
            case 5:
                gaugeAddress = _a.sent();
                console.log(gaugeAddress);
                return [3 /*break*/, 9];
            case 6:
                salt = '15';
                return [4 /*yield*/, curve.stableNgFactory.deployGaugeSidechain(poolAddress, salt)];
            case 7:
                deployGaugeSidechain = _a.sent();
                return [4 /*yield*/, curve.stableNgFactory.getDeployedGaugeAddress(deployGaugeSidechain)];
            case 8:
                gaugeSidechainAddress = _a.sent();
                console.log(gaugeSidechainAddress);
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
var deployStableNgMetaPool = function () { return __awaiter(void 0, void 0, void 0, function () {
    var basePool, coin, oracleAddress, methodName, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, salt, deployGaugeSidechain, gaugeSidechainAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
            case 1:
                _a.sent();
                basePool = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
                coin = "0xac3e018457b222d93114458476f3e3416abbe38f";
                oracleAddress = '0xac3e018457b222d93114458476f3e3416abbe38f';
                methodName = 'pricePerShare';
                return [4 /*yield*/, curve.stableNgFactory.deployMetaPool(basePool, 'Test pool', 'test', coin, 5, 0.05, 5, 600, 0, 0, methodName, oracleAddress)];
            case 2:
                deployPoolTx = _a.sent();
                return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
            case 3:
                poolAddress = _a.sent();
                console.log(poolAddress);
                if (!(curve.chainId === 1)) return [3 /*break*/, 6];
                return [4 /*yield*/, curve.stableNgFactory.deployGauge(poolAddress)];
            case 4:
                deployGaugeTx = _a.sent();
                return [4 /*yield*/, curve.stableNgFactory.getDeployedGaugeAddress(deployGaugeTx)];
            case 5:
                gaugeAddress = _a.sent();
                console.log(gaugeAddress);
                return [3 /*break*/, 9];
            case 6:
                salt = '15';
                return [4 /*yield*/, curve.stableNgFactory.deployGaugeSidechain(poolAddress, salt)];
            case 7:
                deployGaugeSidechain = _a.sent();
                return [4 /*yield*/, curve.stableNgFactory.getDeployedGaugeAddress(deployGaugeSidechain)];
            case 8:
                gaugeSidechainAddress = _a.sent();
                console.log(gaugeSidechainAddress);
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
// --- DAO ---
var daoLockAndBoosting = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, lockAmount, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, pool, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, unlockTime, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, someAddress, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65;
    return __generator(this, function (_66) {
        switch (_66.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _66.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, curve.dao.crvSupplyStats()];
            case 2:
                _b.apply(_a, [_66.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, curve.dao.userCrv()];
            case 3:
                _d.apply(_c, [_66.sent()]);
                lockAmount = 10000;
                _f = (_e = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.crvLockApprove(lockAmount)];
            case 4:
                _f.apply(_e, [_66.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, curve.dao.crvLockApprove(lockAmount)];
            case 5:
                _h.apply(_g, [_66.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, curve.dao.crvLockIsApproved(lockAmount)];
            case 6:
                _k.apply(_j, [_66.sent()]);
                console.log(curve.dao.calcCrvUnlockTime(365));
                _m = (_l = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.createCrvLock(lockAmount, 365)];
            case 7:
                _m.apply(_l, [_66.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, curve.dao.createCrvLock(lockAmount, 7)];
            case 8:
                _p.apply(_o, [_66.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, curve.dao.userVeCrv()];
            case 9:
                _r.apply(_q, [_66.sent()]);
                pool = curve.getPool("3pool");
                _t = (_s = console).log;
                return [4 /*yield*/, pool.depositAndStake([1000, 1000, 1000])];
            case 10:
                _t.apply(_s, [_66.sent()]);
                _v = (_u = console).log;
                return [4 /*yield*/, pool.userBoost()];
            case 11:
                _v.apply(_u, [_66.sent()]);
                _x = (_w = console).log;
                return [4 /*yield*/, pool.userCrvApy()];
            case 12:
                _x.apply(_w, [_66.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, pool.userFutureBoost()];
            case 13:
                _z.apply(_y, [_66.sent()]);
                _1 = (_0 = console).log;
                return [4 /*yield*/, pool.userFutureCrvApy()];
            case 14:
                _1.apply(_0, [_66.sent()]);
                _3 = (_2 = console).log;
                return [4 /*yield*/, curve.dao.crvLockApprove(lockAmount)];
            case 15:
                _3.apply(_2, [_66.sent()]);
                _5 = (_4 = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.increaseCrvLockedAmount(lockAmount)];
            case 16:
                _5.apply(_4, [_66.sent()]);
                _7 = (_6 = console).log;
                return [4 /*yield*/, curve.dao.increaseCrvLockedAmount(lockAmount)];
            case 17:
                _7.apply(_6, [_66.sent()]);
                _9 = (_8 = console).log;
                return [4 /*yield*/, curve.dao.userVeCrv()];
            case 18:
                _9.apply(_8, [_66.sent()]);
                _11 = (_10 = console).log;
                return [4 /*yield*/, pool.userBoost()];
            case 19:
                _11.apply(_10, [_66.sent()]);
                _13 = (_12 = console).log;
                return [4 /*yield*/, pool.userCrvApy()];
            case 20:
                _13.apply(_12, [_66.sent()]);
                _15 = (_14 = console).log;
                return [4 /*yield*/, pool.userFutureBoost()];
            case 21:
                _15.apply(_14, [_66.sent()]);
                _17 = (_16 = console).log;
                return [4 /*yield*/, pool.userFutureCrvApy()];
            case 22:
                _17.apply(_16, [_66.sent()]);
                return [4 /*yield*/, curve.dao.userVeCrv()];
            case 23:
                unlockTime = (_66.sent()).unlockTime;
                console.log(curve.dao.calcCrvUnlockTime(365, unlockTime));
                _19 = (_18 = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.increaseCrvUnlockTime(365)];
            case 24:
                _19.apply(_18, [_66.sent()]);
                _21 = (_20 = console).log;
                return [4 /*yield*/, curve.dao.increaseCrvUnlockTime(365)];
            case 25:
                _21.apply(_20, [_66.sent()]);
                _23 = (_22 = console).log;
                return [4 /*yield*/, curve.dao.userVeCrv()];
            case 26:
                _23.apply(_22, [_66.sent()]);
                _25 = (_24 = console).log;
                return [4 /*yield*/, pool.userBoost()];
            case 27:
                _25.apply(_24, [_66.sent()]);
                _27 = (_26 = console).log;
                return [4 /*yield*/, pool.userCrvApy()];
            case 28:
                _27.apply(_26, [_66.sent()]);
                _29 = (_28 = console).log;
                return [4 /*yield*/, pool.userFutureBoost()];
            case 29:
                _29.apply(_28, [_66.sent()]);
                _31 = (_30 = console).log;
                return [4 /*yield*/, pool.userFutureCrvApy()];
            case 30:
                _31.apply(_30, [_66.sent()]);
                // Checkpoint to adjust boost
                _33 = (_32 = console).log;
                return [4 /*yield*/, pool.claimCrv()];
            case 31:
                // Checkpoint to adjust boost
                _33.apply(_32, [_66.sent()]);
                _35 = (_34 = console).log;
                return [4 /*yield*/, pool.userBoost()];
            case 32:
                _35.apply(_34, [_66.sent()]);
                _37 = (_36 = console).log;
                return [4 /*yield*/, pool.userCrvApy()];
            case 33:
                _37.apply(_36, [_66.sent()]);
                _39 = (_38 = console).log;
                return [4 /*yield*/, pool.userFutureBoost()];
            case 34:
                _39.apply(_38, [_66.sent()]);
                _41 = (_40 = console).log;
                return [4 /*yield*/, pool.userFutureCrvApy()];
            case 35:
                _41.apply(_40, [_66.sent()]);
                someAddress = "0x0dc81478167527c8784f4Eb4Fd751766821A5340";
                _43 = (_42 = console).log;
                return [4 /*yield*/, curve.dao.claimableFees(someAddress)];
            case 36:
                _43.apply(_42, [_66.sent()]);
                _45 = (_44 = console).log;
                return [4 /*yield*/, curve.getBalances(['3crv'], someAddress)];
            case 37:
                _45.apply(_44, [_66.sent()]);
                _47 = (_46 = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.claimFees(someAddress)];
            case 38:
                _47.apply(_46, [_66.sent()]);
                _49 = (_48 = console).log;
                return [4 /*yield*/, curve.dao.claimFees(someAddress)];
            case 39:
                _49.apply(_48, [_66.sent()]);
                _51 = (_50 = console).log;
                return [4 /*yield*/, curve.dao.claimableFees(someAddress)];
            case 40:
                _51.apply(_50, [_66.sent()]);
                _53 = (_52 = console).log;
                return [4 /*yield*/, curve.getBalances(['3crv'], someAddress)];
            case 41:
                _53.apply(_52, [_66.sent()]);
                // Time travel is needed before
                _55 = (_54 = console).log;
                return [4 /*yield*/, curve.dao.userCrv()];
            case 42:
                // Time travel is needed before
                _55.apply(_54, [_66.sent()]);
                _57 = (_56 = console).log;
                return [4 /*yield*/, curve.dao.userVeCrv()];
            case 43:
                _57.apply(_56, [_66.sent()]);
                _59 = (_58 = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.withdrawLockedCrv()];
            case 44:
                _59.apply(_58, [_66.sent()]);
                _61 = (_60 = console).log;
                return [4 /*yield*/, curve.dao.withdrawLockedCrv()];
            case 45:
                _61.apply(_60, [_66.sent()]);
                _63 = (_62 = console).log;
                return [4 /*yield*/, curve.dao.userCrv()];
            case 46:
                _63.apply(_62, [_66.sent()]);
                _65 = (_64 = console).log;
                return [4 /*yield*/, curve.dao.userVeCrv()];
            case 47:
                _65.apply(_64, [_66.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var daoGaugeVoting = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pool1, pool2, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
    return __generator(this, function (_14) {
        switch (_14.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _14.sent();
                pool1 = curve.getPool("3pool");
                pool2 = curve.getPool("gusd");
                _b = (_a = console).log;
                return [4 /*yield*/, curve.dao.crvLockApprove(10000)];
            case 2:
                _b.apply(_a, [_14.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, curve.dao.createCrvLock(10000, 365 * 2)];
            case 3:
                _d.apply(_c, [_14.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, curve.dao.getVotingGaugeList()];
            case 4:
                _f.apply(_e, [_14.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, curve.dao.voteForGaugeNextTime(pool1.gauge)];
            case 5:
                _h.apply(_g, [_14.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, curve.dao.voteForGaugeNextTime(pool2.gauge)];
            case 6:
                _k.apply(_j, [_14.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.voteForGauge(pool1.gauge, 50)];
            case 7:
                _m.apply(_l, [_14.sent()]); // 50%
                _p = (_o = console).log;
                return [4 /*yield*/, curve.dao.voteForGauge(pool1.gauge, 50)];
            case 8:
                _p.apply(_o, [_14.sent()]); // 50%
                _r = (_q = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.voteForGauge(pool2.gauge, 50)];
            case 9:
                _r.apply(_q, [_14.sent()]); // 50%
                _t = (_s = console).log;
                return [4 /*yield*/, curve.dao.voteForGauge(pool2.gauge, 50)];
            case 10:
                _t.apply(_s, [_14.sent()]); // 50%
                _v = (_u = console).log;
                return [4 /*yield*/, curve.dao.voteForGaugeNextTime(pool1.gauge)];
            case 11:
                _v.apply(_u, [_14.sent()]);
                _x = (_w = console).log;
                return [4 /*yield*/, curve.dao.voteForGaugeNextTime(pool2.gauge)];
            case 12:
                _x.apply(_w, [_14.sent()]);
                _z = (_y = console).log;
                return [4 /*yield*/, curve.dao.userGaugeVotes()];
            case 13:
                _z.apply(_y, [_14.sent()]);
                _1 = (_0 = console).log;
                return [4 /*yield*/, curve.dao.increaseCrvUnlockTime(365 * 2)];
            case 14:
                _1.apply(_0, [_14.sent()]);
                _3 = (_2 = console).log;
                return [4 /*yield*/, curve.dao.userGaugeVotes()];
            case 15:
                _3.apply(_2, [_14.sent()]);
                // Adjust voting power. 10 days time travel is needed
                _5 = (_4 = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.voteForGauge(pool1.gauge, 50)];
            case 16:
                // Adjust voting power. 10 days time travel is needed
                _5.apply(_4, [_14.sent()]); // 50%
                _7 = (_6 = console).log;
                return [4 /*yield*/, curve.dao.voteForGauge(pool1.gauge, 50)];
            case 17:
                _7.apply(_6, [_14.sent()]); // 50%
                _9 = (_8 = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.voteForGauge(pool2.gauge, 50)];
            case 18:
                _9.apply(_8, [_14.sent()]); // 50%
                _11 = (_10 = console).log;
                return [4 /*yield*/, curve.dao.voteForGauge(pool2.gauge, 50)];
            case 19:
                _11.apply(_10, [_14.sent()]); // 50%
                _13 = (_12 = console).log;
                return [4 /*yield*/, curve.dao.userGaugeVotes()];
            case 20:
                _13.apply(_12, [_14.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var daoProposalVoting = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    return __generator(this, function (_w) {
        switch (_w.label) {
            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0 })];
            case 1:
                _w.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, curve.dao.crvLockApprove(10000)];
            case 2:
                _b.apply(_a, [_w.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, curve.dao.createCrvLock(10000, 365 * 2)];
            case 3:
                _d.apply(_c, [_w.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, curve.dao.getProposalList()];
            case 4:
                _f.apply(_e, [_w.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, curve.dao.getProposal("PARAMETER", 21)];
            case 5:
                _h.apply(_g, [_w.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, curve.dao.getProposal("OWNERSHIP", 244)];
            case 6:
                _k.apply(_j, [_w.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.voteForProposal("PARAMETER", 21, false)];
            case 7:
                _m.apply(_l, [_w.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, curve.dao.voteForProposal("PARAMETER", 21, false)];
            case 8:
                _p.apply(_o, [_w.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, curve.dao.estimateGas.voteForProposal("OWNERSHIP", 244, true)];
            case 9:
                _r.apply(_q, [_w.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, curve.dao.voteForProposal("OWNERSHIP", 244, true)];
            case 10:
                _t.apply(_s, [_w.sent()]);
                // Need to use some real address
                _v = (_u = console).log;
                return [4 /*yield*/, curve.dao.userProposalVotes("0x7a16fF8270133F063aAb6C9977183D9e72835428")];
            case 11:
                // Need to use some real address
                _v.apply(_u, [_w.sent()]);
                return [2 /*return*/];
        }
    });
}); };
