import express from 'express';
// .js is important because we are using ES module in backend
import products from './data/product.js';
const port = 5000;
const app= express();

app.get('/', (req, res)=>{
    res.send('API is runnig...');
});

app.get('/api/products', (req, res)=>{
    res.json(products);
});

app.get('/api/products/:id', (req, res)=>{
    const product=products.find((p)=>p._id===req.params.id);
    res.json(product);
});

app.listen(port, ()=>{console.log(`Server running on port ${port}`)});

