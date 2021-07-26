"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorsInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var ErrorsInterceptor = /** @class */ (function () {
    function ErrorsInterceptor() {
    }
    ErrorsInterceptor.prototype.intercept = function (context, next) {
        return next.handle().pipe(operators_1.catchError(function (error) {
            if (error.name === 'QueryFailedError') {
                throw new common_1.BadRequestException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: [error.message, error.code, error.detail],
                    timestamp: new Date().toISOString()
                });
            }
            throw error;
        }));
    };
    ErrorsInterceptor = __decorate([
        common_1.Injectable()
    ], ErrorsInterceptor);
    return ErrorsInterceptor;
}());
exports.ErrorsInterceptor = ErrorsInterceptor;
