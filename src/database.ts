import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();
const {
    PG_HOST ,
    PG_DATABASE,
    PG_USERNAME,
    PG_PASSWORD,
    PG_TEST_DATABASE,
    ENV,
} = process.env

let client 

if(ENV === 'test') {
     client = new Pool({
        host:PG_HOST ,
        database:PG_TEST_DATABASE,
        user:PG_USERNAME,
        password:PG_PASSWORD,
    });
    
}

if(ENV === 'dev') {
    client = new Pool({
        host:PG_HOST ,
        database:PG_DATABASE,
        user:PG_USERNAME,
        password:PG_PASSWORD,
    });
}




export default client;