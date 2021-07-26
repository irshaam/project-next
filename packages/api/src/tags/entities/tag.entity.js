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
exports.Tag = void 0;
var typeorm_1 = require("typeorm");
var post_entity_1 = require("../../posts/entities/post.entity");
var tag_type_entity_1 = require("../../tag-types/entities/tag-type.entity");
var Tag = /** @class */ (function () {
    function Tag() {
    }
    Tag_1 = Tag;
    Tag.prototype.setCreatedUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.createdBy = 1;
                return [2 /*return*/];
            });
        });
    };
    Tag.prototype.setUpdatedUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.updatedBy = 2;
                return [2 /*return*/];
            });
        });
    };
    var Tag_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Tag.prototype, "id");
    __decorate([
        typeorm_1.Index({ unique: true }),
        typeorm_1.Column()
    ], Tag.prototype, "name");
    __decorate([
        typeorm_1.Index(),
        typeorm_1.Column({ unique: true })
    ], Tag.prototype, "name_en");
    __decorate([
        typeorm_1.Column({ unique: true })
    ], Tag.prototype, "slug");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], Tag.prototype, "description");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], Tag.prototype, "description_en");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "parentId");
    __decorate([
        typeorm_1.Column()
    ], Tag.prototype, "typeId");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "image");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "icon");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "primary_color");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "secondry_color");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "layout");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "og_image");
    __decorate([
        typeorm_1.Column({ nullable: true, length: 300 })
    ], Tag.prototype, "og_title");
    __decorate([
        typeorm_1.Column({ nullable: true, length: 500 })
    ], Tag.prototype, "og_description");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "twitter_image");
    __decorate([
        typeorm_1.Column({ nullable: true, length: 300 })
    ], Tag.prototype, "twitter_title");
    __decorate([
        typeorm_1.Column({ nullable: true, length: 500 })
    ], Tag.prototype, "twitter_description");
    __decorate([
        typeorm_1.Column({ nullable: true, length: 300 })
    ], Tag.prototype, "meta_title");
    __decorate([
        typeorm_1.Column({ nullable: true, length: 500 })
    ], Tag.prototype, "meta_description");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Tag.prototype, "createdOn");
    __decorate([
        typeorm_1.Column()
    ], Tag.prototype, "createdBy");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Tag.prototype, "updatedOn");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tag.prototype, "updatedBy");
    __decorate([
        typeorm_1.ManyToOne(function () { return tag_type_entity_1.TagType; }, function (tagType) { return tagType.tags; }),
        typeorm_1.JoinColumn({ name: 'type_id' })
    ], Tag.prototype, "type");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Tag_1; }, function (tag) { return tag.children; }),
        typeorm_1.TreeParent(),
        typeorm_1.JoinColumn({ name: 'parent_id' })
    ], Tag.prototype, "parent");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Tag_1; }, function (tag) { return tag.parent; }),
        typeorm_1.TreeChildren()
    ], Tag.prototype, "children");
    __decorate([
        typeorm_1.OneToMany(function () { return post_entity_1.Post; }, function (post) { return post.category; })
    ], Tag.prototype, "posts");
    __decorate([
        typeorm_1.BeforeInsert()
    ], Tag.prototype, "setCreatedUser");
    __decorate([
        typeorm_1.BeforeUpdate()
    ], Tag.prototype, "setUpdatedUser");
    Tag = Tag_1 = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Tree('adjacency-list')
    ], Tag);
    return Tag;
}());
exports.Tag = Tag;
