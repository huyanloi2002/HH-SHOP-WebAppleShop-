import React from "react";
import { Link } from "react-router-dom";
import {useSelector } from 'react-redux'

const Sidebar = () => {


    return (
        <React.Fragment>
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled sidebar-ct">
                        <li>
                            <Link to="/dashboard"><i className="fa fa-tachometer"></i> Bảng điều khiển</Link>
                        </li>

                        <li>
                            <a href="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i> Sản phẩm</a>
                            <ul className="collapse list-unstyled" id="productSubmenu">
                                <li>
                                    <Link to="/admin/products"><i className="fa fa-clipboard"></i> Tất cả</Link>
                                </li>

                                <li>
                                    <Link to="/admin/product"><i className="fa fa-plus"></i> Nhập hàng</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i>Đơn hàng</Link>
                        </li>

                        <li>
                            <Link to="/admin/users"><i className="fa fa-users"></i>Người dùng</Link>
                        </li>

                        <li>
                            <Link to="/admin/reviews"><i className="fa fa-star"></i> Đánh giá</Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Sidebar;
