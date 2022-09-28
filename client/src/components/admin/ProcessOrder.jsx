import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/Element/MetaData';
import Sidebar from '../admin/Sidebar';
import Loader from '../layout/Element/Loader';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, processOrder, clearErrors } from '../../store/actions/orderActions'
import actionTypes from '../../store/actions/actionTypes';


const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated, error: UpdateErrorr } = useSelector(state => state.order)

    const orderId = match.params.id;

    useEffect(() => {
        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (UpdateErrorr) {
            alert.error(UpdateErrorr);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            alert.success('Order updated successfully');
            dispatch({ type: actionTypes.UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId, UpdateErrorr])


    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(processOrder(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="container container-fluid">
                            {loading ? <Loader /> : (
                                <div className="row d-flex justify-content-around">
                                    <div className="col-12 col-lg-7 order-details">

                                        <h2 className="my-5"><b>Mã hoá đơn <span style={{ color: 'red' }}>#{order._id}</span></b></h2>

                                        <h4 className="mb-4"><b>Thông tin đặt hàng</b></h4>
                                        <p><b>Tên:</b> {user && user.name}</p>
                                        <p><b>Số ĐT:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                        <p className="mb-4"><b>Địa chỉ:</b>{shippingDetails}</p>
                                        <p><b>Tổng tiền:</b> ${totalPrice}</p>

                                        <hr />

                                        <h4 className="my-4"><b>Trạng thái thanh toán</b></h4>
                                        <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "ĐÃ TRẢ" : "CHƯA TRẢ"}</b></p>

                                        <h4 className="my-4"><b>Mã Stripe ID (mã thanh toán)</b></h4>
                                        <p><b>{paymentInfo && paymentInfo.id}</b></p>

                                        <h4 className="my-4"><b>Trạng thái đơn hàng:</b></h4>
                                        <p className={order.orderStatus && String(order.orderStatus).includes('Đã giao hàng') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>



                                        <h4 className="my-4"><b>Sản phẩm:</b></h4>

                                        <hr />
                                        <div className="cart-item my-1">
                                            {orderItems && orderItems.map(item => (
                                                <div key={item.product} className="row my-5">
                                                    <div className="col-4 col-lg-2">
                                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                                    </div>

                                                    <div className="col-5 col-lg-5">
                                                        <Link to={`/products/${item.product}`}><b>{item.name}</b></Link>
                                                    </div>


                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p style={{ color: 'crimson' }}><b>${item.price}</b></p>
                                                    </div>

                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <p><b>{item.quantity} sp</b></p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="col-12 col-lg-3 mt-5">
                                        <h4 className="my-4"><b>Xác nhận trạng thái (admin)</b></h4>

                                        <div className="form-group mb-3">
                                            <select
                                                className="form-control"
                                                name='status'
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="Chờ xác nhận">Chờ xác nhận</option>
                                                <option value="Đang giao hàng">Đang giao hàng</option>
                                                <option value="Đã giao hàng">Đã giao hàng</option>
                                            </select>
                                        </div>

                                        <button
                                            id="login_button"
                                            type="submit"
                                            className="btn btn-block py-3 "
                                            disabled={loading ? true : false}
                                            onClick={() => updateOrderHandler(order._id)}>
                                            CẬP NHẬT TRẠNG THÁI
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder
