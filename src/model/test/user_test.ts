import { User,StoreUser } from "../user_model";

const user = new StoreUser();

describe("Store users Model" , () => {
    it('Should have an index Method', () => {
        expect(user.index).toBeDefined();
    });
    it('Should have an Show Method', () => {
        expect(user.show).toBeDefined();
    });
    it('Should have an Create Method', () => {
        expect(user.create).toBeDefined();
    });

    it('index method should return a list of users', async ()=> {
        const result = await user.index();
        expect(result).toEqual( [] );
    })
})