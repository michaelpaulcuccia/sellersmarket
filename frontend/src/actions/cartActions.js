import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import axios from 'axios';

/*
Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. 
The inner function receives the store methods dispatch and getState as parameters.
*/

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        //items to display in cart
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    //getState().cart.cartItems - returns a JSON Object, can only save strings in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    //getState() gets entire state object
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}