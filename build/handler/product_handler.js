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
const product_model_1 = require("../model/product_model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store_products = new product_model_1.StoreProducts();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsList = yield store_products.index();
        res.status(200).json(productsList);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specificProduct = yield store_products.show(req.params.id);
        res.status(200).json(specificProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
    };
    try {
        const addProduct = yield store_products.create(product);
        res.status(200).json(addProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
    ;
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
const store_products_routes = (app) => {
    app.get('/products', verifyAuthrization, index);
    app.get('/products/:id', verifyAuthrization, show);
    app.post('/products', verifyAuthrization, create);
};
exports.default = store_products_routes;
