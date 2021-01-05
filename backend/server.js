import express from 'express';
import dotenv from 'dotenv';
import products from '../backend/data/products.js';

//initialize dotenv
dotenv.config()

//initialize express
const app = express();

//TEST
app.get('/', (req, res) => {
    res.send('Hello!')
});

//GET ALL PRODUCTS
app.get('/api/products', (req, res) => {
    res.json(products)
});

//GET A PRODUCT BY ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`App listening in ${process.env.NODE_ENV} mode on port ${PORT}`) });