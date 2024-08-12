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
import { BN } from "../src/utils.js";
import curve from "../src/index.js";
var AAVE_TOKENS = ['adai', 'ausdc', 'ausdt', 'asusd', 'awbtc', 'amdai', 'amusdt', 'amusdc', 'amwbtc', 'avdai', 'avusdt', 'avusdc', 'avwbtc', 'gdai', 'gusdc', 'gfusdt'];
var routerSwapTest = function (coin1, coin2) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, initialBalances, _a, route, output, required, routeStr, _i, route_1, step, balances;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                amount = '1';
                return [4 /*yield*/, curve.getBalances([coin1, coin2])];
            case 1:
                initialBalances = _b.sent();
                return [4 /*yield*/, curve.router.getBestRouteAndOutput(coin1, coin2, amount)];
            case 2:
                _a = _b.sent(), route = _a.route, output = _a.output;
                assert.isTrue(route.length > 0);
                return [4 /*yield*/, curve.router.required(coin1, coin2, output)];
            case 3:
                required = _b.sent();
                routeStr = '';
                for (_i = 0, route_1 = route; _i < route_1.length; _i++) {
                    step = route_1[_i];
                    routeStr += "".concat(step.poolId, " (").concat(step.swapParams, ") --> ");
                }
                routeStr = routeStr.slice(0, routeStr.length - 5);
                console.log(routeStr);
                console.log(route);
                console.log("Output:", output);
                console.log("Required:", required);
                return [4 /*yield*/, curve.router.swap(coin1, coin2, amount)];
            case 4:
                _b.sent();
                return [4 /*yield*/, curve.getBalances([coin1, coin2])];
            case 5:
                balances = _b.sent();
                if (coin1 === 'steth' || coin2 === 'steth') {
                    assert.approximately(Number(Object.values(balances)[0]), Number(BN(Object.values(initialBalances)[0]).minus(BN(amount)).toString()), 1e-18);
                }
                else if (AAVE_TOKENS.includes(coin1) || AAVE_TOKENS.includes(coin2)) {
                    assert.approximately(Number(Object.values(balances)[0]), Number(BN(Object.values(initialBalances)[0]).minus(BN(amount)).toString()), 1e-2);
                }
                else {
                    assert.deepStrictEqual(BN(balances[0]), BN(initialBalances[0]).minus(BN(amount)));
                }
                assert.isAtLeast(Number(balances[1]), Number(BN(initialBalances[1]).plus(BN(output).times(0.995)).toString()));
                assert.approximately(Number(required), Number(amount), 0.03);
                return [2 /*return*/];
        }
    });
}); };
describe('Router swap', function () {
    return __awaiter(this, void 0, void 0, function () {
        var coins, _loop_1, _i, coins_1, coin1;
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
                                return [4 /*yield*/, curve.tricryptoFactory.fetchPools()];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, curve.crvUSDFactory.fetchPools()];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, curve.EYWAFactory.fetchPools()];
                            case 6:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            coins = ['sbtc', 'susd', 'dai', 'mim', 'frax', 'crv', 'cvx', 'eth', 'steth', 'wsteth', 'frxeth', 'sfrxeth', 'wbeth', 'eurt', '3crv', '0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7', '0x045da4bfe02b320f4403674b3b7d121737727a36'];
            _loop_1 = function (coin1) {
                var _loop_2 = function (coin2) {
                    if (coin1 !== coin2) {
                        it("".concat(coin1, " --> ").concat(coin2), function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, routerSwapTest(coin1, coin2)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            err_1 = _a.sent();
                                            console.log(err_1.message);
                                            assert.equal(err_1.message, "This pair can't be exchanged");
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    }
                };
                for (var _b = 0, coins_2 = coins; _b < coins_2.length; _b++) {
                    var coin2 = coins_2[_b];
                    _loop_2(coin2);
                }
            };
            // POLYGON
            // const coins = ['wbtc', 'crv', 'dai', 'usdc', 'usdt', 'eurt', 'weth', 'renbtc', 'amdai', 'amusdc', 'amusdt', 'am3crv', 'matic',
            //     '0x45c32fa6df82ead1e2ef74d17b76547eddfaff89', '0xdAD97F7713Ae9437fa9249920eC8507e5FbB23d3', '0xad326c253a84e9805559b73a08724e11e49ca651']; // frax, atricrypto3 LP, 4eur LP
            // AVALANCHE
            // const coins = ['dai.e', 'weth.e', 'wbtc.e', 'usdc', 'usdt', 'btc.b', 'avax', 'wavax', '2crv', 'avusdt', 'av3crv', '0x130966628846bfd36ff31a822705796e8cb8c18d']; // mim
            // FANTOM
            // const coins = ['dai', 'usdc', 'fusdt', 'idai', 'iusdc', 'ifusdt', 'gdai', 'gusdc', 'gfusdt', 'dai+usdc', 'eth', 'btc', 'renbtc', 'frax', 'crv', '0x666a3776b3e82f171cb1dff7428b6808d2cd7d02']; // aCRV
            // ARBITRUM
            // const coins = ['usdc', 'usdt', 'wbtc', 'eth', 'weth', 'eurs', '2crv', "0x8e0B8c8BB9db49a46697F3a5Bb8A308e744821D2"]; // tricrypto LP
            // OPTIMISM
            // const coins = ['dai', 'usdc', 'usdt', 'susd', '3crv', 'eth', 'weth', 'wsteth', 'seth'];
            // XDAI
            // const coins = ['wxdai', 'usdc', 'usdt', 'rai', 'x3crv', 'wbtc', 'weth', '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb', '0xa4ef9da5ba71cc0d2e5e877a910a37ec43420445']; // GNO, sGNO
            // MOONBEAM
            // const coins = ['dai', 'usdc', 'usdt', '3crv', '0x765277EebeCA2e31912C9946eAe1021199B39C61']; // DAI2
            // AURORA && KAVA && CELO
            // const coins = ['dai', 'usdc', 'usdt'];
            for (_i = 0, coins_1 = coins; _i < coins_1.length; _i++) {
                coin1 = coins_1[_i];
                _loop_1(coin1);
            }
            return [2 /*return*/];
        });
    });
});
