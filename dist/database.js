"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, PG_HOST = _a.PG_HOST, PG_DATABASE = _a.PG_DATABASE, PG_USERNAME = _a.PG_USERNAME, PG_PASSWORD = _a.PG_PASSWORD, PG_TEST_DATABASE = _a.PG_TEST_DATABASE, ENV = _a.ENV;
var client;
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: PG_HOST,
        database: PG_TEST_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: PG_HOST,
        database: PG_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD
    });
}
exports["default"] = client;
