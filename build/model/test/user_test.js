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
const user_model_1 = require("../user_model");
const user = new user_model_1.StoreUser();
describe("Store users Model", () => {
    it('Should have an index Method', () => {
        expect(user.index).toBeDefined();
    });
    it('Should have an Show Method', () => {
        expect(user.show).toBeDefined();
    });
    it('Should have an Create Method', () => {
        expect(user.create).toBeDefined();
    });
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        expect(result).toEqual([]);
    }));
});
