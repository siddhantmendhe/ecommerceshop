import express from 'express';
import { addOrderItems,
    getMyOrders,
    getOrderByID,
    UpdateOderToPaid,
    UpdateOderToDelivered,
    getAllOrders } from '../controllers/orderController.js';
import { protect, admin} from '../middleware/authMiddlewar.js';



const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect,admin, getAllOrders);
router.get('/mine',protect,getMyOrders)
router.route('/:id').get(protect, getOrderByID);
router.put('/:id/pay',protect,UpdateOderToPaid);
router.put('/:id/deliver',protect, admin,UpdateOderToDelivered);


export default router;

