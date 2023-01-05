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
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../product_model");
const product = new product_model_1.StoreProducts();
describe("Store Products Model", () => {
    it('Should have an index Method', () => {
        expect(product.index).toBeDefined();
    });
    it('Should have an Show Method', () => {
        expect(product.show).toBeDefined();
    });
    it('Should have an Create Method', () => {
        expect(product.create).toBeDefined();
    });
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.index();
        expect(result).toEqual([]);
    }));
});
