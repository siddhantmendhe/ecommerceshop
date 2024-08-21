import express from 'express';
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js';
import { protect, admin} from '../middleware/authMiddlewar.js';



const router = express.Router();

router.route('/').post(registerUser).get(getUsers);

router.route('/login').post(authUser);
router.post('/logout',logoutUser);

router.route('/profile').get(getUserProfile).put( updateUserProfile);

router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);



export default router;