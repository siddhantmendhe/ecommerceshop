import express from 'express';
const router = express.Router();
import { getProduct, getProducts } from '../controllers/productContoller.js';

router.route('/').get(getProduct);

router.route('/:id').get(getProducts);

export default router;