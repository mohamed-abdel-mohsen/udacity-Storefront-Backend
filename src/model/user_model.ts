import modelQuery from "../helper/model_func";
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds:string = process.env.SALT_ROUNDS !;

export type User = {
    id?:number;
    first_name:string;
    last_name:string;
    user_password:string;
    username:string;
}


export class StoreUser {
    async index():Promise<User[]>{
        try{
            const sql = 'SELECT * FROM users ORDER BY id';
            const result = await modelQuery(sql);
            return result.rows;
        } catch(err) {
            throw new Error (`Cant Show The Users : ${err}`);
        }
    };

    async show(id:string):Promise<User>{
        try{
            const sql = `SELECT * FROM users WHERE ${id}`;
            const result = await modelQuery(sql);
            return result.rows[0];
        } catch(err){
            throw new Error(`user not found some error ocurrs: ${err}`);
        };
    }

    async create(u:User):Promise<User>{
        try{
            const sql =`INSERT INTO users (first_name,last_name,user_password,username) VALUES($1, $2 ,$3,$4) RETURNING *`;
            const hash = bcrypt.hashSync(u.user_password + pepper, parseInt(saltRounds));
            const result = await modelQuery(sql , u.first_name,u.last_name,hash,u.username);
            console.log(result.rows[0]);
            return result.rows[0];
        } catch(err) {
            throw new Error(`can't add new user : ${err}`)
        };
    }

    async authenticate(username:string , password:string):Promise <User|null> {
    
        const sql = 'SELECT password_digits FROM users WHERE username = ($1)';
        const result = await modelQuery(sql,username);
        if(result.rows.length) {
          const user = result.rows[0];
          const pass = bcrypt.compareSync(password+pepper , user.password_digits);
            if(pass) {
              return user;
            }
        };
        return null
    }
}