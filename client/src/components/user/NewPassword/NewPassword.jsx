import React, { useEffect, useState } from 'react'
import MetaData from '../../layout/Element/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../../store/actions/userActions';
import './NewPassword.css'

const ForgotPassword = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, serConfirmPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, success, loading } = useSelector(state => state.forgotPassword)

    //updat profile
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Password update successfully')
            history.push('/login')
        }
    }, [error, alert, dispatch, success, history])

    //handle update
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password)
        formData.set('confirmPassword', confirmPassword)

        dispatch(resetPassword(match.params.token, formData))
    }


    return (
        <React.Fragment>
            <MetaData title={'Reset Password'} />
            <div className="wrapper-reset-pw wrapper">
                <div className="card-rp">
                    <form onSubmit={submitHandler} className="d-flex flex-column">
                        <div className="h3 text-center text-dark font-weight-bold ">ĐỔI MẬT KHẨU</div>
                        <label>Mật khẩu mới: </label>
                        <div className="d-flex align-items-center input-field  mb-4">
                            <input
                                type="password"
                                placeholder="Mật khẩu mới"
                                required className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <label>Xác thực mật khẩu: </label>
                        <div className="d-flex align-items-center input-field  mb-4">
                            <input
                                type="password"
                                placeholder="Xác thực mật khẩu"
                                required className="form-control"
                                value={confirmPassword}
                                onChange={(e) => serConfirmPassword(e.target.value)}
                            />
                        </div>
                        <hr className="my-1" />
                        <div className="my-1">
                            <button
                                type="submit"
                                className="btn-rs-pw btn-primary"
                                disabled={loading ? true : false}

                            > {loading ? '...' : 'Đổi mật khẩu'}</button>
                        </div>

                    </form>
                </div>
            </div >
        </React.Fragment>
    );
}
export default ForgotPassword;