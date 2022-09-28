import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import Cart from './components/cart/Cart';
import ShippingInfo from './components/cart/ShippingInfo';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/payment/Payment';
import ListOrders from './components/order/ListOrders';
import Profile from './components/user/Profile/Profile';
import OrderDetails from './components/order/OrderDetails'
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword/ForgotPassword';
import NewPassword from './components/user/NewPassword/NewPassword';

import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewsList from './components/admin/ReviewsList';
import OrderSuccess from './components/layout/Element/OrderSuccess';
import './App.css';
import { loadUser } from './store/actions/userActions';
import store from './store'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

const App = () => {
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(() => {
    store.dispatch(loadUser())

    const getStripeApiKey = async () => {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  }, [])
  console.log(stripeApiKey)
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetails} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/profile" component={Profile} exact />
        <ProtectedRoute path="/profile/update" component={UpdateProfile} exact />
        <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
        <ProtectedRoute path="/shipping" component={ShippingInfo} />
        <ProtectedRoute path="/confirm" component={ConfirmOrder} />
        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} exact />

        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ReviewsList} exact />

        {stripeApiKey &&
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
          </Elements>
        }
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
