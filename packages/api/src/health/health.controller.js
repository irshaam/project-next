"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HealthController = void 0;
var common_1 = require("@nestjs/common");
var terminus_1 = require("@nestjs/terminus");
var HealthController = /** @class */ (function () {
    function HealthController(health, http) {
        this.health = health;
        this.http = http;
    }
    HealthController.prototype.check = function () {
        var _this = this;
        return this.health.check([
            function () { return _this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'); },
        ]);
    };
    __decorate([
        common_1.Get(),
        terminus_1.HealthCheck()
    ], HealthController.prototype, "check");
    HealthController = __decorate([
        common_1.Controller('health')
    ], HealthController);
    return HealthController;
}());
exports.HealthController = HealthController;
