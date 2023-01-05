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
exports.StoreProducts = void 0;
const model_func_1 = __importDefault(require("../helper/model_func"));
class StoreProducts {
    // Show All Products 
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM product ORDER BY id';
                const result = yield (0, model_func_1.default)(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Canno't Get  Product: ${err}`);
            }
        });
    }
    ;
    // Show Product
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM product WHERE ${id}`;
                const result = yield (0, model_func_1.default)(sql);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`canno't Get this product: ${err}`);
            }
            ;
        });
    }
    ;
    // Add New Product
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO product(product_name,product_price) VALUES($1,$2) RETURNING *';
                const result = yield (0, model_func_1.default)(sql, p.product_name, p.product_price);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cant Add New Product: ${err}`);
            }
        });
    }
}
exports.StoreProducts = StoreProducts;
;
