import React, { useEffect, useState } from 'react'
import MetaData from '../../layout/Element/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../../store/actions/userActions';
import actionTypes from '../../../store/actions/actionTypes';
import './UpdatePassword.css'

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector(state => state.user)

    //updat profile
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Password updated successfully')

            history.push('/profile')
            dispatch({
                type: actionTypes.UPDATE_PASSWORD_RESET
            })
        }
    }, [error, alert, history, dispatch, isUpdated])

    //handle update
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)

        dispatch(updatePassword(formData))
    }


    return (
        <React.Fragment>
            <MetaData title={'Update Password'} />
            <div className="wrapper-update-ps wrapper">
                <div className="card">
                    <form onSubmit={submitHandler} className="d-flex flex-column">
                        <div className="h3 text-center text-dark font-weight-bold "><b>CẬP NHẬT MẬT KHẨU</b></div>
                        <label>Mật khẩu cũ: </label>
                        <div className="d-flex align-items-center input-field  mb-4">
                            <input
                                type="password"
                                placeholder="Mật khẩu cũ"
                                required className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <label>Mật khẩu mới: </label>
                        <div className="d-flex align-items-center input-field mb-4">

                            <input
                                type="password"
                                placeholder="Mật khẩu mới"
                                required
                                className="form-control"
                                id="pwd"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <hr className="my-1" />
                        <div className="my-1">
                            <button
                                type="submit"
                                className="btn-up-pw btn-primary"
                                disabled={loading ? true : false}

                            > {loading ? '...' : 'Cập nhật'}</button>
                        </div>

                    </form>
                </div>
            </div >
        </React.Fragment>
    );
}
export default UpdatePassword;