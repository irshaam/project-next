"use strict";
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
var tag_type_entity_1 = require("../../tag-types/entities/tag-type.entity");
var CreateUsers = /** @class */ (function () {
    function CreateUsers() {
    }
    CreateUsers.prototype.run = function (factory, connection) {
        return __awaiter(this, void 0, void 0, function () {
            var tagType1, repo1, tagType2, repo2, tagType3, repo3, tagType4, repo4, tagType5, repo5, tagType6, repo6, tagType7, repo7, tagType8, repo8, tagType9, repo9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagType1 = new tag_type_entity_1.TagType();
                        tagType1.name = 'Category';
                        tagType1.slug = 'category';
                        repo1 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo1.save(tagType1)];
                    case 1:
                        _a.sent();
                        tagType2 = new tag_type_entity_1.TagType();
                        tagType2.name = 'System';
                        tagType2.slug = 'system';
                        repo2 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo2.save(tagType2)];
                    case 2:
                        _a.sent();
                        tagType3 = new tag_type_entity_1.TagType();
                        tagType3.name = 'Topics';
                        tagType3.slug = 'topic';
                        repo3 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo3.save(tagType3)];
                    case 3:
                        _a.sent();
                        tagType4 = new tag_type_entity_1.TagType();
                        tagType4.name = 'People';
                        tagType4.slug = 'people';
                        repo4 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo4.save(tagType4)];
                    case 4:
                        _a.sent();
                        tagType5 = new tag_type_entity_1.TagType();
                        tagType5.name = 'Organization';
                        tagType5.slug = 'organization';
                        repo5 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo5.save(tagType5)];
                    case 5:
                        _a.sent();
                        tagType6 = new tag_type_entity_1.TagType();
                        tagType6.name = 'Business';
                        tagType6.slug = 'business';
                        repo6 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo6.save(tagType6)];
                    case 6:
                        _a.sent();
                        tagType7 = new tag_type_entity_1.TagType();
                        tagType7.name = 'Place';
                        tagType7.slug = 'place';
                        repo7 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo7.save(tagType7)];
                    case 7:
                        _a.sent();
                        tagType8 = new tag_type_entity_1.TagType();
                        tagType8.name = 'Location';
                        tagType8.slug = 'location';
                        repo8 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo8.save(tagType8)];
                    case 8:
                        _a.sent();
                        tagType9 = new tag_type_entity_1.TagType();
                        tagType9.name = 'Event';
                        tagType9.slug = 'event';
                        repo9 = connection.getRepository(tag_type_entity_1.TagType);
                        return [4 /*yield*/, repo9.save(tagType9)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CreateUsers;
}());
exports["default"] = CreateUsers;
