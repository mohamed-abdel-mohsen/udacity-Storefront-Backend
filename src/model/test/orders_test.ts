import { Orders,storeOrders } from "../orders_model";
const order = new storeOrders();

describe("Store orders Model" , () => {
    it('Should have an index Method', () => {
        expect(order.index).toBeDefined();
    });
    it('Should have an Show Method', () => {
        expect(order.show).toBeDefined();
    });
    it('Should have an Create Method', () => {
        expect(order.create).toBeDefined();
    });

    it('index method should return a list of orders', async ()=> {
        const result = await order.index();
        expect(result).toEqual( [] );
    })
})