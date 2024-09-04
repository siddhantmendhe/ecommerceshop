import express from 'express';
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET/api/products
// @access Public
const getProduct= asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);});

// @desc Fetch single product by ID
// @route GET/api/products/:ID
// @access Public
const getProducts= asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    res.status(404).json({ message: 'Product not found' });
  })

// @desc create new product
// @route POST/api/products/
// @access Private/Admin
const createProduct= asyncHandler(async (req, res) => {
  const product= new Product({user:req.user._id,name:"sample name", image:"sample.jpg", price:0, brand:"sample", description:"sample description", rating:0, numReviews:0, countInStock:0});
  const newProduct=await product.save()
  res.status(200).json(newProduct);

})

// @desc edit a product
// @route PUT/api/products/:id/edit
// @access Private/Admin
const editProduct= asyncHandler(async (req, res) => {
  const product= await Product.findById(req.params.id);
  const data=req.body;
if(product){
  product.name=data.name||product.name;
  product.image=data.image||product.image;
  product.price=data.price|| product.price;
  product.brand=data.brand||product.brand;
  product.description=data.description||product.description;
  product.countInStock=data.countInStock||product.countInStock;

  const updatedProduct= await product.save();
  res.status(200).json(updatedProduct);
}else{
  res.status(404)
  throw new Error("product not found");
}

  

})
export {getProduct, getProducts, createProduct, editProduct};



