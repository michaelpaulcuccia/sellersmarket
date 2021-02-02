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

//GET ORDER BY ID
//ROUTE: /api/orders/:id
const getOrderById = expressAsyncHandler(async (req, res) => {

    //get name & email that is associated with order from user collection,  
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }

})

//Update order to paid
//ROUTE: /api/orders/:id/pay
const updateOrderToPaid = expressAsyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        //from PayPal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }

})

export { addOrderItems, getOrderById, updateOrderToPaid }