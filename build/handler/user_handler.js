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
const user_model_1 = require("../model/user_model");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const users = new user_model_1.StoreUser();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showUser = yield users.index();
        res.status(200).json(showUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showUser = yield users.show(req.params.id);
        res.status(200).json(showUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const new_user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_password: req.body.user_password,
        username: req.body.username
    };
    const secToken = process.env.TOKEN_SECRET;
    try {
        const new_Employee = yield users.create(new_user);
        const token = jsonwebtoken_1.default.sign({ new_user: new_Employee }, secToken);
        res.status(200).json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.password_digits,
            username: req.body.username
        };
        const checkAuth = yield users.authenticate(checkUser.username, checkUser.user_password);
        res.status(200).json(checkAuth);
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
const store_userss_routes = (app) => {
    app.get('/users', verifyAuthrization, index);
    app.get('/users/:id', verifyAuthrization, show);
    app.post('/users', create);
    app.post('/users/authenticate', authenticate);
};
exports.default = store_userss_routes;
