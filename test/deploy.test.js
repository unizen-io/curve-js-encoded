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
import { ethers } from "ethers";
import { assert } from "chai";
import curve from "../src/index.js";
import { curve as _curve } from "../src/curve.js";
describe('Factory deploy', function () {
    this.timeout(240000);
    // let address = '';
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
                    case 1:
                        _a.sent();
                        // address = curve.signerAddress;
                        if (curve.chainId !== 1) {
                            throw Error('Run this test only on Ethereum network');
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- PLAIN (2 COINS) ---
    it('Deploy stable plain pool and gauge (2 coins, implementation 4 (0 with ema))', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_1, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 4, 600)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_1 = balances; _i < balances_1.length; _i++) {
                            b = balances_1[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (2 coins, implementation 1)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_2, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 1)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_2 = balances; _i < balances_2.length; _i++) {
                            b = balances_2[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (2 coins, implementation 5 (2 with ema and oracle), no oracle)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, poolContract, methodId, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_3, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['eth'], _curve.constants.COINS['steth']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 1, 5)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        return [4 /*yield*/, curve.factory.setOracle(poolAddress)];
                    case 3:
                        _a.sent();
                        poolContract = _curve.contracts[poolAddress].contract;
                        return [4 /*yield*/, poolContract.oracle_method(_curve.constantOptions)];
                    case 4:
                        methodId = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        assert.equal(methodId.toString(), "0");
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 5:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 6:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 7:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10])];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 9:
                        balances = _a.sent();
                        for (_i = 0, balances_3 = balances; _i < balances_3.length; _i++) {
                            b = balances_3[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (2 coins, implementation 5 (2 with ema and oracle), with oracle)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, poolContract, methodId, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_4, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['eth'], _curve.constants.COINS['wbeth']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 1, 5, 300)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        return [4 /*yield*/, curve.factory.setOracle(poolAddress, _curve.constants.COINS['wbeth'], "exchangeRate()")];
                    case 3:
                        _a.sent();
                        poolContract = _curve.contracts[poolAddress].contract;
                        return [4 /*yield*/, poolContract.oracle_method(_curve.constantOptions)];
                    case 4:
                        methodId = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        assert.equal(methodId.toString(), "26970434976082401409518253780829902607332438938587170119746310637809052410593");
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 5:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 6:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 7:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10])];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 9:
                        balances = _a.sent();
                        for (_i = 0, balances_4 = balances; _i < balances_4.length; _i++) {
                            b = balances_4[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (2 coins, implementation 3)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_5, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 3)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_5 = balances; _i < balances_5.length; _i++) {
                            b = balances_5[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable-ng plain pool and gauge (2 coins, implementation 0, (2 with ema and oracle), with oracle)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, assetTypes, oracleAddresses, methodNames, deployPoolTx, poolAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [
                            "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
                            "0xac3e018457b222d93114458476f3e3416abbe38f", // sfrxETH
                        ];
                        assetTypes = [2, 1];
                        oracleAddresses = [
                            '0x0000000000000000000000000000000000000000',
                            '0xac3e018457b222d93114458476f3e3416abbe38f',
                        ];
                        methodNames = [
                            '',
                            'pricePerShare',
                        ];
                        return [4 /*yield*/, curve.stableNgFactory.deployPlainPool('Test pool', 'test', coins, 5, 0.05, 5, assetTypes, 0, 600, oracleAddresses, methodNames)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.stableNgFactory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- PLAIN (3 COINS) ---
    it('Deploy stable plain pool and gauge (3 coins, implementation 0)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_6, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim'], _curve.constants.COINS['lusd']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 0)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_6 = balances; _i < balances_6.length; _i++) {
                            b = balances_6[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (3 coins, implementation 1)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_7, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim'], _curve.constants.COINS['lusd']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 1)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_7 = balances; _i < balances_7.length; _i++) {
                            b = balances_7[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (3 coins, implementation 2)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_8, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['eth'], _curve.constants.COINS['steth'], _curve.constants.COINS['weth']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 1, 2)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_8 = balances; _i < balances_8.length; _i++) {
                            b = balances_8[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (3 coins, implementation 3)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_9, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim'], _curve.constants.COINS['lusd']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 3)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_9 = balances; _i < balances_9.length; _i++) {
                            b = balances_9[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- PLAIN (4 COINS) ---
    it('Deploy stable plain pool and gauge (4 coins, implementation 0)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_10, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim'], _curve.constants.COINS['lusd'], _curve.constants.COINS['busd']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 0)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_10 = balances; _i < balances_10.length; _i++) {
                            b = balances_10[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (4 coins, implementation 1)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_11, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim'], _curve.constants.COINS['lusd'], _curve.constants.COINS['busd']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 1)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_11 = balances; _i < balances_11.length; _i++) {
                            b = balances_11[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (4 coins, implementation 2)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_12, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['eth'], _curve.constants.COINS['steth'], _curve.constants.COINS['weth'], _curve.constants.COINS['frxeth']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 1, 2)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_12 = balances; _i < balances_12.length; _i++) {
                            b = balances_12[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable plain pool and gauge (4 coins, implementation 3)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_13, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['usdp'], _curve.constants.COINS['mim'], _curve.constants.COINS['lusd'], _curve.constants.COINS['busd']];
                        return [4 /*yield*/, curve.factory.deployPlainPool('Test pool', 'TST', coins, 200, 0.1, 0, 3)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedPlainPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_13 = balances; _i < balances_13.length; _i++) {
                            b = balances_13[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- META (3pool) ---
    it('Deploy stable meta pool and gauge (3pool, implementation 0)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_14, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['3pool'].swap_address;
                        coin = _curve.constants.COINS['mim'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 0)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStakeWrapped([10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.wrappedBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_14 = balances; _i < balances_14.length; _i++) {
                            b = balances_14[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable meta pool and gauge (3pool, implementation 1)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_15, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['3pool'].swap_address;
                        coin = _curve.constants.COINS['mim'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 1)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStakeWrapped([10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.wrappedBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_15 = balances; _i < balances_15.length; _i++) {
                            b = balances_15[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable-ng meta pool (3pool, implementation 0)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, oracleAddress, methodName, deployPoolTx, poolAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['3pool'].swap_address;
                        coin = "0xac3e018457b222d93114458476f3e3416abbe38f";
                        oracleAddress = '0xac3e018457b222d93114458476f3e3416abbe38f';
                        methodName = 'pricePerShare';
                        return [4 /*yield*/, curve.stableNgFactory.deployMetaPool(basePool, 'Test pool', 'test', coin, 5, 0.05, 5, 600, 0, 0, methodName, oracleAddress)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.stableNgFactory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- META (fraxusdc) ---
    it('Deploy stable meta pool and gauge (fraxusc, implementation 0)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_16, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['fraxusdc'].swap_address;
                        coin = _curve.constants.COINS['mim'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 0)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_16 = balances; _i < balances_16.length; _i++) {
                            b = balances_16[_i];
                            assert.isAtLeast(Number(b), 5);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable meta pool and gauge (fraxusc, implementation 1)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_17, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['fraxusdc'].swap_address;
                        coin = _curve.constants.COINS['mim'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 1)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_17 = balances; _i < balances_17.length; _i++) {
                            b = balances_17[_i];
                            assert.isAtLeast(Number(b), 5);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- META (sbtc) ---
    it('Deploy stable meta pool and gauge (sbtc, implementation 0)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_18, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['sbtc'].swap_address;
                        coin = _curve.constants.COINS['tbtc'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 0)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStakeWrapped([10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.wrappedBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_18 = balances; _i < balances_18.length; _i++) {
                            b = balances_18[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable meta pool and gauge (sbtc, implementation 1)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_19, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['sbtc'].swap_address;
                        coin = _curve.constants.COINS['tbtc'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 1)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStakeWrapped([10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.wrappedBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_19 = balances; _i < balances_19.length; _i++) {
                            b = balances_19[_i];
                            assert.equal(Number(b), 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- META (ren) ---
    it('Deploy stable meta pool and gauge (ren, implementation 0)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_20, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['ren'].swap_address;
                        coin = _curve.constants.COINS['tbtc'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 0)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_20 = balances; _i < balances_20.length; _i++) {
                            b = balances_20[_i];
                            assert.isAtLeast(Number(b), 5);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Deploy stable meta pool and gauge (ren, implementation 1)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePool, coin, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, balances, _i, balances_21, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePool = _curve.constants.POOLS_DATA['ren'].swap_address;
                        coin = _curve.constants.COINS['tbtc'];
                        return [4 /*yield*/, curve.factory.deployMetaPool(basePool, 'Test pool', 'TST', coin, 200, 0.1, 1)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedMetaPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(poolAddress));
                        return [4 /*yield*/, curve.factory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        assert.isTrue(ethers.isAddress(gaugeAddress));
                        return [4 /*yield*/, curve.factory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.depositAndStake([10, 10, 10])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 7:
                        balances = _a.sent();
                        for (_i = 0, balances_21 = balances; _i < balances_21.length; _i++) {
                            b = balances_21[_i];
                            assert.isAtLeast(Number(b), 5);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- CRYPTO ---
    it('Deploy crypto factory pool and gauge', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, amounts, underlyingBalances, wrappedBalances, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['eurt'], _curve.constants.COINS['weth']];
                        return [4 /*yield*/, curve.cryptoFactory.deployPool("Test crypto pool", "TCP", coins, 400000, 0.0000725, 0.25, 0.45, 0.000002, 0.00023, 0.000146, 600, 1500)];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.cryptoFactory.getDeployedPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        return [4 /*yield*/, curve.cryptoFactory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        return [4 /*yield*/, curve.cryptoFactory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.cryptoSeedAmounts(30)];
                    case 6:
                        amounts = _a.sent();
                        return [4 /*yield*/, pool.depositAndStake(amounts)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 8:
                        underlyingBalances = _a.sent();
                        return [4 /*yield*/, pool.stats.wrappedBalances()];
                    case 9:
                        wrappedBalances = _a.sent();
                        for (i = 0; i < amounts.length; i++) {
                            assert.equal(Number(underlyingBalances[i]), Number(amounts[i]));
                            assert.equal(Number(wrappedBalances[i]), Number(amounts[i]));
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    // --- TRICRYPTO ---
    it('Deploy tricrypto factory pool and gauge', function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, deployPoolTx, poolAddress, deployGaugeTx, gaugeAddress, poolId, pool, amounts, underlyingBalances, wrappedBalances, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coins = [_curve.constants.COINS['eurt'], _curve.constants.COINS['weth'], _curve.constants.COINS['wbtc']];
                        return [4 /*yield*/, curve.tricryptoFactory.deployPool("Test tricrypto pool", "TTP", coins, 400000, 0.0000725, 0.25, 0.45, 0.000002, 0.00023, 0.000146, 600, [1900, 27000])];
                    case 1:
                        deployPoolTx = _a.sent();
                        return [4 /*yield*/, curve.tricryptoFactory.getDeployedPoolAddress(deployPoolTx)];
                    case 2:
                        poolAddress = _a.sent();
                        console.log(poolAddress);
                        return [4 /*yield*/, curve.tricryptoFactory.deployGauge(poolAddress)];
                    case 3:
                        deployGaugeTx = _a.sent();
                        return [4 /*yield*/, curve.factory.getDeployedGaugeAddress(deployGaugeTx)];
                    case 4:
                        gaugeAddress = _a.sent();
                        return [4 /*yield*/, curve.tricryptoFactory.fetchRecentlyDeployedPool(poolAddress)];
                    case 5:
                        poolId = _a.sent();
                        pool = curve.getPool(poolId);
                        assert.equal(poolAddress.toLowerCase(), pool.address);
                        assert.equal(gaugeAddress.toLowerCase(), pool.gauge);
                        return [4 /*yield*/, pool.cryptoSeedAmounts(30)];
                    case 6:
                        amounts = _a.sent();
                        console.log(amounts);
                        return [4 /*yield*/, pool.depositAndStake(amounts)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, pool.stats.underlyingBalances()];
                    case 8:
                        underlyingBalances = _a.sent();
                        return [4 /*yield*/, pool.stats.wrappedBalances()];
                    case 9:
                        wrappedBalances = _a.sent();
                        for (i = 0; i < amounts.length; i++) {
                            assert.equal(Number(underlyingBalances[i]), Number(amounts[i]));
                            assert.equal(Number(wrappedBalances[i]), Number(amounts[i]));
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
});
