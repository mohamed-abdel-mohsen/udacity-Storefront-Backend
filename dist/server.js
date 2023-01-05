"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var product_handler_1 = __importDefault(require("./handler/product_handler"));
var user_handler_1 = __importDefault(require("./handler/user_handler"));
var dash_handler_1 = __importDefault(require("./Services/handler/dash_handler"));
var orders_handler_1 = __importDefault(require("./handler/orders_handler"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
//Making the server to read JSON
app.use(body_parser_1["default"].json());
// End-Point
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, product_handler_1["default"])(app);
(0, user_handler_1["default"])(app);
(0, dash_handler_1["default"])(app);
(0, orders_handler_1["default"])(app);
//Listen to the server
app.listen(3000, function () { return console.log("starting app on: ".concat(address)); });
