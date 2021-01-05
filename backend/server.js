const express = require('express');
const products = require('../backend/data/products');

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

app.listen(5000, () => { console.log('App is running') });