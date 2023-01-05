import express, { application,NextFunction ,Request, Response } from "express";
import { Orders,storeOrders } from "../model/orders_model";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const store_order = new storeOrders();

const index = async (req:Request , res:Response) => {
    try{
        const orderList = await store_order.index();
        res.status(200).json(orderList);
    } catch(err) {
        res.status(400).json(err);
    }
};

const show = async(req:Request , res:Response) => {
    try{
        const specificOrder = await store_order.show(req.params.id);
        res.status(200).json(specificOrder);
    } catch(err) {
        res.status(400).json(err);
    }
};

const create = async(req:Request , res:Response) => {
    const product:Orders = {
        product_id: req.body.product_id,
        user_id: req.body.theuser_id,
        order_status: req.body.order_status
    }
    try{
        const addOrders = await store_order.create(product);
        res.status(200).json(addOrders);
    } catch(err){
        res.status(400).json(err);
    }
}

const addProduct = async (req:Request , res:Response) => {
    const orderid:string = req.params.id;
    const productid:string = req.body.productid;
    const quantity:number = req.body.quantity;

    try{
        const addedProduct = await store_order.addProducts(quantity,orderid,productid,)
        res.status(200).json(addedProduct);
    }
    catch(err){
        res.status(400).json(err);
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


const store_orders_routes = (app: express.Application) => {
    app.get('/orders',verifyAuthrization ,index);
    app.get('/orders/:id',verifyAuthrization ,show);
    app.post('/orders' ,verifyAuthrization ,create);
    app.post('/orders/:id/products',verifyAuthrization , addProduct)
}

export default store_orders_routes;