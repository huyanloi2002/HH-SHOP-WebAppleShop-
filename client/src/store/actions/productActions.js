import axios from 'axios';

import actionTypes from './actionTypes';
//Get all products
export const getProducts = (keyword = '', currentPage = 1, price, category, rating) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.ALL_PRODUCT_REQUEST })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price
        [1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price
            [1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)
        dispatch({
            type: actionTypes.ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ALL_PRODUCT_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//Get details product
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERRORS })
}
//New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)
        dispatch({
            type: actionTypes.NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_REVIEW_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//New Product
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/v1/admin/new/product', productData, config)
        dispatch({
            type: actionTypes.NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_PRODUCT_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//Get admin products
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/products`)
        dispatch({
            type: actionTypes.ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//Delete review
export const deleteReview = (productId, id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/review?productId=${productId}&id=${id}`)
        dispatch({
            type: actionTypes.DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_REVIEW_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//Delete admin products
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch({
            type: actionTypes.DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_PRODUCT_FAIL,
            payload: error.response.data.msg,
        })
    }
}
//Update admin products
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)
        dispatch({
            type: actionTypes.UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PRODUCT_FAIL,
            payload: error.response.data.msg,
        })
    }
}
