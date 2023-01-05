import modelQuery from "../helper/model_func";

export type Products ={
    id?:number;
    product_name:string;
    product_price:number;
}

export class StoreProducts {
// Show All Products 
    async index():Promise<Products[]> {
        try{
            const sql = 'SELECT * FROM product ORDER BY id';
            const result =await modelQuery(sql);
            return result.rows;
        } catch(err){
            throw new Error(`Canno't Get  Product: ${err}`);
        }
    };
// Show Product
    async show(id:string):Promise<Products> {
        try{
            const sql = `SELECT * FROM product WHERE ${id}`;
            const result = await modelQuery(sql);
            return result.rows[0];
        } catch(err){
            throw new Error(`canno't Get this product: ${err}`);
        };
    };
// Add New Product
    async create(p:Products):Promise<Products>{
        try{
            const sql = 'INSERT INTO product(product_name,product_price) VALUES($1,$2) RETURNING *';
            const result = await modelQuery(sql, p.product_name,p.product_price);
            return result.rows[0];
        } catch(err){
            throw new Error(`Cant Add New Product: ${err}`);
        }
    }
};