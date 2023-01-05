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
const orders_model_1 = require("../model/orders_model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store_order = new orders_model_1.storeOrders();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderList = yield store_order.index();
        res.status(200).json(orderList);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specificOrder = yield store_order.show(req.params.id);
        res.status(200).json(specificOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        product_id: req.body.product_id,
        user_id: req.body.theuser_id,
        order_status: req.body.order_status
    };
    try {
        const addOrders = yield store_order.create(product);
        res.status(200).json(addOrders);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderid = req.params.id;
    const productid = req.body.productid;
    const quantity = req.body.quantity;
    try {
        const addedProduct = yield store_order.addProducts(quantity, orderid, productid);
        res.status(200).json(addedProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const verifyAuthrization = (req, res, next) => {
    const secToken = process.env.TOKEN_SECRET;
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secToken);
        next();
    }
    catch (error) {
        res.status(401).end("Authorization undefined");
    }
};
const store_orders_routes = (app) => {
    app.get('/orders', verifyAuthrization, index);
    app.get('/orders/:id', verifyAuthrization, show);
    app.post('/orders', verifyAuthrization, create);
    app.post('/orders/:id/products', verifyAuthrization, addProduct);
};
exports.default = store_orders_routes;
