import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET
} from '../constants/userConstants';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import axios from 'axios';

export const login = (email,
    password) => async (dispatch) => {
        try {

            dispatch({
                type: USER_LOGIN_REQUEST
            })

            //set headers
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            //make API request
            const { data } = await axios.post('/api/users/login', { email, password }, config);

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            });

            //can only save strings in local storage
            localStorage.setItem('userInfo', JSON.stringify(data))

        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });

        }
    }

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('__paypal_storage__')

    dispatch({
        type: USER_LOGOUT
    })

    dispatch({
        type: USER_DETAILS_RESET
    })

    dispatch({
        type: ORDER_LIST_MY_RESET
    })

}

export const register = (name, email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        //set headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        //make API request
        const { data } = await axios.post('/api/users', { name, email, password }, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        //login user after registration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //can only save strings in local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    //profile passed as id arg from ProfileScreen

    try {

        dispatch({
            type: USER_DETAILS_REQUEST
        })

        //getState contains token in userInfo (within userInfo)
        const { userLogin: { userInfo } } = getState()

        //set headers, add token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        //make API request
        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    //entire updated user profile

    try {

        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        //getState contains token in userInfo (within userInfo)
        const { userLogin: { userInfo } } = getState()

        //set headers, add token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        //make API request
        const { data } = await axios.put('/api/users/profile', user, config);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        //navbar update...
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        //navbar update...
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

    }
}