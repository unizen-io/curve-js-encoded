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
import { curve } from "../src/curve.js";
describe('Checking constants', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.timeout(120000);
            before(function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, curve.fetchFactoryPools()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, curve.fetchCryptoFactoryPools()];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('POOLS_DATA <-> COINS match', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var COIN_ADDRESSES, _i, _a, poolData, coinAddresses, _b, coinAddresses_1, coinAddr;
                    return __generator(this, function (_c) {
                        COIN_ADDRESSES = Object.values(curve.constants.COINS);
                        for (_i = 0, _a = Object.values(curve.constants.POOLS_DATA); _i < _a.length; _i++) {
                            poolData = _a[_i];
                            coinAddresses = __spreadArray(__spreadArray([], poolData.underlying_coin_addresses, true), poolData.wrapped_coin_addresses, true);
                            for (_b = 0, coinAddresses_1 = coinAddresses; _b < coinAddresses_1.length; _b++) {
                                coinAddr = coinAddresses_1[_b];
                                assert.isTrue(COIN_ADDRESSES.includes(coinAddr), "Addesss: ".concat(coinAddr));
                            }
                        }
                        return [2 /*return*/];
                    });
                });
            });
            it('POOLS_DATA <-> DECIMALS match', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _a, poolData, coinAddresses, coinDecimals, i;
                    return __generator(this, function (_b) {
                        for (_i = 0, _a = Object.values(curve.constants.POOLS_DATA); _i < _a.length; _i++) {
                            poolData = _a[_i];
                            coinAddresses = __spreadArray(__spreadArray([], poolData.underlying_coin_addresses, true), poolData.wrapped_coin_addresses, true);
                            coinDecimals = __spreadArray(__spreadArray([], poolData.underlying_decimals, true), poolData.wrapped_decimals, true);
                            assert.equal(coinAddresses.length, coinDecimals.length, "Pool: ".concat(poolData.name, ", swap addesss: ").concat(poolData.swap_address));
                            for (i = 0; i < coinAddresses.length; i++) {
                                assert.equal(curve.constants.DECIMALS[coinAddresses[i]], coinDecimals[i], "Pool: ".concat(poolData.name, ", swap addesss: ").concat(poolData.swap_address));
                            }
                        }
                        return [2 /*return*/];
                    });
                });
            });
            it('DECIMALS are correct', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _a, _b, address, decimals, contract, _c, _d, _e, _f, _g, _h;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                _i = 0, _a = Object.entries(curve.constants.DECIMALS);
                                _j.label = 1;
                            case 1:
                                if (!(_i < _a.length)) return [3 /*break*/, 4];
                                _b = _a[_i], address = _b[0], decimals = _b[1];
                                if (address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                                    return [3 /*break*/, 3]; // ETH
                                // if (address === "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f") continue; // SNX
                                if (curve.contracts[address] === undefined)
                                    console.log(address);
                                contract = curve.contracts[address].contract;
                                _d = (_c = assert).equal;
                                _e = [decimals];
                                _f = Number;
                                _h = (_g = curve).formatUnits;
                                return [4 /*yield*/, contract.decimals(curve.constantOptions)];
                            case 2:
                                _d.apply(_c, _e.concat([_f.apply(void 0, [_h.apply(_g, [_j.sent(), 0])]), address]));
                                _j.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            });
            it('POOLS_DATA names of coins are correct', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _a, poolData, coins, coinAddresses, i, contract, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _i = 0, _a = Object.values(curve.constants.POOLS_DATA);
                                _e.label = 1;
                            case 1:
                                if (!(_i < _a.length)) return [3 /*break*/, 6];
                                poolData = _a[_i];
                                coins = __spreadArray(__spreadArray([], poolData.underlying_coins, true), poolData.wrapped_coins, true);
                                coinAddresses = __spreadArray(__spreadArray([], poolData.underlying_coin_addresses, true), poolData.wrapped_coin_addresses, true);
                                assert.equal(coins.length, coinAddresses.length, poolData.swap_address);
                                i = 0;
                                _e.label = 2;
                            case 2:
                                if (!(i < coins.length)) return [3 /*break*/, 5];
                                if (coinAddresses[i] === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                                    return [3 /*break*/, 4]; // ETH
                                if (coins[i] === "byDAI" || coins[i] === "byUSDC" || coins[i] === "byUSDT")
                                    return [3 /*break*/, 4]; // Actually yDAI, yUSDC, yUSDT
                                if (coins[i] === "sbtcCrv")
                                    return [3 /*break*/, 4]; // Actually crvRenWSBTC
                                if (coins[i] === "ankrETH")
                                    return [3 /*break*/, 4]; // Actually aETHc
                                contract = curve.contracts[coinAddresses[i]].contract;
                                _c = (_b = assert).equal;
                                _d = [coins[i]];
                                return [4 /*yield*/, contract.symbol()];
                            case 3:
                                _c.apply(_b, _d.concat([_e.sent(), "Pool: ".concat(poolData.name, ", swap addesss: ").concat(poolData.swap_address)]));
                                _e.label = 4;
                            case 4:
                                i++;
                                return [3 /*break*/, 2];
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
