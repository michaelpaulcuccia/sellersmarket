import express from 'express';
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js';

//GET ALL PRODUCTS
//ROUTE: /api/products'
router.route('/').get(getProducts)

//GET A PRODUCT BY ID
//ROUTE: /api/products/:id
router.route('/:id').get(getProductById);

export default router;