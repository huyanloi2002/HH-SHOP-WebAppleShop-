import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/Element/MetaData';
// import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemsFromCart } from '../../store/actions/cartActions';

const Cart = ({ history }) => {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const { cartItems } = useSelector(state => state.cart)

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1

        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }
    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1

        if (newQty < 1) return;

        dispatch(addItemToCart(id, newQty))
    }
    const removeCartItemHandler = (id) => {
        dispatch(removeItemsFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <React.Fragment>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ?
                <div className="container container-fluid emty-cart">
                    <h2 className="mt-5"
                        style={{ fontWeight: 'bold' }}
                    >Giỏ hàng của bạn hiện đang trống</h2>
                    <Link to="/" className="back-shop">Quay lại cửa hàng</Link>
                </div> :
                <React.Fragment>
                    <div className="container container-fluid">
                        <h2 className="mt-5">Giỏ hàng: <b style={{ color: 'green' }}>{cartItems.length} sản phẩm</b></h2>

                        <div className="row d-flex justify-content-around ">
                            <div className="col-12 col-lg-8 all-cart-item">
                                {cartItems.map(item => (
                                    <React.Fragment>
                                        <hr />
                                        <div className="cart-item" key={item.product}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt={item.product} height="90" width="115" />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span
                                                            className="btn btn-danger minus"
                                                            onClick={() => decreaseQty(item.product, item.quantity)}
                                                        >-</span>
                                                        <input type="number"
                                                            className="form-control count d-inline"
                                                            value={item.quantity} readOnly />

                                                        <span className="btn btn-primary plus"
                                                            onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                                                        >+</span>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item"
                                                        className="fa fa-trash btn btn-danger"
                                                        onClick={() => removeCartItemHandler(item.product)}
                                                    ></i>
                                                </div>

                                            </div>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}>Đơn hàng thanh toán</h5>
                                    <hr />
                                    <p>Số lượng:  <span className="order-summary-values">
                                        {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}(sp)
                                    </span></p>
                                    <p>Tổng tiền: <h5 className="order-summary-values"
                                        style={{ color: 'crimson' }}>$
                                        {cartItems.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0).toFixed(2)}
                                    </h5></p>

                                    <hr />
                                    <button
                                        id="checkout_btn"
                                        className="btn btn-primary btn-block"
                                        onClick={checkoutHandler}
                                    >Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default Cart;
