import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        });

        //getState contains token in userInfo (within userInfo)
        const { userLogin: { userInfo } } = getState();

        //set headers, add token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        //make API request
        const { data } = await axios.post('/api/orders', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        //getState contains token in userInfo (within userInfo)
        const { userLogin: { userInfo } } = getState();

        //GET doesn't need Content-Type in Headers, but still needs token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        //make API request
        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

    }
}