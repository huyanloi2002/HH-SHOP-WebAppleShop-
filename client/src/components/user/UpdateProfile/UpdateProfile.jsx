import React, { useEffect, useState } from 'react'
import MetaData from '../../layout/Element/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser, clearErrors } from '../../../store/actions/userActions';
import df_avatar from '../../../assets/default_avatar.jpg';
import actionTypes from '../../../store/actions/actionTypes';
import './UpdateProfile.css'


const UpdateProfile = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(df_avatar)

    const alert = useAlert();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)


    //updat profile
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser())

            history.push('/profile')
            dispatch({
                type: actionTypes.UPDATE_PROFILE_RESET
            })
        }
    }, [error, alert, history, dispatch, isUpdated, user])

    //handle update
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        formData.set('avatar', avatar)

        dispatch(updateProfile(formData))
    }

    //handle onchange
    const onChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0]);

    }


    return (
        <React.Fragment>
            <MetaData title={'Update Profile'} />
            <div className="wrapper-update-pr wrapper">
                <div className="card">
                    <form onSubmit={submitHandler} className="d-flex flex-column">
                        <div className="h3 text-center text-dark font-weight-bold "><b>CẬP NHẬT THÔNG TIN</b></div>
                        <label>Email: </label>
                        <div className="d-flex align-items-center input-field  mb-4">
                            <input
                                type="text"
                                placeholder="Email"
                                required className="form-control"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <label>Tên: </label>
                        <div className="d-flex align-items-center input-field mb-4">

                            <input
                                type="text"
                                placeholder="Tên khách hàng"
                                required
                                className="form-control"
                                id="pwd"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar: </label>
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
                                className="btn-up-pr btn-primary"
                                disabled={loading ? true : false}

                            > {loading ? '...' : 'Cập nhật'}</button>
                        </div>

                    </form>
                </div>
            </div >
        </React.Fragment>
    );
}
export default UpdateProfile;