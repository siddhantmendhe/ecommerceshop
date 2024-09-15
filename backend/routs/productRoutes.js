import express from 'express';
import { protect, admin} from '../middleware/authMiddlewar.js';
import checkObjectId from '../middleware/checkObjectId.js';
const router = express.Router();
import { createProduct,  createProductReview,  deleteProduct, editProduct, getProduct, getProducts, getTopProducts } from '../controllers/productContoller.js';

router.route('/').get(getProduct).post(protect, admin,createProduct);
router.route('/top').get(getTopProducts)

router.route('/:id').get(checkObjectId,getProducts).put(protect,admin,checkObjectId, editProduct).delete(protect,admin,checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect,checkObjectId,createProductReview);
export default router;