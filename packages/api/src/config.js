"use strict";
exports.__esModule = true;
exports.aws_secret = exports.aws_key = exports.categoryId = exports.password = exports.username = exports.database = exports.port = exports.host = void 0;
var dotenv = require("dotenv");
var envalid_1 = require("envalid");
// load .env
dotenv.config();
// sanitize env variables
var env = envalid_1.cleanEnv(process.env, {
    DB_HOST: envalid_1.str({ "default": 'localhost' }),
    DB_PORT: envalid_1.num(),
    DB_DATABASE: envalid_1.str({ "default": 'project_next' }),
    DB_USERNAME: envalid_1.str({ "default": 'project_next' }),
    DB_PASSWORD: envalid_1.str({ "default": 'project_next' }),
    CATEGORY_ID: envalid_1.num({ "default": 1 }),
    AWS_KEY: envalid_1.str(),
    AWS_SECRET: envalid_1.str()
});
// export
exports.host = env.DB_HOST, exports.port = env.DB_PORT, exports.database = env.DB_DATABASE, exports.username = env.DB_USERNAME, exports.password = env.DB_PASSWORD, exports.categoryId = env.CATEGORY_ID, exports.aws_key = env.AWS_KEY, exports.aws_secret = env.AWS_SECRET;
