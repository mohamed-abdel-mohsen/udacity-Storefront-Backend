import { Products,StoreProducts } from "../product_model";

const product = new StoreProducts();

describe("Store Products Model" , () => {
    it('Should have an index Method', () => {
        expect(product.index).toBeDefined();
    });
    it('Should have an Show Method', () => {
        expect(product.show).toBeDefined();
    });
    it('Should have an Create Method', () => {
        expect(product.create).toBeDefined();
    });

    it('index method should return a list of products', async ()=> {
        const result = await product.index();
        expect(result).toEqual( [] );
    })
})