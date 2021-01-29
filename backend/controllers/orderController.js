import expressAsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

//CREATE NEW ORDER
//ROUTE: /api/orders
const addOrderItems = expressAsyncHandler(async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
    } else {
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            //get token from user._id
            user: req.user._id
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }

})

export { addOrderItems }