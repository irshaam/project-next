"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateTagDto = void 0;
var class_validator_1 = require("class-validator");
var CreateTagDto = /** @class */ (function () {
    function CreateTagDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateTagDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateTagDto.prototype, "nameEn");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateTagDto.prototype, "slug");
    __decorate([
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "description");
    __decorate([
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "descriptionEn");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsNumber()
    ], CreateTagDto.prototype, "typeId");
    __decorate([
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "parentId");
    __decorate([
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "image");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateTagDto.prototype, "icon");
    __decorate([
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "accentColorr");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateTagDto.prototype, "ogImage");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "ogTitle");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "ogDescription");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "twitterImage");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "twitterTilte");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "twitterDescription");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "metaTitle");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsOptional()
    ], CreateTagDto.prototype, "metaDescription");
    return CreateTagDto;
}());
exports.CreateTagDto = CreateTagDto;
