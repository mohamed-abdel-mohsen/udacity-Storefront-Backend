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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dash_model_1 = require("../model/dash_model");
dotenv_1.default.config();
const dashboard = new dash_model_1.DashboardQueries();
const OrdersByUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.OrdersToUsers();
    res.json(products);
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
const dashboardRoutes = (app) => {
    app.get('/orders_to_users', verifyAuthrization, OrdersByUsers);
};
exports.default = dashboardRoutes;
