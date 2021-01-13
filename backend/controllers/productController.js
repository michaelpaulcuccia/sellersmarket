import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

//GET ALL PRODUCTS
//ROUTE: /api/products'
const getProducts = expressAsyncHandler(async (req, res) => {

    //empty object provides all
    const products = await Product.find({});

    //ERROR CHECK 
    /*
    res.status(401);
    throw new Error('You got an error!');
    */

    res.json(products);

})

//GET A PRODUCT BY ID
//ROUTE: /api/products/:id
const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    //ensure that product exists
    if (product) {

        //ERROR CHECK 
        /*
        res.status(401);
        throw new Error('You got an error!');
        */

        res.json(product);

    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }

})

export { getProducts, getProductById }