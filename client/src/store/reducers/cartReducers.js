import actionTypes from "../actions/actionTypes";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const isItemExists = state.cartItems.find(i => i.product === item.product)
            if (isItemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExists.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case actionTypes.REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
        case actionTypes.REMOVE_ALL_CART:
            return {
                ...state,
                cartItems: []
            }
        case actionTypes.SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        default:
            return state
    }
}