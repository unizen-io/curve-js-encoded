var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { curve } from "../src/curve.js";
import { ETH_RPC } from "./rpcUrls.test.js";
import { BLACK_LIST } from "../src/factory/factory.js";
var factoryPoolsDataTest = function (factoryPoolsDataFromApi, factoryPoolsData, isStrict) {
    assert.deepStrictEqual(Object.keys(factoryPoolsDataFromApi), Object.keys(factoryPoolsData));
    for (var poolId in factoryPoolsData) {
        assert.equal(factoryPoolsData[poolId].name, factoryPoolsDataFromApi[poolId].name, "".concat(poolId, ": name"));
        assert.equal(factoryPoolsData[poolId].full_name, factoryPoolsDataFromApi[poolId].full_name, "".concat(poolId, ": full_name"));
        assert.equal(factoryPoolsData[poolId].symbol, factoryPoolsDataFromApi[poolId].symbol, "".concat(poolId, ": symbol"));
        if (isStrict) {
            assert.equal(factoryPoolsData[poolId].reference_asset, factoryPoolsDataFromApi[poolId].reference_asset, "".concat(poolId, ": reference_asset"));
        }
        else {
            if (factoryPoolsData[poolId].reference_asset !== factoryPoolsDataFromApi[poolId].reference_asset) {
                console.log(poolId, "reference asset: ".concat(factoryPoolsData[poolId].reference_asset, " (blockchain) != ").concat(factoryPoolsDataFromApi[poolId].reference_asset, " (api)"));
                console.log("Wrapped coins:", factoryPoolsDataFromApi[poolId].wrapped_coins);
                console.log("Underlying coins:", factoryPoolsDataFromApi[poolId].underlying_coins, "\n");
            }
        }
        assert.equal(factoryPoolsData[poolId].swap_address, factoryPoolsDataFromApi[poolId].swap_address, "".concat(poolId, ": swap_address"));
        assert.equal(factoryPoolsData[poolId].token_address, factoryPoolsDataFromApi[poolId].token_address, "".concat(poolId, ": token_address"));
        assert.equal(factoryPoolsData[poolId].gauge_address, factoryPoolsDataFromApi[poolId].gauge_address, "".concat(poolId, ": gauge_address"));
        assert.equal(factoryPoolsData[poolId].deposit_address, factoryPoolsDataFromApi[poolId].deposit_address, "".concat(poolId, ": deposit_address"));
        assert.equal(factoryPoolsData[poolId].sCurveRewards_address, factoryPoolsDataFromApi[poolId].sCurveRewards_address, "".concat(poolId, ": sCurveRewards_address"));
        assert.equal(factoryPoolsData[poolId].reward_contract, factoryPoolsDataFromApi[poolId].reward_contract, "".concat(poolId, ": reward_contract"));
        assert.equal(factoryPoolsData[poolId].implementation_address, factoryPoolsDataFromApi[poolId].implementation_address, "".concat(poolId, ": implementation_address"));
        assert.equal(factoryPoolsData[poolId].is_plain, factoryPoolsDataFromApi[poolId].is_plain, "".concat(poolId, ": is_plain"));
        assert.equal(factoryPoolsData[poolId].is_lending, factoryPoolsDataFromApi[poolId].is_lending, "".concat(poolId, ": is_lending"));
        assert.equal(factoryPoolsData[poolId].is_meta, factoryPoolsDataFromApi[poolId].is_meta, "".concat(poolId, ": is_meta"));
        assert.equal(factoryPoolsData[poolId].is_crypto, factoryPoolsDataFromApi[poolId].is_crypto, "".concat(poolId, ": is_crypto"));
        assert.equal(factoryPoolsData[poolId].is_fake, factoryPoolsDataFromApi[poolId].is_fake, "".concat(poolId, ": is_fake"));
        assert.equal(factoryPoolsData[poolId].is_factory, factoryPoolsDataFromApi[poolId].is_factory, "".concat(poolId, ": is_factory"));
        assert.equal(factoryPoolsData[poolId].base_pool, factoryPoolsDataFromApi[poolId].base_pool, "".concat(poolId, ": base_pool"));
        if (isStrict) {
            assert.deepStrictEqual(factoryPoolsData[poolId].underlying_coins, factoryPoolsDataFromApi[poolId].underlying_coins, "".concat(poolId, ": underlying_coins"));
        }
        else {
            if (JSON.stringify(factoryPoolsData[poolId].underlying_coins) !== JSON.stringify(factoryPoolsDataFromApi[poolId].underlying_coins)) {
                console.log(poolId, "underlying_coins: ".concat(factoryPoolsData[poolId].underlying_coins, " (blockchain) != ").concat(factoryPoolsDataFromApi[poolId].underlying_coins, " (api) \n"));
            }
        }
        if (isStrict) {
            assert.deepStrictEqual(factoryPoolsData[poolId].wrapped_coins, factoryPoolsDataFromApi[poolId].wrapped_coins, "".concat(poolId, ": wrapped_coins"));
        }
        else {
            if (JSON.stringify(factoryPoolsData[poolId].wrapped_coins) !== JSON.stringify(factoryPoolsDataFromApi[poolId].wrapped_coins)) {
                console.log(poolId, "wrapped_coins: ".concat(factoryPoolsData[poolId].wrapped_coins, " (blockchain) != ").concat(factoryPoolsDataFromApi[poolId].wrapped_coins, " (api) \n"));
            }
        }
        assert.deepStrictEqual(factoryPoolsData[poolId].underlying_coin_addresses, factoryPoolsDataFromApi[poolId].underlying_coin_addresses, "".concat(poolId, ": underlying_coin_addresses"));
        assert.deepStrictEqual(factoryPoolsData[poolId].wrapped_coin_addresses, factoryPoolsDataFromApi[poolId].wrapped_coin_addresses, "".concat(poolId, ": wrapped_coin_addresses"));
        assert.deepStrictEqual(factoryPoolsData[poolId].underlying_decimals, factoryPoolsDataFromApi[poolId].underlying_decimals, "".concat(poolId, ": underlying_decimals"));
        assert.deepStrictEqual(factoryPoolsData[poolId].wrapped_decimals, factoryPoolsDataFromApi[poolId].wrapped_decimals, "".concat(poolId, ": wrapped_decimals"));
        assert.deepStrictEqual(factoryPoolsData[poolId].use_lending, factoryPoolsDataFromApi[poolId].use_lending, "".concat(poolId, ": use_lending"));
        assert.deepStrictEqual(factoryPoolsData[poolId].swap_abi, factoryPoolsDataFromApi[poolId].swap_abi, "".concat(poolId, ": swap_abi"));
        assert.deepStrictEqual(factoryPoolsData[poolId].gauge_abi, factoryPoolsDataFromApi[poolId].gauge_abi, "".concat(poolId, ": gauge_abi"));
        assert.deepStrictEqual(factoryPoolsData[poolId].deposit_abi, factoryPoolsDataFromApi[poolId].deposit_abi, "".concat(poolId, ": deposit_abi"));
        assert.deepStrictEqual(factoryPoolsData[poolId].sCurveRewards_abi, factoryPoolsDataFromApi[poolId].sCurveRewards_abi, "".concat(poolId, ": sCurveRewards_abi"));
    }
};
describe('Factory pools data', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.timeout(120000);
            before(function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.init('JsonRpc', { url: ETH_RPC }, { gasPrice: 0 })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('Factory', function () {
                var _a;
                return __awaiter(this, void 0, void 0, function () {
                    var factoryPoolsDataFromApi, blacklist, factoryPoolsData;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, curve.fetchFactoryPools()];
                            case 1:
                                _b.sent();
                                factoryPoolsDataFromApi = __assign({}, curve.constants.FACTORY_POOLS_DATA);
                                blacklist = (_a = BLACK_LIST[curve.chainId]) !== null && _a !== void 0 ? _a : [];
                                blacklist.forEach(function (item) {
                                    for (var key in factoryPoolsDataFromApi) {
                                        if (factoryPoolsDataFromApi[key].swap_address === item) {
                                            delete factoryPoolsDataFromApi[key];
                                        }
                                    }
                                });
                                return [4 /*yield*/, curve.fetchFactoryPools(false)];
                            case 2:
                                _b.sent();
                                factoryPoolsData = __assign({}, curve.constants.FACTORY_POOLS_DATA);
                                factoryPoolsDataTest(factoryPoolsDataFromApi, factoryPoolsData, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('crvUSD factory', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var factoryPoolsDataFromApi, factoryPoolsData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.fetchCrvusdFactoryPools()];
                            case 1:
                                _a.sent();
                                factoryPoolsDataFromApi = __assign({}, curve.constants.CRVUSD_FACTORY_POOLS_DATA);
                                return [4 /*yield*/, curve.fetchCrvusdFactoryPools(false)];
                            case 2:
                                _a.sent();
                                factoryPoolsData = __assign({}, curve.constants.CRVUSD_FACTORY_POOLS_DATA);
                                factoryPoolsDataTest(factoryPoolsDataFromApi, factoryPoolsData, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('EYWA factory', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var factoryPoolsDataFromApi, factoryPoolsData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.fetchEywaFactoryPools()];
                            case 1:
                                _a.sent();
                                factoryPoolsDataFromApi = __assign({}, curve.constants.EYWA_FACTORY_POOLS_DATA);
                                return [4 /*yield*/, curve.fetchEywaFactoryPools(false)];
                            case 2:
                                _a.sent();
                                factoryPoolsData = __assign({}, curve.constants.EYWA_FACTORY_POOLS_DATA);
                                factoryPoolsDataTest(factoryPoolsDataFromApi, factoryPoolsData, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('Stable NG factory', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var factoryPoolsDataFromApi, factoryPoolsData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.fetchStableNgFactoryPools()];
                            case 1:
                                _a.sent();
                                factoryPoolsDataFromApi = __assign({}, curve.constants.STABLE_NG_FACTORY_POOLS_DATA);
                                return [4 /*yield*/, curve.fetchStableNgFactoryPools(false)];
                            case 2:
                                _a.sent();
                                factoryPoolsData = __assign({}, curve.constants.STABLE_NG_FACTORY_POOLS_DATA);
                                factoryPoolsDataTest(factoryPoolsDataFromApi, factoryPoolsData, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('Crypto factory', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var cryptoFactoryPoolsDataFromApi, cryptoFactoryPoolsData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.fetchCryptoFactoryPools()];
                            case 1:
                                _a.sent();
                                cryptoFactoryPoolsDataFromApi = __assign({}, curve.constants.CRYPTO_FACTORY_POOLS_DATA);
                                return [4 /*yield*/, curve.fetchCryptoFactoryPools(false)];
                            case 2:
                                _a.sent();
                                cryptoFactoryPoolsData = __assign({}, curve.constants.CRYPTO_FACTORY_POOLS_DATA);
                                factoryPoolsDataTest(cryptoFactoryPoolsDataFromApi, cryptoFactoryPoolsData, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('Tricrypto factory', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var tricryptoFactoryPoolsDataFromApi, tricryptoFactoryPoolsData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, curve.fetchTricryptoFactoryPools()];
                            case 1:
                                _a.sent();
                                tricryptoFactoryPoolsDataFromApi = __assign({}, curve.constants.TRICRYPTO_FACTORY_POOLS_DATA);
                                return [4 /*yield*/, curve.fetchTricryptoFactoryPools(false)];
                            case 2:
                                _a.sent();
                                tricryptoFactoryPoolsData = __assign({}, curve.constants.TRICRYPTO_FACTORY_POOLS_DATA);
                                factoryPoolsDataTest(tricryptoFactoryPoolsDataFromApi, tricryptoFactoryPoolsData, true);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
