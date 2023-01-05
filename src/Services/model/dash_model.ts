import client from "../../database"

export class DashboardQueries {
  // Get all Current Order by user 
  async OrdersToUsers(): Promise<{id:number,product_name:string, product_price:number}[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT orders.id,users.first_name,users.last_name,product.product_name,product.product_price FROM ((orders INNER JOIN product ON orders.product_id = product.id) INNER JOIN users ON orders.user_id = users.id)' ;
      const result = await conn.query(sql);
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }
}