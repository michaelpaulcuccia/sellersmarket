import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'

//CREATE NEW ORDER
//ROUTE: /api/orders
router.route('/').post(protect, addOrderItems);

export default router;