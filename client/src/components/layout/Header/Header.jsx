import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../store/actions/userActions'
import './Header.css';
import Logo from '../../../assets/logo-hh-shop.png'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="my-navbar" sticky="top">
            <Container fluid >
                <Link to="/"><span className="logo-2ts"><img src={Logo} width="50" alt="" style={{ marginLeft: '30px' }} /></span></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#features">Shop</Nav.Link>
                        <Nav.Link href="#pricing">Support</Nav.Link> */}
                    </Nav>
                    {user && user.role !== 'admin' &&
                        (<Nav className="cart-lg">
                            <Link to="/cart">
                                <Badge badgeContent={cartItems.length} color="error">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </Link>
                        </Nav>)
                    }
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-dark mr-4" type="button" id="dropDownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        // alt={user && user.name}
                                        alt=""
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span style={{ color: 'black' }}><b>{user && user.name}</b></span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard"><b>Dashboard</b></Link>
                                )}
                                <Link className="dropdown-item" to="/profile"><b>Thông tin cá nhân</b></Link>
                                {user && user.role === 'user' && (
                                    <Link className="dropdown-item" to="/orders/me"><b>Đơn hàng</b></Link>
                                )}
                                <Link className="dropdown-item text-danger" to="/"
                                    onClick={logoutHandler}
                                >
                                    <b>Đăng xuất</b>
                                </Link>

                            </div>
                        </div>
                    )
                        :
                        !loading && <Nav className="btn-ct">
                            <Link to="/login"><button className="btn-btn"><span><b>Đăng nhập</b></span></button></Link>
                            <Link to="/register"><button className="btn-btn"><span><b>Đăng ký</b></span></button></Link>
                        </Nav>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;