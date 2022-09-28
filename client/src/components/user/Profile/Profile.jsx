import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../layout/Element/Loader';
import { useSelector } from 'react-redux';
import MetaData from '../../layout/Element/MetaData';
import './Profile.css'

const Profile = () => {

    const { loading, user } = useSelector(state => state.auth)

    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                <React.Fragment>
                    <MetaData title={`Profile of ${user.name}`} />
                    <section className="h-100 gradient-custom-2">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-lg-9 col-xl-7">
                                    <div className="title">
                                        <h1><b>Thông tin cá nhân</b></h1>
                                    </div>
                                    <div className="card-pr">
                                        <div className="rounded-top text-white d-flex flex-row main-pr" >

                                            <div className="ms-4 mt-5 d-flex flex-column content-pr">
                                                <img src={user.avatar.url}
                                                    alt="" className="img-fluid img-thumbnail mt-4 mb-2"
                                                />
                                                <Link to="/profile/update" className="btn btn-outline-dark edit-pr" data-mdb-ripple-color="dark"
                                                >
                                                    Chỉnh sửa
                                                </Link>
                                            </div>
                                            <div className="ms-3 name-pr" >
                                                <h5>{user.name}</h5>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 text-black btn-pr">
                                            <div className="d-flex justify-content-end text-center py-1 btn-ct-pr">

                                                <Link to="/orders/me" className="btn btn-outline-dark orders-pr" data-mdb-ripple-color="dark"
                                                >
                                                    Đơn hàng
                                                </Link>
                                                <Link to="/password/update" className="btn btn-outline-dark changepw-pr" data-mdb-ripple-color="dark"
                                                >
                                                    Đổi mật khẩu
                                                </Link>
                                            </div>
                                        </div>
                                        <div class="card-body p-4 text-black">
                                            <p class="lead fw-normal mb-1">Thông tin chi tiết</p>
                                            <div class="mb-5">
                                                <div class="p-4 more-pr">
                                                    <div>
                                                        <label>Tên: </label>
                                                        <p class="font-italic mb-1">{user.name}</p>
                                                    </div>
                                                    <div>
                                                        <label>Email: </label>
                                                        <p class="font-italic mb-1">{user.email}</p>
                                                    </div>
                                                    <div>
                                                        <label>Ngày lập: </label>
                                                        <p class="font-italic mb-1">{String(user.createdAt).substring(0, 10)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default Profile;
