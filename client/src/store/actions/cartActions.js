import axios from 'axios';

import actionTypes from './actionTypes';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            sold: data.product.sold,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: actionTypes.REMOVE_ITEM_CART,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeAllFromCart = () => async (dispatch, getState) => {

    dispatch({
        type: actionTypes.REMOVE_ALL_CART,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const saveShippingInfo = (data) => async (dispatch, getState) => {

    dispatch({
        type: actionTypes.SAVE_SHIPPING_INFO,
        payload: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
}