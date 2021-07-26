"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
var class_validator_1 = require("class-validator");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "name_en");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "slug");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsEmail()
    ], CreateUserDto.prototype, "email");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "password");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "picture");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "cover_picture");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "bio");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "bio_en");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "twitter");
    __decorate([
        class_validator_1.IsOptional()
    ], CreateUserDto.prototype, "facebook");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], CreateUserDto.prototype, "isActive");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
