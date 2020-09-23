"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListarSeguroComponent = void 0;
var core_1 = require("@angular/core");
var ListarSeguroComponent = /** @class */ (function () {
    function ListarSeguroComponent(seguroService) {
        this.seguroService = seguroService;
    }
    ListarSeguroComponent.prototype.ngOnInit = function () {
        this.seguros$ = this.seguroService.listar();
    };
    ListarSeguroComponent = __decorate([
        core_1.Component({
            selector: 'app-listar-seguro',
            templateUrl: './listar-seguro.component.html',
            styleUrls: ['./listar-seguro.component.css']
        })
    ], ListarSeguroComponent);
    return ListarSeguroComponent;
}());
exports.ListarSeguroComponent = ListarSeguroComponent;
