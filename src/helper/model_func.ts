//@ts-ignore
import client from "../database" ;


const modelQuery = async (sql:string , ...val:(string|number)[] ) => {
//@ts-ignore
    const conn = await client.connect();
    const res = await conn.query(sql,val)
    conn.release();
    return res;
}

  export default modelQuery;