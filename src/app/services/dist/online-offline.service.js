"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OnlineOfflineService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var OnlineOfflineService = /** @class */ (function () {
    function OnlineOfflineService() {
        var _this = this;
        this.statusConexao$ = new rxjs_1.Subject();
        window.addEventListener('online', function () { return _this.atualizaStatusConexao(); });
        window.addEventListener('offline', function () { return _this.atualizaStatusConexao(); });
    }
    Object.defineProperty(OnlineOfflineService.prototype, "isOnline", {
        get: function () {
            return !!window.navigator.onLine;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OnlineOfflineService.prototype, "statusConexao", {
        get: function () {
            return this.statusConexao$.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    OnlineOfflineService.prototype.atualizaStatusConexao = function () {
        this.statusConexao$.next(this.isOnline);
    };
    OnlineOfflineService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OnlineOfflineService);
    return OnlineOfflineService;
}());
exports.OnlineOfflineService = OnlineOfflineService;
