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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { assert } from "chai";
import curve from "../src/index.js";
import { curve as _curve } from "../src/curve.js";
import { BN } from "../src/utils.js";
var LENDING_POOLS = ['compound', 'usdt', 'y', 'busd', 'pax', 'aave', 'saave', 'ib'];
var META_POOLS = ['gusd', 'husd', 'usdk', 'usdn', 'musd', 'rsv', 'tbtc', 'dusd', 'pbtc', 'bbtc', 'ust', 'usdp', 'tusd', 'frax', 'lusd', 'busdv2', 'alusd', 'mim'];
var CRYPTO_POOLS = ['tricrypto2', 'eurtusd', 'crveth', 'cvxeth', 'xautusd', 'spelleth', 'teth', 'euroc'];
var FACTORY_META_POOLS = ['factory-v2-84', 'factory-v2-80', 'factory-v2-60', 'factory-v2-136']; // ['baoUSD-3CRV-f', 'ELONXSWAP3CRV-f', 'ibbtc/sbtcCRV-f(2)', 'sUSDFRAXBP'];
var FACTORY_CRYPTO_POOLS = ['factory-crypto-8']; // ['YFIETH-fV2'];
var FACTORY_CRYPTO_META_POOLS = ['factory-crypto-116', 'factory-crypto-97']; // ['DCHF/3CRV', 'cvxCrv/FraxBP'];
var FACTORY_TRICRYPTO_POOLS = ['factory-tricrypto-0', 'factory-tricrypto-1']; // ['crvUSDCWBTCWETH', 'crvUSDTWBTCWETH']
// const ETHEREUM_POOLS = [...LENDING_POOLS, ...META_POOLS, ...CRYPTO_POOLS];
// const ETHEREUM_POOLS = [...FACTORY_META_POOLS, ...FACTORY_CRYPTO_POOLS];
var ETHEREUM_POOLS = ['factory-v2-136']; //['compound', 'aave', 'ib', 'gusd', 'mim', 'tricrypto2', 'crveth'];
var POLYGON_MAIN_POOLS = ['aave', 'ren', 'eurtusd', 'eursusd'];
var POLYGON_FACTORY_META_POOLS = ['factory-v2-11']; // ['FRAX3CRV-f3CRV-f'];
var POLYGON_FACTORY_CRYPTO_META_POOLS = ['factory-crypto-1', 'factory-crypto-83']; // ['CRV/TRICRYPTO', 'WMATIC/TRICRYPTO'];
var POLYGON_POOLS = ['eursusd'];
var AVALANCHE_MAIN_POOLS = ['aave', 'ren', 'aaveV3', 'avaxcrypto'];
var AVALANCHE_FACTORY_META_POOLS = ['factory-v2-0']; // ['MIM'];
var AVALANCHE_POOLS = AVALANCHE_FACTORY_META_POOLS;
var ARBITRUM_MAIN_POOLS = ['tricrypto', 'eursusd'];
var ARBITRUM_FACTORY_META_POOLS = ['factory-v2-0']; // ['MIM'];
var ARBITRUM_POOLS = __spreadArray(__spreadArray([], ARBITRUM_MAIN_POOLS, true), ARBITRUM_FACTORY_META_POOLS, true);
var OPTIMISM_FACTORY_META_POOLS = ['factory-v2-0']; // ['sUSD Synthetix'];
var OPTIMISM_POOLS = __spreadArray([], OPTIMISM_FACTORY_META_POOLS, true);
var XDAI_MAIN_POOLS = ['rai', 'tricrypto', 'eureusd'];
var XDAI_FACTORY_META_POOLS = ['factory-v2-4']; // ['MAI Stablecoin'];
var XDAI_POOLS = __spreadArray(__spreadArray([], XDAI_MAIN_POOLS, true), XDAI_FACTORY_META_POOLS, true);
var FANTOM_MAIN_POOLS = ['fusdt', 'ib', 'geist'];
var FANTOM_FACTORY_META_POOLS = ['factory-v2-16', 'factory-v2-40']; // ['FRAX2pool', 'Geist Frax'];
var FANTOM_POOLS = __spreadArray(__spreadArray([], FANTOM_MAIN_POOLS, true), FANTOM_FACTORY_META_POOLS, true);
// ------------------------------------------
var POOLS_FOR_TESTING = FACTORY_TRICRYPTO_POOLS;
var AAVE_POOLS = ['aave', 'saave', 'geist', 'aaveV3'];
var wrappedLiquidityTest = function (id) {
    describe("".concat(id, " deposit-stake--deposit&stake-unstake-withdraw"), function () {
        var pool;
        var coinAddresses;
        var amounts;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pool = curve.getPool(id);
                            coinAddresses = pool.wrappedCoinAddresses;
                            return [4 /*yield*/, pool.stats.wrappedBalances()];
                        case 1:
                            amounts = _a.sent();
                            amounts = amounts.map(function (a, i) { return BN(a).div(10).lte(1) ? BN(a).div(10).toFixed(pool.wrappedDecimals[i]) : '1'; });
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Deposit', function () {
            return __awaiter(this, void 0, void 0, function () {
                var initialBalances, lpTokenExpected, balances, delta;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pool.wallet.balances()];
                        case 1:
                            initialBalances = _a.sent();
                            return [4 /*yield*/, pool.depositWrappedExpected(amounts)];
                        case 2:
                            lpTokenExpected = _a.sent();
                            coinAddresses.forEach(function (c, i) {
                                if (Number(initialBalances[c]) === 0)
                                    throw Error("".concat(pool.wrappedCoins[i], " balance = 0"));
                            });
                            return [4 /*yield*/, pool.depositWrapped(amounts)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, pool.wallet.balances()];
                        case 4:
                            balances = _a.sent();
                            coinAddresses.forEach(function (c, i) {
                                if (AAVE_POOLS.includes(id) || (pool.isLending && pool.id === 'ren')) {
                                    // Because of increasing quantity
                                    assert.approximately(Number(balances[c]), Number(BN(initialBalances[c]).minus(BN(amounts[i]).toString())), 1e-2);
                                }
                                else if (pool.id === 'factory-v2-60') {
                                    assert.approximately(Number(balances[c]), Number(BN(initialBalances[c]).minus(BN(amounts[i]).toString())), 1e-18);
                                }
                                else {
                                    assert.deepStrictEqual(BN(balances[c]), BN(initialBalances[c]).minus(BN(amounts[i])));
                                }
                            });
                            delta = id === 'factory-v2-80' ? 2 : 0.01;
                            assert.approximately(Number(balances.lpToken) - Number(initialBalances.lpToken), Number(lpTokenExpected), delta);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Stake', function () {
            return __awaiter(this, void 0, void 0, function () {
                var depositAmount, balances;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (pool.gauge === _curve.constants.ZERO_ADDRESS) {
                                console.log('Skip');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, pool.wallet.lpTokenBalances()];
                        case 1:
                            depositAmount = (_a.sent()).lpToken;
                            return [4 /*yield*/, pool.stake(depositAmount)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, pool.wallet.lpTokenBalances()];
                        case 3:
                            balances = _a.sent();
                            assert.strictEqual(depositAmount, balances.gauge);
                            assert.strictEqual(Number(balances.lpToken), 0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Deposit&stake', function () {
            return __awaiter(this, void 0, void 0, function () {
                var initialBalances, lpTokenExpected, balances;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (pool.isPlain || pool.isFake || pool.gauge === _curve.constants.ZERO_ADDRESS) {
                                console.log('Skip');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, pool.wallet.balances()];
                        case 1:
                            initialBalances = _a.sent();
                            return [4 /*yield*/, pool.depositAndStakeWrappedExpected(amounts)];
                        case 2:
                            lpTokenExpected = _a.sent();
                            coinAddresses.forEach(function (c, i) {
                                if (Number(initialBalances[c]) === 0)
                                    throw Error("".concat(pool.wrappedCoins[i], " balance = 0"));
                            });
                            return [4 /*yield*/, pool.depositAndStakeWrapped(amounts)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, pool.wallet.balances()];
                        case 4:
                            balances = _a.sent();
                            coinAddresses.forEach(function (c, i) {
                                if (AAVE_POOLS.includes(id) || (pool.isLending && pool.id === 'ren')) {
                                    assert.approximately(Number(balances[c]), Number(BN(initialBalances[c]).minus(BN(amounts[i]).toString())), 1e-2);
                                }
                                else {
                                    assert.deepStrictEqual(BN(balances[c]), BN(initialBalances[c]).minus(BN(amounts[i])));
                                }
                            });
                            assert.approximately(Number(balances.gauge) - Number(initialBalances.gauge), Number(lpTokenExpected), 0.01);
                            assert.strictEqual(Number(balances.lpToken) - Number(initialBalances.lpToken), 0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Unstake', function () {
            return __awaiter(this, void 0, void 0, function () {
                var withdrawAmount, balances;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (pool.gauge === _curve.constants.ZERO_ADDRESS) {
                                console.log('Skip');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, pool.wallet.lpTokenBalances()];
                        case 1:
                            withdrawAmount = (_a.sent()).gauge;
                            return [4 /*yield*/, pool.unstake(withdrawAmount)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, pool.wallet.lpTokenBalances()];
                        case 3:
                            balances = _a.sent();
                            assert.strictEqual(withdrawAmount, balances.lpToken);
                            assert.strictEqual(Number(balances.gauge), 0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Withdraw', function () {
            return __awaiter(this, void 0, void 0, function () {
                var initialBalances, lpTokenAmount, coinsExpected, balances;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pool.wallet.balances()];
                        case 1:
                            initialBalances = _a.sent();
                            lpTokenAmount = BN(initialBalances.lpToken).div(10).toFixed(18);
                            return [4 /*yield*/, pool.withdrawWrappedExpected(lpTokenAmount)];
                        case 2:
                            coinsExpected = _a.sent();
                            return [4 /*yield*/, pool.withdrawWrapped(lpTokenAmount, 1)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, pool.wallet.balances()];
                        case 4:
                            balances = _a.sent();
                            assert.deepStrictEqual(BN(balances.lpToken), BN(initialBalances.lpToken).minus(BN(lpTokenAmount)));
                            coinAddresses.forEach(function (c, i) {
                                var delta = id == 'gusd' ? 0.011 : id === 'factory-v2-80' ? 2 : 0.01;
                                assert.approximately(Number(balances[c]) - Number(initialBalances[c]), Number(coinsExpected[i]), delta);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Withdraw imbalance', function () {
            return __awaiter(this, void 0, void 0, function () {
                var withdrawAmounts_1, initialBalances_1, lpTokenExpected, balances_1, delta;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!pool.isCrypto) return [3 /*break*/, 1];
                            console.log("No such method");
                            return [3 /*break*/, 6];
                        case 1:
                            withdrawAmounts_1 = amounts.map(function (a, i) { return BN(a).div(10).toFixed(pool.underlyingDecimals[i]); });
                            return [4 /*yield*/, pool.wallet.balances()];
                        case 2:
                            initialBalances_1 = _a.sent();
                            return [4 /*yield*/, pool.withdrawImbalanceWrappedExpected(withdrawAmounts_1)];
                        case 3:
                            lpTokenExpected = _a.sent();
                            return [4 /*yield*/, pool.withdrawImbalanceWrapped(withdrawAmounts_1)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, pool.wallet.balances()];
                        case 5:
                            balances_1 = _a.sent();
                            delta = id === 'factory-v2-80' ? 2 : 0.01;
                            assert.approximately(Number(initialBalances_1.lpToken) - Number(balances_1.lpToken), Number(lpTokenExpected), delta);
                            coinAddresses.forEach(function (c, i) {
                                if (AAVE_POOLS.includes(id) || (pool.isLending && pool.id === 'ren')) {
                                    assert.approximately(Number(initialBalances_1[c]), Number(BN(balances_1[c]).minus(BN(withdrawAmounts_1[i])).toString()), 1e-4);
                                }
                                else {
                                    assert.deepStrictEqual(BN(initialBalances_1[c]), BN(balances_1[c]).minus(BN(withdrawAmounts_1[i])));
                                }
                            });
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        });
        if (!['compound', 'usdt', 'y', 'busd', 'pax'].includes(id)) {
            it('Withdraw one coin', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var initialBalances, lpTokenAmount, expected, balances;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, pool.wallet.balances()];
                            case 1:
                                initialBalances = _a.sent();
                                lpTokenAmount = BN(initialBalances.lpToken).div(10).toFixed(18);
                                return [4 /*yield*/, pool.withdrawOneCoinWrappedExpected(lpTokenAmount, 0)];
                            case 2:
                                expected = _a.sent();
                                return [4 /*yield*/, pool.withdrawOneCoinWrapped(lpTokenAmount, 0)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, pool.wallet.balances()];
                            case 4:
                                balances = _a.sent();
                                assert.deepStrictEqual(BN(balances.lpToken), BN(initialBalances.lpToken).minus(BN(lpTokenAmount)));
                                coinAddresses.forEach(function (c, i) {
                                    if (i === 0) {
                                        assert.approximately(Number(balances[c]) - Number(initialBalances[c]), Number(expected), 0.01);
                                    }
                                    else {
                                        if (AAVE_POOLS.includes(id) || (pool.isLending && pool.id === 'ren')) {
                                            // Because of increasing quantity
                                            assert.approximately(Number(balances[c]), Number(initialBalances[c]), 1e-4);
                                        }
                                        else {
                                            assert.strictEqual(balances[c], initialBalances[c]);
                                        }
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
    });
};
var wrappedSwapTest = function (id) {
    describe("".concat(id, " exchange"), function () {
        var pool;
        var coinAddresses;
        var amounts;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pool = curve.getPool(id);
                            coinAddresses = pool.wrappedCoinAddresses;
                            return [4 /*yield*/, pool.stats.wrappedBalances()];
                        case 1:
                            amounts = _a.sent();
                            amounts = amounts.map(function (a, i) { return BN(a).div(10).lte(1) ? BN(a).div(10).toFixed(pool.wrappedDecimals[i]) : '1'; });
                            return [2 /*return*/];
                    }
                });
            });
        });
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (i !== j) {
                    it("".concat(i, " --> ").concat(j), function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var swapAmount, initialCoinBalances, expected, coinBalances;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(i >= coinAddresses.length || j >= coinAddresses.length)) return [3 /*break*/, 1];
                                        console.log('Skip');
                                        return [3 /*break*/, 6];
                                    case 1:
                                        swapAmount = amounts[i];
                                        return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
                                    case 2:
                                        initialCoinBalances = _a.sent();
                                        return [4 /*yield*/, pool.swapWrappedExpected(i, j, swapAmount)];
                                    case 3:
                                        expected = _a.sent();
                                        return [4 /*yield*/, pool.swapWrapped(i, j, swapAmount, 0.02)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, pool.wallet.wrappedCoinBalances()];
                                    case 5:
                                        coinBalances = _a.sent();
                                        if (AAVE_POOLS.includes(pool.id) || (pool.isLending && pool.id === 'ren')) {
                                            // Because of increasing quantity
                                            assert.approximately(Number(Object.values(coinBalances)[i]), Number(BN(Object.values(initialCoinBalances)[i]).minus(BN(swapAmount).toString())), 1e-2);
                                        }
                                        else if (pool.id === 'factory-v2-60') {
                                            assert.approximately(Number(Object.values(coinBalances)[i]), Number(BN(Object.values(initialCoinBalances)[i]).minus(BN(swapAmount)).toString()), 1e-18);
                                        }
                                        else {
                                            assert.deepStrictEqual(BN(Object.values(coinBalances)[i]), BN(Object.values(initialCoinBalances)[i]).minus(BN(swapAmount)));
                                        }
                                        assert.isAtLeast(Number(Object.values(coinBalances)[j]), Number(BN(Object.values(initialCoinBalances)[j]).plus(BN(expected).times(0.98)).toString()));
                                        _a.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        });
                    });
                }
            };
            for (var j = 0; j < 5; j++) {
                _loop_2(j);
            }
        };
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
    });
};
describe('Wrapped test', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _i, POOLS_FOR_TESTING_1, poolId;
        return __generator(this, function (_a) {
            this.timeout(120000);
            before(function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, curve.factory.fetchPools()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, curve.cryptoFactory.fetchPools()];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, curve.tricryptoFactory.fetchPools()];
                            case 4:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            for (_i = 0, POOLS_FOR_TESTING_1 = POOLS_FOR_TESTING; _i < POOLS_FOR_TESTING_1.length; _i++) {
                poolId = POOLS_FOR_TESTING_1[_i];
                wrappedLiquidityTest(poolId);
                wrappedSwapTest(poolId);
            }
            return [2 /*return*/];
        });
    });
});
