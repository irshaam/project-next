"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePostDto = exports.PostStatus = void 0;
var class_validator_1 = require("class-validator");
var PostStatus;
(function (PostStatus) {
    PostStatus["DRAFT"] = "draft";
    PostStatus["REVIEW"] = "review";
    PostStatus["REJECTED"] = "rejected";
    PostStatus["PUBLISHED"] = "published";
    PostStatus["UN_PUBLISHED"] = "unpublished";
    PostStatus["ARCHIEVED"] = "archived";
})(PostStatus = exports.PostStatus || (exports.PostStatus = {}));
var CreatePostDto = /** @class */ (function () {
    function CreatePostDto() {
    }
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "slug");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreatePostDto.prototype, "categoryId");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "heading");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "headingDetailed");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "latinHeading");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "leadText");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "highlights");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "topicId");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "featuredMedia");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "content");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "contentHtml");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "feedback");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "changes");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(PostStatus)
    ], CreatePostDto.prototype, "status");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "currentVersion");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], CreatePostDto.prototype, "isLocked");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "showAuthors");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], CreatePostDto.prototype, "isFeatured");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "layout");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], CreatePostDto.prototype, "isPublished");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "locationId");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "createdBy");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "createdAt");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "tags");
    __decorate([
        class_validator_1.IsOptional()
    ], CreatePostDto.prototype, "authors");
    return CreatePostDto;
}());
exports.CreatePostDto = CreatePostDto;
