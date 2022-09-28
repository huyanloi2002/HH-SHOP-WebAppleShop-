import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from './MetaData';
import Success from '../../../assets/order_success.png'

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src={Success} alt="Order Success" width="200" height="200" />

                    <h2><b>Đơn hàng của bạn đã thanh toán thành công.</b></h2>

                    <Link to="/orders/me" style={{ textDecoration: "none" }}><b >Đi đến xem đơn hàng nào !</b></Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
