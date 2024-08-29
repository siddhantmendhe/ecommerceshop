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
router.get('/mine',getMyOrders)
router.route('/:ID').get(protect,getOrderByID);
router.put('/:ID/pay',protect,UpdateOderToPaid);
router.put('/:ID/deliver',protect, admin,UpdateOderToDelivered);


export default router;

