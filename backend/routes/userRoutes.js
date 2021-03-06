import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'

//Authenticate User, Get Token
//ROUTE: /api/users/login'
router.post('/login', authUser);

//Register a new user
//ROUTE: /api/users
router.route('/').post(registerUser);

//Get User Profile
//ROUTE: /api/users/profile
//***PROTECTED***
router.route('/profile').get(protect, getUserProfile);

//Update User Profile
//ROUTE: /api/users/profile
//***PROTECTED***
router.route('/profile').put(protect, updateUserProfile);

export default router;