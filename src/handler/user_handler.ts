import express, { Application,NextFunction, Request, Response  } from 'express';
import { User,StoreUser } from '../model/user_model';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config();
const users = new StoreUser();

const index = async (req:Request , res:Response) => {
    try{
        const showUser = await users.index();
        res.status(200).json(showUser);
    } catch(err){
        res.status(400).json(err);
    }
};

const show = async (req:Request , res:Response) =>{
    try{
        const showUser = await users.show(req.params.id);
        res.status(200).json(showUser);
    }catch(err){
        res.status(400).json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const new_user:User = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        user_password:req.body.user_password,
        username: req.body.username
    };
    const secToken = process.env.TOKEN_SECRET!; 
    try {
        const new_Employee = await users.create(new_user);
        const token = jwt.sign({new_user:new_Employee},secToken);
        console.log(token);
        res.status(200).json(token);
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try{
        const checkUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.password_digits,
            username: req.body.username
        }
        const checkAuth = await users.authenticate(checkUser.username , checkUser.user_password);
        res.status(200).json(checkAuth)
    } catch(err){
        res.status(400).json(err)
    }
}

const verifyAuthrization = (req: Request, res: Response, next:NextFunction) => {
    const secToken = process.env.TOKEN_SECRET!; 
    try {
        const authorizationHeader = req.headers.authorization !;
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, secToken);
        next();
    } catch (error) {
        res.status(401).end("Authorization undefined")
    }
}




const store_userss_routes = (app: express.Application) => {
    app.get('/users' ,verifyAuthrization, index);
    app.get('/users/:id',verifyAuthrization, show);
    app.post('/users' ,create);
    app.post('/users/authenticate' , authenticate);
}; 

export default store_userss_routes;
