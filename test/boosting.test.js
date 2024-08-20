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
import { BN, getAllowance } from "../src/utils.js";
import { getCrv, createLock, increaseAmount, increaseUnlockTime, getLockedAmountAndUnlockTime, calcUnlockTime } from '../src/boosting.js';
import { curve } from "../src/curve.js";
describe('Boosting', function () {
    this.timeout(120000);
    var address = '';
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, curve.init('JsonRpc', {}, { gasPrice: 0 })];
                    case 1:
                        _a.sent();
                        address = curve.signerAddress;
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Creates lock in Voting Escrow contract', function () {
        return __awaiter(this, void 0, void 0, function () {
            var lockAmount, initialCrvBalance, calculatedUnlockTime, crvBalance, _a, lockedAmount, unlockTime, allowance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        lockAmount = '1000';
                        return [4 /*yield*/, getCrv()];
                    case 1:
                        initialCrvBalance = _b.sent();
                        calculatedUnlockTime = calcUnlockTime(365);
                        return [4 /*yield*/, createLock(lockAmount, 365)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getCrv()];
                    case 3:
                        crvBalance = _b.sent();
                        return [4 /*yield*/, getLockedAmountAndUnlockTime()];
                    case 4:
                        _a = _b.sent(), lockedAmount = _a.lockedAmount, unlockTime = _a.unlockTime;
                        return [4 /*yield*/, getAllowance(['crv'], curve.signerAddress, curve.constants.ALIASES.voting_escrow)];
                    case 5:
                        allowance = (_b.sent())[0];
                        assert.deepEqual(BN(lockedAmount), BN(initialCrvBalance).minus(BN(crvBalance)));
                        assert.equal(unlockTime, calculatedUnlockTime);
                        assert.equal(Number(allowance), 0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Increases amount locked in Voting Escrow contract', function () {
        return __awaiter(this, void 0, void 0, function () {
            var increaseLockAmount, initialCrvBalance, initialLockedAmount, crvBalance, lockedAmount, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        increaseLockAmount = '1000';
                        return [4 /*yield*/, getCrv()];
                    case 1:
                        initialCrvBalance = _a.sent();
                        return [4 /*yield*/, getLockedAmountAndUnlockTime()];
                    case 2:
                        initialLockedAmount = (_a.sent()).lockedAmount;
                        return [4 /*yield*/, increaseAmount(increaseLockAmount)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, getCrv()];
                    case 4:
                        crvBalance = _a.sent();
                        return [4 /*yield*/, getLockedAmountAndUnlockTime()];
                    case 5:
                        lockedAmount = (_a.sent()).lockedAmount;
                        return [4 /*yield*/, getAllowance(['crv'], curve.signerAddress, curve.constants.ALIASES.voting_escrow)];
                    case 6:
                        allowance = (_a.sent())[0];
                        assert.deepEqual(BN(lockedAmount).minus(BN(initialLockedAmount)), BN(initialCrvBalance).minus(BN(crvBalance)));
                        assert.equal(Number(allowance), 0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Extends lock time', function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialUnlockTime, calculatedUnlockTime, unlockTime, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getLockedAmountAndUnlockTime()];
                    case 1:
                        initialUnlockTime = (_a.sent()).unlockTime;
                        calculatedUnlockTime = calcUnlockTime(120, initialUnlockTime);
                        return [4 /*yield*/, increaseUnlockTime(120)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, getLockedAmountAndUnlockTime(address)];
                    case 3:
                        unlockTime = (_a.sent()).unlockTime;
                        return [4 /*yield*/, getAllowance(['crv'], curve.signerAddress, curve.constants.ALIASES.voting_escrow)];
                    case 4:
                        allowance = (_a.sent())[0];
                        assert.equal(unlockTime, calculatedUnlockTime);
                        assert.equal(Number(allowance), 0);
                        return [2 /*return*/];
                }
            });
        });
    });
});
