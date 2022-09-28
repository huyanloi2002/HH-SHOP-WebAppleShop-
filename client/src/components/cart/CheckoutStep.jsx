import React from 'react'
import { Link } from 'react-router-dom';


const CheckoutStep = ({ shipping, confirmOrder, payment }) => {

    return (
        <React.Fragment>
            <div className="checkout-progress d-flex justify-content-center mt-5">
                {
                    shipping ? <Link to="/shipping" className="float-right">
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Thông tin</div>
                        <div className="triangle-active"></div>
                    </Link> : <Link to="#!" disable>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Thông tin</div>
                        <div className="triangle-incomplete"></div>
                    </Link>

                }
                {
                    confirmOrder ? <Link to="/confirm" className="float-right">
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Xác nhận</div>
                        <div className="triangle-active"></div>
                    </Link> : <Link to="#!" disable>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Xác nhận</div>
                        <div className="triangle-incomplete"></div>
                    </Link>

                }
                {
                    payment ? <Link to="/payment" className="float-right">
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Thanh toán</div>
                        <div className="triangle-active"></div>
                    </Link> : <Link to="#!" disable>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Thanh toán</div>
                        <div className="triangle-incomplete"></div>
                    </Link>

                }
            </div>
        </React.Fragment>
    );
}

export default CheckoutStep;
