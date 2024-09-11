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
// @route PUT/api/products/:id/
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
// @desc delete product
// @route DELETE/api/products/:id/
// @access Private/Admin
const deleteProduct= asyncHandler(async (req, res) => {
  const product= await Product.findById(req.params.id);
  
if(product){
  await product.deleteOne({_id:product._id});
  res.json({message:'product deleted'});

}else{
  res.status(404)
  throw new Error("product not found");
}

  

})
// @desc create a new product review
// @route POST/api/products/:id/reviews
// @access Private

const createProductReview= asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
    

})
export {getProduct, getProducts, createProduct, editProduct, deleteProduct, createProductReview};



