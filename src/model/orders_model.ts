import modelQuery from "../helper/model_func";

export type Orders = {
    id?:number;
    product_id:number;
    user_id:number;
    order_status:string;
}



export class storeOrders {
// Show All Orders 
    async index():Promise<Orders[]> {
        try{
            const sql = 'SELECT * FROM orders ORDER BY id';
            const result =await modelQuery(sql);
            return result.rows;
        } catch(err){
            throw new Error(`Canno't Get  orders: ${err}`);
        }
    };

// Show specific Order
    async show(id:string):Promise<Orders> {
        try{
            const sql = `SELECT * FROM orders WHERE ${id}`;
            const result = await modelQuery(sql);
            return result.rows[0];
        } catch(err){
            throw new Error(`canno't Get this order: ${err}`);
        };
    };

// Add New Order
    async create(o:Orders):Promise<Orders>{
        try{
            const sql = 'INSERT INTO orders(product_id,user_id,order_status) VALUES($1,$2,$3) RETURNING *';
            const result = await modelQuery(sql, o.product_id,o.user_id,o.order_status);
            return result.rows[0];
        } catch(err){
            throw new Error(`Cant Add New Order: ${err}`);
        }
    }

    async addProducts (quantity:number , orderid:string , productid:string): Promise<Orders> {
        try{
            const sql= `INSERT INTO order_products(quantity,orderid,productid) VALUES($1,$2,$3) RETURNING *`;
            const result =  await modelQuery(sql ,quantity, orderid,productid);
            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not add new product ${productid} to order ${orderid} error: ${err}`);
        }
    }
} 