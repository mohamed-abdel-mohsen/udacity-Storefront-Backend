"use strict";
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
});
