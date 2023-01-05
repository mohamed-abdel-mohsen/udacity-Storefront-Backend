import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import { DashboardQueries } from '../model/dash_model';


dotenv.config();
const dashboard = new DashboardQueries()

const OrdersByUsers = async (_req: Request, res: Response) => {
  const products = await dashboard.OrdersToUsers()
  res.json(products)
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


const dashboardRoutes = (app: express.Application) => {
    app.get('/orders_to_users',verifyAuthrization ,OrdersByUsers)
}


export default dashboardRoutes;