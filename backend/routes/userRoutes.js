import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userController.js';

//Authenticate User, Get Token
//ROUTE: /api/users/login'
router.post('/login', authUser);

export default router;