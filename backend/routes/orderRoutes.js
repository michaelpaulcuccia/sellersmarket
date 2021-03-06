import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'

//CREATE NEW ORDER
//ROUTE: /api/orders
router.route('/').post(protect, addOrderItems);

//GET Logged In User Orders
//ROUTE: /api/orders/myorders
///*** MUST BE ABOVE OTHER ROUTES TO AVOID ERROR ***
router.route('/myorders').get(protect, getMyOrders);

//GET ORDER BY ID
//ROUTE: /api/orders/:id
router.route('/:id').get(protect, getOrderById);

//Update order to paid
//ROUTE: /api/orders/:id/pay
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;