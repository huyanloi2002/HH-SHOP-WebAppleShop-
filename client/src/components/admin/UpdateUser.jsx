import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/Element/MetaData';
import Sidebar from '../admin/Sidebar';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../store/actions/userActions';
import actionTypes from '../../store/actions/actionTypes';

const UpdateUser = ({ history, match }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error: UpdateError, isUpdated } = useSelector(state => state.userAdmin);
    const { userDetails = {}, error } = useSelector(state => state.userDetails)

    const userId = match.params.id;
    console.log(userId)

    useEffect(() => {
        if (userDetails && userDetails._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {

            setName(userDetails.name);
            setEmail(userDetails.email);
            setRole(userDetails.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (UpdateError) {
            alert.error(UpdateError);
            dispatch(clearErrors());
        }


        if (isUpdated) {
            alert.success('User updated successfully')

            history.push('/admin/users')

            dispatch({
                type: actionTypes.UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated, userId, userDetails, UpdateError])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        formData.set('role', role)

        dispatch(updateUser(userDetails._id, formData))
    }

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h2 className="mt-2 mb-5"><b>Cập nhật người dùng</b></h2>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên:</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email:</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Vai trò:</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">Khách hàng</option>
                                        <option value="admin">Quản trị viên</option>
                                        <option value="staff">Nhân viên</option>
                                    </select>
                                </div>

                                <button type="submit" id="login_button" className="btn update-btn btn-block mt-4 mb-3" >Cập nhật</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser
