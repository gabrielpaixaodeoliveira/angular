"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
        while (_) try {
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
exports.__esModule = true;
exports.SeguroService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var online_offline_service_1 = require("../services/online-offline.service");
var dexie_1 = require("dexie");
var SeguroService = /** @class */ (function () {
    function SeguroService(injector, nomeTabela, urlApi) {
        this.injector = injector;
        this.nomeTabela = nomeTabela;
        this.urlApi = urlApi;
        this.API_SEGUROS = "http://localhost:9000";
        this.table = null;
        this.http = this.injector.get(http_1.HttpClient);
        this.onlineOfflineService = this.injector.get(online_offline_service_1.OnlineOfflineService);
        this.ouvirStatusConexao();
        this.iniciarIndexedDb();
    }
    SeguroService.prototype.iniciarIndexedDb = function () {
        var _a;
        this.db = new dexie_1["default"]('db-seguros');
        this.db.version(1).stores((_a = {},
            _a[this.nomeTabela] = 'id',
            _a));
        this.table = this.db.table(this.nomeTabela);
    };
    SeguroService.prototype.salvarAPI = function (nomeTabela) {
        this.http.post(this.urlApi, this.nomeTabela).subscribe(function () { return alert("sucesso"); }, function (err) { return console.log(err); });
    };
    SeguroService.prototype.salvarLocal = function (tabela) {
        return __awaiter(this, void 0, void 0, function () {
            var todosSeguros, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.table.add(this.nomeTabela)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.table.toArray()];
                    case 2:
                        todosSeguros = _a.sent();
                        console.log(todosSeguros);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SeguroService.prototype.enviarIndexedDbParaAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var todosSeguros, _i, todosSeguros_1, seguro;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table.toArray()];
                    case 1:
                        todosSeguros = _a.sent();
                        _i = 0, todosSeguros_1 = todosSeguros;
                        _a.label = 2;
                    case 2:
                        if (!(_i < todosSeguros_1.length)) return [3 /*break*/, 5];
                        seguro = todosSeguros_1[_i];
                        this.cadastrar(seguro);
                        return [4 /*yield*/, this.table["delete"](seguro.id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SeguroService.prototype.cadastrar = function (tabela) {
        if (this.onlineOfflineService.isOnline) {
            this.salvarAPI(tabela);
        }
        else {
            this.salvarLocal(tabela);
        }
    };
    SeguroService.prototype.listar = function () {
        return this.http.get(this.urlApi);
    };
    SeguroService.prototype.ouvirStatusConexao = function () {
        var _this = this;
        this.onlineOfflineService.statusConexao.subscribe(function (online) {
            if (online) {
                _this.enviarIndexedDbParaAPI();
            }
            else {
                console.log("estou offline");
            }
        });
    };
    SeguroService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SeguroService);
    return SeguroService;
}());
exports.SeguroService = SeguroService;
