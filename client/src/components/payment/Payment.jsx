import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/Element/MetaData'
import CheckoutStep from '../cart/CheckoutStep'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../store/actions/orderActions'
import { removeAllFromCart } from '../../store/actions/cartActions'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [error, alert, dispatch])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),

    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;
        let res;

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;
            if (!stripe || !elements) {
                return;
            }
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });
            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))
                    history.push('/success')
                    dispatch(removeAllFromCart())

                }
                else {
                    alert.error('There is some issue while payment processing')
                }
            }
        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message);
        }
    }
    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutStep shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4" style={{ textAlign: 'center' }}><b>Thông tin thẻ</b></h1>
                        <div className="form-group mt-1">
                            <label htmlFor="card_num_field"><b>Mã thẻ: </b></label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group mt-1">
                            <label htmlFor="card_exp_field"><b>Hạn thẻ: </b></label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field"><b>Mã CVC: </b></label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            <b>Thanh toán {`- $${orderInfo && orderInfo.totalPrice}`}</b>
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
