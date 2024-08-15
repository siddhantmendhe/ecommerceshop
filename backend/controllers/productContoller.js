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

export {getProduct, getProducts};



