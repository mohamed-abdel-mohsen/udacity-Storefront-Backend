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
exports.storeOrders = void 0;
const model_func_1 = __importDefault(require("../helper/model_func"));
class storeOrders {
    // Show All Orders 
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders ORDER BY id';
                const result = yield (0, model_func_1.default)(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Canno't Get  orders: ${err}`);
            }
        });
    }
    ;
    // Show specific Order
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE ${id}`;
                const result = yield (0, model_func_1.default)(sql);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`canno't Get this order: ${err}`);
            }
            ;
        });
    }
    ;
    // Add New Order
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders(product_id,user_id,order_status) VALUES($1,$2,$3) RETURNING *';
                const result = yield (0, model_func_1.default)(sql, o.product_id, o.user_id, o.order_status);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cant Add New Order: ${err}`);
            }
        });
    }
    addProducts(quantity, orderid, productid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO order_products(quantity,orderid,productid) VALUES($1,$2,$3) RETURNING *`;
                const result = yield (0, model_func_1.default)(sql, quantity, orderid, productid);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add new product ${productid} to order ${orderid} error: ${err}`);
            }
        });
    }
}
exports.storeOrders = storeOrders;
