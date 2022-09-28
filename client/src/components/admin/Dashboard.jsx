import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/Element/MetaData';
import Sidebar from '../admin/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../store/actions/productActions';
import { getOrders } from '../../store/actions/orderActions'
import { getAllUsers } from '../../store/actions/userActions'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { ordersAll, totalAmount } = useSelector(state => state.orders)
    const { users } = useSelector(state => state.usersAll)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1
        }
    })
    let totalStock = 0;
    let totalRatings = 0.0;
    let totalReviews = 0;
    let totalSold = 0;
    products.forEach(product => {
        if (product.stock) {
            totalStock += product.stock
        }
        if (product.ratings) {
            totalRatings += product.ratings / products.length
        }
        if (product.numOfReviews) {
            totalReviews += product.numOfReviews
        }
        if (product.sold) {
            totalSold += product.sold
        }
    })


    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(getOrders())
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>


                <div className="col-12 col-md-10">
                    <h1 className="my-4"><b>Bảng điều khiển</b></h1>
                    <div className="container container-fluid">

                        {/* <React.Fragment> */}
                        <MetaData title={'Admin Dashboard'} />

                        <div className="row pr-4">
                            <div className="col-xl-12 col-sm-12 mb-3">
                                <div className="card text-white o-hidden h-100"
                                    style={{
                                        backgroundColor: "#4158D0",
                                        backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng thành tiền</b></span>
                                            <br />
                                            <b>$ {parseFloat(totalAmount).toFixed(2)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pr-4">
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white o-hidden h-100"
                                    style={{
                                        backgroundColor: " #85FFBD",
                                        backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"
                                        ><span><b>Tổng sản phẩm</b></span><br />
                                            <b>{products && products.length}</b>
                                        </div>
                                    </div>
                                    <Link className="card-footer text-black clearfix small z-1"
                                        style={{ textDecoration: 'none' }}
                                        to="/admin/products">
                                        <span className="float-left"><b>Xem chi tiết</b></span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white o-hidden h-100"
                                    style={{
                                        backgroundColor: "#FAD961",
                                        backgroundImage: "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng đơn hàng</b></span><br />
                                            <b>{ordersAll && ordersAll.length}</b>
                                        </div>
                                    </div>
                                    <Link className="card-footer text-black clearfix small z-1"
                                        style={{ textDecoration: 'none' }}
                                        to="/admin/orders">
                                        <span className="float-left"><b>Xem chi tiết</b></span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white o-hidden h-100 card-ct"
                                    style={{
                                        backgroundColor: " #FA8BFF",
                                        backgroundImage: "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)"

                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng người dùng</b></span><br />
                                            <b>{users && users.length}</b>
                                        </div>
                                    </div>
                                    <Link className="card-footer text-black clearfix small z-1"
                                        style={{ textDecoration: 'none' }}
                                        to="/admin/users">
                                        <span className="float-left"><b>Xem chi tiết</b></span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white o-hidden h-100"
                                    style={{
                                        backgroundColor: "#FBDA61",
                                        backgroundImage: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng bình luận</b></span><br />
                                            <b>
                                                {totalReviews}
                                            </b>
                                        </div>
                                    </div>
                                    <Link className="card-footer text-black clearfix small z-1"
                                        style={{ textDecoration: 'none' }}
                                        to="/admin/reviews">
                                        <span className="float-left"><b>Xem chi tiết</b></span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white  o-hidden h-100"
                                    style={{
                                        backgroundColor: "#F4D03F",
                                        backgroundImage: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng sản phẩm hết hàng</b></span><br />
                                            <b>
                                                {outOfStock}
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white o-hidden h-100"
                                    style={{
                                        backgroundColor: "#FEE140",
                                        backgroundImage: "linear-gradient(90deg, #FEE140 0%, #FA709A 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng số lượng sản phẩm</b></span><br />
                                            <b>
                                                {totalStock}
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white o-hidden h-100"
                                    style={{
                                        // backgroundColor: " #FFE53B",
                                        backgroundImage: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng xếp hạng (sao)</b></span><br />
                                            <b>
                                                {totalRatings.toFixed(2)}

                                                <i className="fa fa-star"
                                                    style={{ color: 'yellow', marginLeft: '5px' }}
                                                    aria-hidden="true"></i>

                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white o-hidden h-100"
                                    style={{
                                        backgroundColor: "#FFDEE9",
                                        backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"
                                    }}
                                >
                                    <div className="card-body">
                                        <div className="text-center card-font-size"><span><b>Tổng sản phẩm đã bán</b></span><br />
                                            <b>
                                                {totalSold}
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </React.Fragment> */}
                    </div>

                </div>
            </div>
        </React.Fragment >
    );
}

export default Dashboard;
