import actionTypes from "../actions/actionTypes";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case actionTypes.ALL_PRODUCT_REQUEST:
        case actionTypes.ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case actionTypes.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.product,
                productsCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage,
                filterProductsCount: action.payload.filterProductsCount
            }
        case actionTypes.ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case actionTypes.ALL_PRODUCT_FAIL:
        case actionTypes.ADMIN_PRODUCTS_FAIL:
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
export const productDetailsReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case actionTypes.PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: null
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case actionTypes.NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case actionTypes.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            }
        case actionTypes.NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
export const productAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.DELETE_PRODUCT_REQUEST:
        case actionTypes.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case actionTypes.DELETE_PRODUCT_FAIL:
        case actionTypes.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case actionTypes.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case actionTypes.DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}