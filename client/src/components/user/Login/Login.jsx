import React, { useState, useEffect } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../../store/actions/userActions'
import Loader from '../../layout/Element/Loader';
import MetaData from '../../layout/Element/MetaData';



const Login = ({ history, location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    console.log(history)
    //login
    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [isAuthenticated, error, alert, history, dispatch, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                <React.Fragment>
                    <MetaData title='Login' />
                    <div className="wrapper">
                        <div className="card">
                            <form onSubmit={submitHandler} className="d-flex flex-column">
                                <div className="h3 text-center text-dark font-weight-bold "><b>ĐĂNG NHẬP</b></div>
                                <div className="d-flex align-items-center input-field my-3 mb-4">
                                    <span className="fa fa-user p-2"></span>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        required
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex align-items-center input-field mb-4">
                                    <span className="fa fa-lock p-2"></span>
                                    <input type="password"
                                        placeholder="Mật khẩu"
                                        required
                                        className="form-control"
                                        id="pwd"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-sm-flex align-items-sm-center justify-content-sm-between">
                                    <Link to="/password/forgot"><div className="mt-sm-0 mt-3"><a href="#!">Quên mật khẩu?</a></div></Link>
                                </div>
                                <hr className="my-3" />
                                <div className="my-1">
                                    <button type="submit" className="btn-login btn-primary" >Đăng nhập</button>
                                </div>
                                <div className="mb-3 text-center">
                                    <span className="text-light-white ">Nếu bạn chưa có tài khoản?</span>
                                    <br />
                                    <Link to="/register" className="signup-btn">Đăng ký</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default Login;
