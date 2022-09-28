import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productAdminReducer,
    deleteReviewReducer
} from './store/reducers/productReducers';
import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    usersReducer,
    userAdminReducer,
    userDetailsReducer
} from './store/reducers/userReducers';
import { cartReducer } from './store/reducers/cartReducers';
import {
    newOrderReducer,
    myOrderReducer,
    orderDetailsReducer,
    ordersReducer,
    orderReducer
} from './store/reducers/orderReducers'

const reducer = combineReducers({
    products: productReducer,
    productAdmin: productAdminReducer,
    productDetails: productDetailsReducer,
    deleteReview: deleteReviewReducer,
    auth: authReducer,
    user: userReducer,
    usersAll: usersReducer,
    userAdmin: userAdminReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    orders: ordersReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : []
    }
}


const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;