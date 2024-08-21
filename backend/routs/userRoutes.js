import express from 'express';
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js';
import { protect, admin} from '../middleware/authMiddlewar.js';



const router = express.Router();

router.route('/').post(registerUser).get(protect, admin,getUsers);

router.route('/login').post(authUser);
router.post('/logout',logoutUser);

router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile);

router.route('/:id').get(protect, admin,getUserById).delete(protect,admin, deleteUser).put(protect, admin, updateUser);



export default router;