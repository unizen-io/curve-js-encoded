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
import curve from "../../src/index.js";
// ----------------
// TO MAKE THIS TEST WORKING YOU NEED TO DO THESE STEPS FIRST
//
// 1. Run
//     node deposit.test.js
//
// 2. Go to brownie console and run:
//     chain.sleep(1000000)
//     chain.mine(1)
//
// ----------------
var PLAIN_POOLS = ['susd', 'ren', 'sbtc', 'hbtc', '3pool', 'seth', 'steth', 'ankreth', 'link', 'reth', 'eurt']; // Without eurs
var LENDING_POOLS = ['compound', 'usdt', 'y', 'busd', 'pax', 'aave', 'saave', 'ib'];
var META_POOLS = ['gusd', 'husd', 'usdk', 'usdn', 'musd', 'rsv', 'tbtc', 'dusd', 'pbtc', 'bbtc', 'obtc', 'ust', 'usdp', 'tusd', 'frax', 'lusd', 'busdv2', 'alusd', 'mim'];
var CRYPTO_POOLS = ['tricrypto2', 'eurtusd', 'crveth', 'cvxeth'];
var ETHEREUM_POOLS = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], PLAIN_POOLS, true), LENDING_POOLS, true), META_POOLS, true), CRYPTO_POOLS, true);
var POLYGON_POOLS = ['aave', 'ren', 'atricrypto3', 'eurtusd'];
var ARBITRUM_POOLS = ['2pool', 'tricrypto', 'ren', 'eursusd'];
describe('Claiming CRV', function () {
    this.timeout(120000);
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    var _loop_1 = function (poolName) {
        it("Claims CRV from ".concat(poolName.toUpperCase()), function () {
            return __awaiter(this, void 0, void 0, function () {
                var pool, crvBalanceBefore, expected, crvBalanceAfter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pool = curve.getPool(poolName);
                            return [4 /*yield*/, curve.getBalances(['crv'])];
                        case 1:
                            crvBalanceBefore = (_a.sent())[0];
                            return [4 /*yield*/, pool.claimableCrv()];
                        case 2:
                            expected = _a.sent();
                            console.log(crvBalanceBefore, "+", expected, "=", Number(crvBalanceBefore) + Number(expected));
                            return [4 /*yield*/, pool.claimCrv()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, curve.getBalances(['crv'])];
                        case 4:
                            crvBalanceAfter = (_a.sent())[0];
                            console.log(crvBalanceAfter);
                            assert.approximately(Number(crvBalanceAfter), Number(crvBalanceBefore) + Number(expected), 1e-3);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    for (var _i = 0, ARBITRUM_POOLS_1 = ARBITRUM_POOLS; _i < ARBITRUM_POOLS_1.length; _i++) {
        var poolName = ARBITRUM_POOLS_1[_i];
        _loop_1(poolName);
    }
});
