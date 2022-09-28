import React from 'react';
import MetaData from '../layout/Element/MetaData';
import { useSelector } from 'react-redux';
import CheckoutStep from './CheckoutStep';
import { Link } from 'react-router-dom';

const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    //Tinh toan gia hoa don
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const progressToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }
    return (
        <React.Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutStep shipping confirmOrder />
            <div className="container container-fluid">

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">

                        <h4 className="mb-3"><b>Thông tin giao hàng:</b></h4>
                        <p><b>Tên: </b>{user && user.name}</p>
                        <p><b>Số ĐT: </b>{shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Địa chỉ: </b>
                            {`${shippingInfo.address},${shippingInfo.city},
                        ${shippingInfo.postalCode},${shippingInfo.country}`}
                        </p>

                        <hr />
                        <h4 className="mt-4 mb-3"><b>Giỏ hàng của bạn:</b></h4>
                        {cartItems.map(item => (
                            <React.Fragment>
                                <div className="cart-item my-1" key={item.product}>
                                    <div className="row">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.product} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-6">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                            <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        ))}
                        <hr />
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4 style={{ textAlign: 'center' }}><b>Tóm tắt đơn hàng</b></h4>
                            <hr />
                            <p>Tổng sản phẩm:  <span className="order-summary-values">${itemsPrice}</span></p>
                            <p>Phí ship: <span className="order-summary-values">${shippingPrice}</span></p>
                            <p>Thuế:  <span className="order-summary-values">${taxPrice}</span></p>

                            <hr />

                            <p >Tổng cộng: <span className="order-summary-values">
                                <h5 style={{ color: 'crimson' }}><b>${totalPrice}</b></h5>
                            </span></p>

                            <hr />
                            <button
                                id="checkout_btn"
                                className="btn btn-primary btn-block"
                                onClick={progressToPayment}
                            ><b>Tiến hành thanh toán</b></button>
                        </div>
                    </div>


                </div>
            </div>
        </React.Fragment>
    );
}

export default ConfirmOrder;
