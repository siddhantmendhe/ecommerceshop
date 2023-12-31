import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routs/productRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();

const port = process.env.PORT || 5000;
connectDB();
const app= express();

app.get('/', (req, res)=>{
    res.send('API is runnig...');
});
app.use('/api/products',productRoutes)

app.use(errorHandler);


app.listen(port, ()=>{console.log(`Server running on port ${port}`)});

