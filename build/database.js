"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { PG_HOST, PG_DATABASE, PG_USERNAME, PG_PASSWORD, PG_TEST_DATABASE, ENV, } = process.env;
let client;
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: PG_HOST,
        database: PG_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD,
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: PG_HOST,
        database: PG_TEST_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD,
    });
}
exports.default = client;
