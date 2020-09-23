"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MarcaCarroService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var MarcaCarroService = /** @class */ (function () {
    function MarcaCarroService(http) {
        this.http = http;
        this.API_CARROS = 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes';
    }
    MarcaCarroService.prototype.getMarcas = function () {
        var _this = this;
        return this.http.jsonp(this.API_CARROS, 'callback')
            .pipe(operators_1.map(function (res) { return _this.mapMarcas(res.Makes); }));
    };
    MarcaCarroService.prototype.mapMarcas = function (marcas) {
        return marcas.map(function (marc) { return ({
            codigo: marc.make_id,
            nome: marc.make_display
        }); });
    };
    MarcaCarroService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MarcaCarroService);
    return MarcaCarroService;
}());
exports.MarcaCarroService = MarcaCarroService;
