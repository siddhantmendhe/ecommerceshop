import express from 'express';
import { protect, admin} from '../middleware/authMiddlewar.js';
const router = express.Router();
import { createProduct, deleteProduct, editProduct, getProduct, getProducts } from '../controllers/productContoller.js';

router.route('/').get(getProduct).post(protect, admin,createProduct);

router.route('/:id').get(getProducts).put(protect,admin, editProduct).delete(protect,admin, deleteProduct);

export default router;