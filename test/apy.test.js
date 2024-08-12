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
import { ETH_RPC } from "./rpcUrls.test.js";
var poolStatsTest = function (name) {
    describe("".concat(name, " apy test"), function () {
        this.timeout(120000);
        var pool;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    pool = getPool(name);
                    return [2 /*return*/];
                });
            });
        });
        it('Token (CRV) APY', function () {
            return __awaiter(this, void 0, void 0, function () {
                var apy, apyFromApi, diff;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (pool.gauge === _curve.constants.ZERO_ADDRESS || pool.rewardsOnly())
                                return [2 /*return*/];
                            return [4 /*yield*/, pool.stats.tokenApy(false)];
                        case 1:
                            apy = _a.sent();
                            return [4 /*yield*/, pool.stats.tokenApy()];
                        case 2:
                            apyFromApi = _a.sent();
                            diff = [
                                Math.abs(apyFromApi[0] - apy[0]) / Math.max(apyFromApi[0], apy[0]),
                                Math.abs(apyFromApi[1] - apy[1]) / Math.max(apyFromApi[1], apy[1]),
                            ];
                            console.log(apy[0], apyFromApi[0]);
                            console.log(apy[1], apyFromApi[1]);
                            diff[0] = isNaN(diff[0]) ? 0 : diff[0];
                            diff[1] = isNaN(diff[1]) ? 0 : diff[1];
                            assert.isAtMost(diff[0], 0.007, "".concat(pool.id, " BASE CRV APY. Calculated: ").concat(apy[0], ", API: ").concat(apyFromApi[0]));
                            assert.isAtMost(diff[1], 0.007, "".concat(pool.id, " BOOSTED CRV APY. Calculated: ").concat(apy[1], ", API: ").concat(apyFromApi[1]));
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Rewards APY', function () {
            return __awaiter(this, void 0, void 0, function () {
                var rewardsApy, rewardsApyFromApi, _loop_1, _i, rewardsApy_1, reward;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (pool.gauge === _curve.constants.ZERO_ADDRESS)
                                return [2 /*return*/];
                            return [4 /*yield*/, pool.stats.rewardsApy(false)];
                        case 1:
                            rewardsApy = (_a.sent()).filter(function (r) { return r.apy > 0; });
                            return [4 /*yield*/, pool.stats.rewardsApy()];
                        case 2:
                            rewardsApyFromApi = (_a.sent()).filter(function (r) { return r.apy > 0; });
                            assert.equal(rewardsApy.length, rewardsApyFromApi.length, "".concat(pool.id, " rewards doesn't match. Rewards: \n").concat(rewardsApy, "\n. Rewards from API: \n").concat(rewardsApyFromApi, "\n"));
                            _loop_1 = function (reward) {
                                var rewardFromApiMatch = rewardsApyFromApi.find(function (r) { return r.tokenAddress.toLowerCase() === reward.tokenAddress.toLowerCase(); });
                                console.log(reward.apy, rewardFromApiMatch.apy);
                                var diff = Math.abs(reward.apy - rewardFromApiMatch.apy) / Math.max(reward.apy, rewardFromApiMatch.apy);
                                diff = isNaN(diff) ? 0 : diff;
                                assert.isAtMost(diff, 0.03, "".concat(pool.id, " ").concat(reward.symbol, " reward. Calculated: ").concat(reward.apy, ", API: ").concat(rewardFromApiMatch.apy));
                            };
                            for (_i = 0, rewardsApy_1 = rewardsApy; _i < rewardsApy_1.length; _i++) {
                                reward = rewardsApy_1[_i];
                                _loop_1(reward);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
};
describe('Compare calculated APY with APY from API', function () {
    return __awaiter(this, void 0, void 0, function () {
        var POOLS;
        return __generator(this, function (_a) {
            this.timeout(120000);
            POOLS = [];
            before(function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.init('JsonRpc', { url: ETH_RPC }, { gasPrice: 0 })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, curve.factory.fetchPools()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, curve.cryptoFactory.fetchPools()];
                            case 3:
                                _a.sent();
                                POOLS = curve.getPoolList();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, POOLS_1, poolName;
                    return __generator(this, function (_a) {
                        for (_i = 0, POOLS_1 = POOLS; _i < POOLS_1.length; _i++) {
                            poolName = POOLS_1[_i];
                            poolStatsTest(poolName);
                        }
                        return [2 /*return*/];
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
