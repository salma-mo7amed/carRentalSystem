// import modules:
import express from 'express';
import { connectDB } from './db/connection.js';
import customerRouter from './src/modules/customer/customer.router.js';
import carRouter from './src/modules/car/car.router.js';
import rentalRouter from './src/modules/rental/rental.router.js';
// create server:
const app = express();
const port = 3000;
// connect to db:
connectDB()
// app usage:
app.use(express.json());
app.use("/customers", customerRouter);
app.use("/rental", rentalRouter);
app.use("/cars", carRouter );

// listen to server:
app.listen(port, ()=>{
    console.log('server is running on port', port);
})