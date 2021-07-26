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
exports.Post = exports.PostStatus = void 0;
var typeorm_1 = require("typeorm");
var utils_1 = require("../../shared/utils");
var tag_entity_1 = require("../../tags/entities/tag.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var post_revision_entity_1 = require("./post-revision.entity");
var PostStatus;
(function (PostStatus) {
    PostStatus["DRAFT"] = "draft";
    PostStatus["REVIEW"] = "review";
    PostStatus["REJECTED"] = "rejected";
    PostStatus["APPROVED"] = "approved";
    PostStatus["SCHEDULED"] = "scheduled";
    PostStatus["PUBLISHED"] = "published";
    PostStatus["UN_PUBLISHED"] = "unpublished";
    PostStatus["ARCHIEVED"] = "archived";
})(PostStatus = exports.PostStatus || (exports.PostStatus = {}));
var Post = /** @class */ (function () {
    function Post() {
    }
    Post.prototype.setNanoid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, utils_1.nanoid()];
                    case 1:
                        _a.nanoid = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.setStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.status = PostStatus.DRAFT;
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Post.prototype, "id");
    __decorate([
        typeorm_1.Column({ length: 20, nullable: false, unique: true })
    ], Post.prototype, "nanoid");
    __decorate([
        typeorm_1.ManyToOne(function () { return tag_entity_1.Tag; }, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'category_id' })
    ], Post.prototype, "category");
    __decorate([
        typeorm_1.Column()
    ], Post.prototype, "categoryId");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "topicId");
    __decorate([
        typeorm_1.ManyToOne(function () { return tag_entity_1.Tag; }, { nullable: true }),
        typeorm_1.JoinColumn({ name: 'topic_id' })
    ], Post.prototype, "topic");
    __decorate([
        typeorm_1.Column({ nullable: true, unique: true })
    ], Post.prototype, "slug");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "featured_image");
    __decorate([
        typeorm_1.Column({ nullable: false, unique: true })
    ], Post.prototype, "heading");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "heading_detailed");
    __decorate([
        typeorm_1.Column({ nullable: true, unique: true })
    ], Post.prototype, "latin_heading");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "lead_text");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "hightlights");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "content");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "content_html");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], Post.prototype, "feedback");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], Post.prototype, "changes");
    __decorate([
        typeorm_1.Column({ nullable: false, "default": 'dv' })
    ], Post.prototype, "locale");
    __decorate([
        typeorm_1.Column({ nullable: false, "default": 'base' })
    ], Post.prototype, "layout");
    __decorate([
        typeorm_1.Column({ type: 'enum', "default": 'draft', "enum": PostStatus })
    ], Post.prototype, "status");
    __decorate([
        typeorm_1.Column({ "default": 0 })
    ], Post.prototype, "current_version");
    __decorate([
        typeorm_1.Column({ type: 'boolean', "default": 1 })
    ], Post.prototype, "isLocked");
    __decorate([
        typeorm_1.Column({ type: 'boolean', "default": 1 })
    ], Post.prototype, "showAuthors");
    __decorate([
        typeorm_1.Column({ nullable: true, "default": 0 })
    ], Post.prototype, "isFeatured");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Post.prototype, "createdAt");
    __decorate([
        typeorm_1.OneToOne(function () { return user_entity_1.User; }),
        typeorm_1.JoinColumn({ name: 'created_by' })
    ], Post.prototype, "createdBy");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Post.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToOne(function () { return user_entity_1.User; }),
        typeorm_1.JoinColumn({ name: 'updated_by' })
    ], Post.prototype, "updatedBy");
    __decorate([
        typeorm_1.Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
    ], Post.prototype, "scheduledAt");
    __decorate([
        typeorm_1.Column({ name: 'edited_at', type: 'timestamp', nullable: true })
    ], Post.prototype, "editedAt");
    __decorate([
        typeorm_1.OneToOne(function () { return user_entity_1.User; }),
        typeorm_1.JoinColumn({ name: 'edited_by' })
    ], Post.prototype, "editedBy");
    __decorate([
        typeorm_1.Column({ type: 'boolean', "default": 0 })
    ], Post.prototype, "isPublished");
    __decorate([
        typeorm_1.Column({ type: 'timestamp', nullable: true })
    ], Post.prototype, "publishedAt");
    __decorate([
        typeorm_1.OneToOne(function () { return user_entity_1.User; }, { nullable: true }),
        typeorm_1.JoinColumn({ name: 'published_by' })
    ], Post.prototype, "publishedBy");
    __decorate([
        typeorm_1.ManyToMany(function () { return tag_entity_1.Tag; }, {}),
        typeorm_1.JoinTable({ name: 'post_tags' })
    ], Post.prototype, "tags");
    __decorate([
        typeorm_1.ManyToMany(function () { return user_entity_1.User; }, {}),
        typeorm_1.JoinTable({ name: 'post_authors' })
    ], Post.prototype, "authors");
    __decorate([
        typeorm_1.OneToMany(function () { return post_revision_entity_1.PostRevision; }, function (revision) { return revision.post; }, {
            eager: true
        })
    ], Post.prototype, "versions");
    __decorate([
        typeorm_1.BeforeInsert()
    ], Post.prototype, "setNanoid");
    __decorate([
        typeorm_1.BeforeInsert()
    ], Post.prototype, "setStatus");
    Post = __decorate([
        typeorm_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
