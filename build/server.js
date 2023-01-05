"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_handler_1 = __importDefault(require("./handler/product_handler"));
const user_handler_1 = __importDefault(require("./handler/user_handler"));
const dash_handler_1 = __importDefault(require("./Services/handler/dash_handler"));
const orders_handler_1 = __importDefault(require("./handler/orders_handler"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
//Making the server to read JSON
app.use(body_parser_1.default.json());
// End-Point
app.get('/', (req, res) => {
    res.send('Hello World!');
});
(0, product_handler_1.default)(app);
(0, user_handler_1.default)(app);
(0, dash_handler_1.default)(app);
(0, orders_handler_1.default)(app);
//Listen to the server
app.listen(3000, () => console.log(`starting app on: ${address}`));
