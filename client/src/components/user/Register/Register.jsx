import React, { useState, useEffect } from 'react'
import './Register.css'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../../store/actions/userActions'
// import Loader from '../../layout/Element/Loader';
import MetaData from '../../layout/Element/MetaData';
import df_avatar from '../../../assets/default_avatar.jpg'

const Register = ({ history }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(df_avatar)

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    //register
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/")
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [isAuthenticated, error, alert, history, dispatch])

    //handle register
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)

        dispatch(register(formData))
    }

    //handle onchange
    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <React.Fragment>
            <MetaData title={'Register User'} />
            <div className="wrapper">
                <div className="card">
                    <form onSubmit={submitHandler} className="d-flex flex-column">
                        <div className="h3 text-center text-dark font-weight-bold "><b>ĐĂNG KÝ</b></div>
                        <div className="d-flex align-items-center input-field my-3 mb-4">
                            <span className="fa fa-user p-2"></span>
                            <input
                                type="text"
                                placeholder="Email"
                                required className="form-control"
                                value={email}
                                name="email"
                                onChange={onChange}
                            />
                        </div>
                        <div className="d-flex align-items-center input-field mb-4">
                            <span className="fa fa-lock p-2"></span>
                            <input
                                type="text"
                                placeholder="Tên khách hàng"
                                required
                                className="form-control"
                                id="pwd"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="d-flex align-items-center input-field mb-4">
                            <span className="fa fa-lock p-2"></span>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                required
                                className="form-control"
                                id="pwd"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt=''
                                        />
                                    </figure>
                                </div>

                                <div className='custom-file'>
                                    <div className="upload-btn-wrapper">
                                        <button className="btn-upload">Tải lên avatar</button>
                                        <input
                                            type="file"
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='images/*'
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr className="my-1" />
                        <div className="my-1">
                            <button
                                type="submit"
                                className="btn-register btn-primary"
                                disabled={loading ? true : false}
                            >Đăng ký</button>
                        </div>
                        <div className="mb-3 text-center">
                            <span className="text-light-white ">Nếu bạn đã có tài khoản?</span>
                            <br />
                            <Link to="/login" className="signin-btn">Đăng nhập</Link>
                        </div>
                    </form>
                </div>
            </div >
        </React.Fragment >
    );
}

export default Register;
