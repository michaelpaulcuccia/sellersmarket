import express from 'express';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/Product.js';

//https://www.npmjs.com/package/express-async-handler 

//GET ALL PRODUCTS
//ROUTE: /api/products'
router.get('/', expressAsyncHandler(async (req, res) => {

    //empty object provides all
    const products = await Product.find({});

    res.json(products)
}));

//GET A PRODUCT BY ID
//ROUTE: /api/products/:id
router.get('/:id', expressAsyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ msg: 'Product Not Found' })
    }

}));

export default router;