import actionTypes from "../actions/actionTypes";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case actionTypes.CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state

    }
}
export const myOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case actionTypes.MY_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case actionTypes.MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case actionTypes.ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case actionTypes.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
// all order
export const ordersReducer = (state = { ordersAll: [] }, action) => {
    switch (action.type) {
        case actionTypes.ALL_ORDERS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case actionTypes.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                ordersAll: action.payload.orders,
                totalAmount: action.payload.totalAmount

            }
        case actionTypes.ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.DELETE_ORDER_REQUEST:
        case actionTypes.UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case actionTypes.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case actionTypes.DELETE_ORDER_FAIL:
        case actionTypes.UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.DELETE_ORDER_RESET:
            return {
                loading: false,
                isDeleted: false
            }
        case actionTypes.UPDATE_ORDER_RESET:
            return {
                loading: false,
                isUpdated: false
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}