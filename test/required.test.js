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
import { expect } from "chai";
import curve from "../src/index.js";
import { ETH_RPC } from "./rpcUrls.test.js";
var test = function (baseValue, resultValue, errorInPercentage) {
    var difference = Math.abs(baseValue - resultValue);
    if ((difference / baseValue) * 100 < errorInPercentage) {
        return true;
    }
    else {
        return false;
    }
};
var testOfSwapRequired = function (pool, curve) {
    describe("".concat(pool, " swapRequired test"), function () {
        it("".concat(pool, " swapRequired test"), function () {
            return __awaiter(this, void 0, void 0, function () {
                var poolInstance, to, result, isTestSuccessful;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            poolInstance = curve.getPool(pool);
                            return [4 /*yield*/, poolInstance.swapExpected(0, 1, 5)];
                        case 1:
                            to = _a.sent();
                            return [4 /*yield*/, poolInstance.swapRequired(0, 1, to)];
                        case 2:
                            result = _a.sent();
                            isTestSuccessful = test(5, Number(result), 0.5);
                            expect(isTestSuccessful).to.be.equal(true);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
};
var testOfSwapWrappedRequired = function (pool, curve) {
    describe("".concat(pool, " swapWrappedRequired test"), function () {
        it("".concat(pool, " swapWrappedRequired test"), function () {
            return __awaiter(this, void 0, void 0, function () {
                var poolInstance, to, result, isTestSuccessful, e_1, isTestSuccessful;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            poolInstance = curve.getPool(pool);
                            return [4 /*yield*/, poolInstance.swapWrappedExpected(0, 1, 5)];
                        case 1:
                            to = _a.sent();
                            return [4 /*yield*/, poolInstance.swapWrappedRequired(0, 1, to)];
                        case 2:
                            result = _a.sent();
                            isTestSuccessful = test(5, Number(result), 0.5);
                            expect(isTestSuccessful).to.be.equal(true);
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            isTestSuccessful = e_1.message.startsWith("swapWrappedExpected method doesn't exist for pool");
                            expect(isTestSuccessful).to.be.equal(true);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        });
    });
};
describe('Test swapRequired and swapWrappedRequired methods in PoolTemplate', function () {
    return __awaiter(this, void 0, void 0, function () {
        var allPools;
        return __generator(this, function (_a) {
            this.timeout(120000);
            allPools = [];
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
                                allPools = curve.getMainPoolList();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('', function () {
                describe('TEST', function () {
                    it('CONNECT WITH BLOCKCHAIN', function () {
                        for (var _i = 0, allPools_1 = allPools; _i < allPools_1.length; _i++) {
                            var pool = allPools_1[_i];
                            testOfSwapRequired(pool, curve);
                            testOfSwapWrappedRequired(pool, curve);
                        }
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
