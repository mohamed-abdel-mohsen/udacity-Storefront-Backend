import express, { application, NextFunction, Request, Response } from "express";
import { Products , StoreProducts } from "../model/product_model";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store_products = new StoreProducts();

const index = async (req:Request , res:Response) => {
    try{
        const productsList = await store_products.index();
        res.status(200).json(productsList);
    } catch(err){
        res.status(400).json(err);
    }
};

const show = async(req:Request , res:Response) => {
    try{
        const specificProduct = await store_products.show(req.params.id);
        res.status(200).json(specificProduct);
    }catch(err){
        res.status(400).json(err);
    }
};

const create = async(req:Request , res:Response) => {
    const product:Products = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
    }
    try{
        const addProduct = await store_products.create(product);
        res.status(200).json(addProduct);    
    }catch(err){
        res.status(400).json(err);
    };
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

const store_products_routes = (app: express.Application) => {
    app.get('/products' ,verifyAuthrization ,index);
    app.get('/products/:id',verifyAuthrization , show);
    app.post('/products',verifyAuthrization, create);
}



export default store_products_routes;