import actionTypes from "./actionTypes";
import axios from "axios";

// new order action
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/order/new', order, config);
        dispatch({
            type: actionTypes.CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_ORDER_FAIL,
            payload: error.response.data.msg
        })
    }
}
// my order action
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.MY_ORDERS_REQUEST })

        const { data } = await axios.get(`/api/v1/orders/me`);

        dispatch({
            type: actionTypes.MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: actionTypes.MY_ORDERS_FAIL,
            payload: error.response.data.msg
        })
    }
}
//order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: actionTypes.ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ORDER_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}
//get orders admin
export const getOrders = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.ALL_ORDERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/orders')
        dispatch({
            type: actionTypes.ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ALL_ORDERS_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//delete order admin
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch({
            type: actionTypes.DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_ORDER_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//delete order admin
export const processOrder = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST })

        const config = {

            'Content-Type': 'application/json',
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, status, config)
        dispatch({
            type: actionTypes.UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_ORDER_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERRORS })
}