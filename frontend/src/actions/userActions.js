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
    USER_DETAILS_FAIL
} from '../constants/userConstants';
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
    dispatch({
        type: USER_LOGOUT
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