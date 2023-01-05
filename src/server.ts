import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import store_products_routes from './handler/product_handler';
import store_userss_routes from './handler/user_handler';
import dashboardRoutes from './Services/handler/dash_handler';
import store_orders_routes from './handler/orders_handler';


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

//Making the server to read JSON
app.use(bodyParser.json())

// End-Point
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

store_products_routes(app);
store_userss_routes(app);
dashboardRoutes(app);
store_orders_routes(app)



//Listen to the server
app.listen(3000,  () => console.log(`starting app on: ${address}`))
