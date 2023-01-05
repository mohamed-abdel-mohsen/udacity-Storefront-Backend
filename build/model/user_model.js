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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreUser = void 0;
const model_func_1 = __importDefault(require("../helper/model_func"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class StoreUser {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users ORDER BY id';
                const result = yield (0, model_func_1.default)(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cant Show The Users : ${err}`);
            }
        });
    }
    ;
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE ${id}`;
                const result = yield (0, model_func_1.default)(sql);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`user not found some error ocurrs: ${err}`);
            }
            ;
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users (first_name,last_name,user_password,username) VALUES($1, $2 ,$3,$4) RETURNING *`;
                const hash = bcrypt_1.default.hashSync(u.user_password + pepper, parseInt(saltRounds));
                const result = yield (0, model_func_1.default)(sql, u.first_name, u.last_name, hash, u.username);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can't add new user : ${err}`);
            }
            ;
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT password_digits FROM users WHERE username = ($1)';
            const result = yield (0, model_func_1.default)(sql, username);
            if (result.rows.length) {
                const user = result.rows[0];
                const pass = bcrypt_1.default.compareSync(password + pepper, user.password_digits);
                if (pass) {
                    return user;
                }
            }
            ;
            return null;
        });
    }
}
exports.StoreUser = StoreUser;
