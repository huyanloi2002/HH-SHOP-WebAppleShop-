import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/Element/MetaData';
import Loader from '../layout/Element/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { getAllUsers, clearErrors, deleteUser } from '../../store/actions/userActions';
import actionTypes from '../../store/actions/actionTypes';
import Sidebar from './Sidebar';

const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.usersAll)
    const { isDeleted, error: DeleteError } = useSelector(state => state.userAdmin)

    useEffect(() => {
        dispatch(getAllUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (DeleteError) {
            alert.error(DeleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('User deleted sucessfully');
            history.push('/admin/users');
            dispatch({ type: actionTypes.DELETE_USER_RESET })
        }

    }, [alert, dispatch, error, history, DeleteError, isDeleted]);

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'Mã người dùng',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Vai trò',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                },

            ],
            rows: []
        }
        users.forEach(user => {
            data.rows.push({
                id: <p style={{ fontSize: '16px' }}><b>{user._id}</b></p>,
                name: <p style={{ fontSize: '14px' }}><b>{user.name}</b></p>,
                email: user.email,
                role:
                    <React.Fragment>
                        {user.role === 'admin' && <p style={{ color: 'green' }}><b>{'Quản trị viên'}</b></p>}
                        {user.role === 'user' && <p style={{ color: 'red' }}><b>{'Khách hàng'}</b></p>}
                        {user.role === 'staff' && <p style={{ color: 'orange' }}><b>{'Nhân viên'}</b></p>}
                    </React.Fragment>,
                actions:
                    <React.Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        {user.role === 'admin' ?
                            <button className="btn btn-danger py-1 px-2" style={{ marginLeft: '3px' }}
                                disabled
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                            :
                            <button className="btn btn-danger py-1 px-2" style={{ marginLeft: '3px' }}
                                onClick={() => deleteUserHandler(user._id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>}
                    </React.Fragment>
            })
        })

        return data;
    }

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    return (
        <React.Fragment>
            <MetaData title={"All Users"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <React.Fragment>
                        <div className="container container-fluid">
                            <h1 className="my-5"><b>Tất cả người dùng</b></h1>
                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setUsers()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            )
                            }
                        </div>
                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductsList;
