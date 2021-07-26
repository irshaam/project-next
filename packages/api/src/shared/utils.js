"use strict";
exports.__esModule = true;
exports.nanoid = void 0;
var nanoid_dictionary_1 = require("nanoid-dictionary");
var async_1 = require("nanoid/async");
exports.nanoid = async_1.customAlphabet(nanoid_dictionary_1.alphanumeric, 9);
