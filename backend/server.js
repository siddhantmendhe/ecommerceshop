import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routs/productRoutes.js'
import userRoutes from './routs/userRoutes.js'
import orderRoutes from './routs/orderRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser'
dotenv.config();

const port = process.env.PORT || 5000;
connectDB();
const app= express();


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send('API is runnig...');
});
app.use('/api/products', productRoutes);

app.use('/api/users',userRoutes);

app.use('/api/orders',orderRoutes)

app.use(errorHandler);


app.listen(port, ()=>{console.log(`Server running on port ${port}`)});

