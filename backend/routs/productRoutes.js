import  express  from 'express';
const router=express.Router();
// .js is important because we are using ES module in backend
import products from '../data/products.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js'



router.get('/', asyncHandler(async (req, res)=>{
    const products =await Product.find({});
    res.json(products);
}));

router.get('/:id', 
    asyncHandler(async (req, res)=>{
    const product= await Product.findById(req.params.id);

    if(product){
        return res.json(product);

    }
    res.status(404);
    throw new Error('Resourse not found');
}));
export default router;