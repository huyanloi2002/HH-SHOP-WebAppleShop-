import React, { useEffect, useState } from 'react'
import MetaData from '../../layout/Element/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../../store/actions/userActions';
import './ForgotPassword.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector(state => state.forgotPassword)

    //updat profile
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (message) {
            alert.success(message)


        }
    }, [error, alert, dispatch, message])

    //handle update
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email)

        dispatch(forgotPassword(formData))
    }


    return (
        <React.Fragment>
            <MetaData title={'Forgot Password'} />
            <div className="wrapper-forgot-pw wrapper">
                <div className="card-fg">
                    <form onSubmit={submitHandler} className="d-flex flex-column">
                        <div className="h3 text-center text-dark font-weight-bold "><b>GỬI EMAIL</b></div>
                        <label>Email: </label>
                        <div className="d-flex align-items-center input-field  mb-4">
                            <span className="fa fa-user p-2"></span>
                            <input
                                type="text"
                                placeholder="Email"
                                required className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <hr className="my-1" />
                        <div className="my-1">
                            <button
                                type="submit"
                                className="btn-fg-pw btn-primary"
                                disabled={loading ? true : false}

                            > {loading ? '...' : 'Gủi Email'}</button>
                        </div>

                    </form>
                </div>
            </div >
        </React.Fragment>
    );
}
export default ForgotPassword;