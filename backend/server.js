import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routs/productRoutes.js'
import userRoutes from './routs/userRoutes.js'
import uploadRoutes from './routs/uploadRoutes.js'
import orderRoutes from './routs/orderRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser'


const port = process.env.PORT || 5000;
connectDB();
const app= express();


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use('/api/products', productRoutes);

app.use('/api/users',userRoutes);

app.use('/api/orders',orderRoutes);

app.use('/api/uploads',uploadRoutes);

//PayPal setup
app.get('/api/config/paypal',(req,res)=>res.send({clientID:process.env.PAYPAL_CLIENT_ID}));

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
if(process.env.NODE_ENV==='production'){
    //static folder
    app.use(express.static(path.join(__dirname,'/frontend/build')));

// any route
    app.get('*',(req, res)=>{
        app.sendFile(express.static(path.join(__dirname,'frontend', 'build', 'index.html')))
    }
    )}
    else{
        app.get('/', (req, res)=>{
            res.send('API is runnig...');
        });
    }
 
app.use(errorHandler);


app.listen(port, ()=>{console.log(`Server running on port ${port}`)});
