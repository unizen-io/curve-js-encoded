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
import { getPool } from "../src/pools/index.js";
import curve from "../src/index.js";
// const PLAIN_POOLS = ['susd', 'ren', 'sbtc', 'hbtc', '3pool', 'seth', 'eurs', 'steth', 'ankreth', 'link', 'reth'];
var PLAIN_POOLS = ['susd', 'ren', 'sbtc', 'hbtc', '3pool', 'seth', 'steth', 'ankreth', 'link', 'reth']; // Without eurs
var LENDING_POOLS = ['compound', 'usdt', 'y', 'busd', 'pax', 'aave', 'saave', 'ib'];
var META_POOLS = ['gusd', 'husd', 'usdk', 'usdn', 'musd', 'rsv', 'tbtc', 'dusd', 'pbtc', 'bbtc', 'obtc', 'ust', 'usdp', 'tusd', 'frax', 'lusd', 'busdv2', 'alusd', 'mim'];
var FACTORY_CRYPTO_META_POOLS = ['factory-crypto-116', 'factory-crypto-97']; // ['DCHF/3CRV', 'cvxCrv/FraxBP'];
var POLYGON_POOLS = ['aave', 'ren', 'atricrypto3', 'eurtusd'];
var AVALANCHE_POOLS = ['aave', 'ren', 'atricrypto3', 'eurtusd'];
var ARBITRUM_MAIN_POOLS = ['2pool', 'tricrypto', 'ren', 'eursusd'];
var ARBITRUM_FACTORY_PLAIN_POOLS = ['factory-v2-15', 'factory-v2-29']; // ['deBridge-ETH', 'Aave aDAI+aUSC+aUSDT USDFACTORY'];
var ARBITRUM_FACTORY_META_POOLS = ['factory-v2-0']; // ['MIM'];
var ARBITRUM_POOLS = __spreadArray(__spreadArray(__spreadArray([], ARBITRUM_MAIN_POOLS, true), ARBITRUM_FACTORY_PLAIN_POOLS, true), ARBITRUM_FACTORY_META_POOLS, true);
var OPTIMISM_MAIN_POOLS = ['3pool'];
var OPTIMISM_FACTORY_PLAIN_POOLS = ['factory-v2-10']; // ['sETH/ETH'];
var OPTIMISM_FACTORY_META_POOLS = ['factory-v2-0']; // ['sUSD Synthetix'];
var OPTIMISM_POOLS = __spreadArray(__spreadArray(__spreadArray([], OPTIMISM_MAIN_POOLS, true), OPTIMISM_FACTORY_PLAIN_POOLS, true), OPTIMISM_FACTORY_META_POOLS, true);
var XDAI_MAIN_POOLS = ['3pool', 'rai', 'tricrypto'];
var XDAI_FACTORY_PLAIN_POOLS = ['factory-v2-0']; // ['sGNO/GNO'];
var XDAI_FACTORY_META_POOLS = ['factory-v2-4']; // ['MAI Stablecoin'];
var XDAI_POOLS = __spreadArray(__spreadArray(__spreadArray([], XDAI_MAIN_POOLS, true), XDAI_FACTORY_PLAIN_POOLS, true), XDAI_FACTORY_META_POOLS, true);
var MOONBEAM_MAIN_POOLS = ['3pool'];
var MOONBEAM_FACTORY_PLAIN_POOLS = ['factory-v2-6']; // ['DAI Multi Nomad'];
// const MOONBEAM_FACTORY_META_POOLS = ['factory-v2-4']; // ['MAI Stablecoin'];
var MOONBEAM_POOLS = __spreadArray(__spreadArray([], MOONBEAM_MAIN_POOLS, true), MOONBEAM_FACTORY_PLAIN_POOLS, true);
var AURORA_POOLS = ['3pool'];
var KAVA_POOLS = ['factory-v2-0'];
// ------------------------------------------------------------------------
var POOLS_FOR_TESTING = FACTORY_CRYPTO_META_POOLS;
var balancedAmountsTest = function (name) {
    describe("".concat(name, " balanced amounts"), function () {
        var pool;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    pool = getPool(name);
                    return [2 /*return*/];
                });
            });
        });
        it('underlying', function () {
            return __awaiter(this, void 0, void 0, function () {
                var balancedAmounts, _i, balancedAmounts_1, amount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pool.depositBalancedAmounts()];
                        case 1:
                            balancedAmounts = (_a.sent()).map(Number);
                            console.log(balancedAmounts);
                            assert.equal(balancedAmounts.length, pool.underlyingCoins.length);
                            for (_i = 0, balancedAmounts_1 = balancedAmounts; _i < balancedAmounts_1.length; _i++) {
                                amount = balancedAmounts_1[_i];
                                assert.isAbove(amount, 0);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('wrapped', function () {
            return __awaiter(this, void 0, void 0, function () {
                var balancedWrappedAmounts, _i, balancedWrappedAmounts_1, amount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (pool.isPlain || pool.isFake) {
                                console.log('Skip');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, pool.depositWrappedBalancedAmounts()];
                        case 1:
                            balancedWrappedAmounts = (_a.sent()).map(Number);
                            console.log(balancedWrappedAmounts);
                            assert.equal(balancedWrappedAmounts.length, pool.wrappedCoins.length);
                            for (_i = 0, balancedWrappedAmounts_1 = balancedWrappedAmounts; _i < balancedWrappedAmounts_1.length; _i++) {
                                amount = balancedWrappedAmounts_1[_i];
                                assert.isAbove(amount, 0);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
};
describe('Underlying test', function () {
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
                                return [2 /*return*/];
                        }
                    });
                });
            });
            for (_i = 0, POOLS_FOR_TESTING_1 = POOLS_FOR_TESTING; _i < POOLS_FOR_TESTING_1.length; _i++) {
                poolId = POOLS_FOR_TESTING_1[_i];
                balancedAmountsTest(poolId);
            }
            return [2 /*return*/];
        });
    });
});
