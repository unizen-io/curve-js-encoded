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
import { assert } from "chai";
import curve from "../src/index.js";
import { curve as _curve } from "../src/curve.js";
import { getPool } from "../src/pools/index.js";
var MAIN_POOLS_ETHEREUM = [
    'compound', 'usdt', 'y', 'busd',
    'susd', 'pax', 'ren', 'sbtc',
    'hbtc', '3pool', 'gusd', 'husd',
    'usdk', 'usdn', 'musd', 'rsv',
    'tbtc', 'dusd', 'pbtc', 'bbtc',
    'obtc', 'seth', 'eurs', 'ust',
    'aave', 'steth', 'saave', 'ankreth',
    'usdp', 'ib', 'link', 'tusd',
    'frax', 'lusd', 'busdv2', 'reth',
    'alusd', 'mim', 'tricrypto2', 'eurt',
    'eurtusd', 'eursusd', 'crveth', 'rai',
    'cvxeth', 'xautusd', 'spelleth', 'teth',
    '2pool', '4pool', 'sbtc2', 'fraxusdp',
];
var FACTORY_POOLS_COUNT_ETHEREUM = 127;
var CRYPTO_FACTORY_POOLS_COUNT_ETHEREUM = 132;
var MAIN_POOLS_POLYGON = ['aave', 'ren', 'atricrypto3', 'eurtusd'];
var FACTORY_POOLS_COUNT_POLYGON = 263;
var MAIN_POOLS_AVALANCHE = ['aave', 'ren', 'atricrypto'];
var FACTORY_POOLS_COUNT_AVALANCHE = 81;
var MAIN_POOLS_FANTOM = ['2pool', 'fusdt', 'ren', 'tricrypto', 'ib', 'geist'];
var FACTORY_POOLS_COUNT_FANTOM = 110;
var CRYPTO_FACTORY_POOLS_COUNT_FANTOM = 6;
var MAIN_POOLS_ARBITRUM = ['2pool', 'tricrypto', 'ren', 'eursusd'];
var FACTORY_POOLS_COUNT_ARBITRUM = 40;
var MAIN_POOLS_OPTIMISM = ['3pool'];
var FACTORY_POOLS_COUNT_OPTIMISM = 16;
var MAIN_POOLS_XDAI = ['3pool', 'rai', 'tricrypto'];
var FACTORY_POOLS_COUNT_XDAI = 7;
var MAIN_POOLS_MOONBEAM = ['3pool'];
var FACTORY_POOLS_COUNT_MOONBEAM = 16;
var MAIN_POOLS_AURORA = ['3pool'];
var MAIN_POOLS_KAVA = ['factory-v2-0'];
var MAIN_POOLS_CELO = ['factory-v2-0'];
// ------------------------------------------
var MAIN_POOLS = MAIN_POOLS_ETHEREUM;
var FACTORY_POOLS_COUNT = 0;
var CRYPTO_FACTORY_POOLS_COUNT = 0;
var checkNumber = function (str) {
    var re = /-?\d+(\.\d+)?(e-\d+)?/g;
    var match = str.match(re);
    return match && str === match[0];
};
var poolStatsTest = function (name) {
    describe("".concat(name, " stats test"), function () {
        var pool;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    pool = getPool(name);
                    return [2 /*return*/];
                });
            });
        });
        it('Total liquidity', function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalLiquidity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pool.stats.totalLiquidity()];
                        case 1:
                            totalLiquidity = _a.sent();
                            assert.isTrue(checkNumber(totalLiquidity));
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Volume', function () {
            return __awaiter(this, void 0, void 0, function () {
                var volume;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pool.stats.volume()];
                        case 1:
                            volume = _a.sent();
                            assert.isTrue(checkNumber(volume));
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Base APY', function () {
            return __awaiter(this, void 0, void 0, function () {
                var apy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pool.stats.baseApy()];
                        case 1:
                            apy = _a.sent();
                            assert.isTrue(checkNumber(apy.day));
                            assert.isTrue(checkNumber(apy.week));
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Token APY', function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, apy, boostedApy;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (pool.gauge === _curve.constants.ZERO_ADDRESS || pool.rewardsOnly()) {
                                console.log("Skip");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, pool.stats.tokenApy()];
                        case 1:
                            _a = _b.sent(), apy = _a[0], boostedApy = _a[1];
                            assert.isTrue(typeof apy === "number");
                            assert.isTrue(typeof boostedApy === "number");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Rewards APY', function () {
            return __awaiter(this, void 0, void 0, function () {
                var rewardsApy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pool.stats.rewardsApy()];
                        case 1:
                            rewardsApy = _a.sent();
                            rewardsApy.forEach(function (item) {
                                assert.isTrue(checkNumber(String(item.apy)));
                            });
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
};
describe('Stats test', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _i, MAIN_POOLS_1, poolName, i, i;
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
            for (_i = 0, MAIN_POOLS_1 = MAIN_POOLS; _i < MAIN_POOLS_1.length; _i++) {
                poolName = MAIN_POOLS_1[_i];
                poolStatsTest(poolName);
            }
            for (i = 0; i < FACTORY_POOLS_COUNT; i++) {
                poolStatsTest("factory-v2-" + i);
            }
            for (i = 0; i < CRYPTO_FACTORY_POOLS_COUNT; i++) {
                poolStatsTest("factory-crypto-" + i);
            }
            return [2 /*return*/];
        });
    });
});
