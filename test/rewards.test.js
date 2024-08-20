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
var checkNumber = function (n) { return Number(n) === Number(n); };
describe('Rewards test', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.timeout(240000);
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
            it('crvProfit', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var pools, _i, pools_1, poolId, pool, crvProfit, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                pools = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], curve.getMainPoolList(), true), curve.factory.getPoolList().slice(0, 10), true), curve.crvUSDFactory.getPoolList(), true), curve.cryptoFactory.getPoolList().slice(0, 10), true);
                                _i = 0, pools_1 = pools;
                                _a.label = 1;
                            case 1:
                                if (!(_i < pools_1.length)) return [3 /*break*/, 6];
                                poolId = pools_1[_i];
                                console.log(poolId);
                                pool = curve.getPool(poolId);
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                if (pool.rewardsOnly()) {
                                    console.log('Rewards-Only');
                                    return [3 /*break*/, 5];
                                }
                                return [4 /*yield*/, pool.crvProfit()];
                            case 3:
                                crvProfit = _a.sent();
                                console.log(crvProfit, '\n');
                                assert.isTrue(checkNumber(crvProfit.day));
                                assert.isTrue(checkNumber(crvProfit.week));
                                assert.isTrue(checkNumber(crvProfit.month));
                                assert.isTrue(checkNumber(crvProfit.year));
                                assert.equal(typeof crvProfit.token, "string");
                                assert.equal(typeof crvProfit.symbol, "string");
                                assert.isAbove(crvProfit.price, 0);
                                return [3 /*break*/, 5];
                            case 4:
                                err_1 = _a.sent();
                                console.log(err_1.message, '\n');
                                assert.equal(err_1.message, "".concat(pool.name, " doesn't have gauge"));
                                return [3 /*break*/, 5];
                            case 5:
                                _i++;
                                return [3 /*break*/, 1];
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            });
            it('rewardsProfit', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var pools, _i, pools_2, poolId, pool, rewardsProfit, _a, rewardsProfit_1, profit, err_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                pools = curve.getPoolList();
                                _i = 0, pools_2 = pools;
                                _b.label = 1;
                            case 1:
                                if (!(_i < pools_2.length)) return [3 /*break*/, 6];
                                poolId = pools_2[_i];
                                console.log(poolId);
                                pool = curve.getPool(poolId);
                                _b.label = 2;
                            case 2:
                                _b.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, pool.rewardsProfit()];
                            case 3:
                                rewardsProfit = _b.sent();
                                console.log(rewardsProfit, '\n');
                                for (_a = 0, rewardsProfit_1 = rewardsProfit; _a < rewardsProfit_1.length; _a++) {
                                    profit = rewardsProfit_1[_a];
                                    assert.isTrue(checkNumber(profit.day));
                                    assert.isTrue(checkNumber(profit.week));
                                    assert.isTrue(checkNumber(profit.month));
                                    assert.isTrue(checkNumber(profit.year));
                                    assert.equal(typeof profit.token, "string");
                                    assert.equal(typeof profit.symbol, "string");
                                    assert.isAbove(profit.price, 0);
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                err_2 = _b.sent();
                                console.log(err_2.message, '\n');
                                assert.equal(err_2.message, "".concat(pool.name, " doesn't have gauge"));
                                return [3 /*break*/, 5];
                            case 5:
                                _i++;
                                return [3 /*break*/, 1];
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
