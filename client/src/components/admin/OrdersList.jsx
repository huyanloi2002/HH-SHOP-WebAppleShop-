import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/Element/MetaData';
import Sidebar from '../admin/Sidebar';
import Loader from '../layout/Element/Loader';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, clearErrors, deleteOrder } from '../../store/actions/orderActions';
import actionTypes from '../../store/actions/actionTypes';

const OrdersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, ordersAll } = useSelector(state => state.orders);
    const { isDeleted, error: DeleteError } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(getOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (DeleteError) {
            alert.error(DeleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Order deleted successfully');
            history.push('/admin/orders');
            dispatch({ type: actionTypes.DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, history, DeleteError, isDeleted])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Mã đơn hàng',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Số sản phẩm',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Tổng tiền',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Trạng thái',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                },
            ],
            rows: []
        }

        ordersAll.forEach(order => {
            data.rows.push({
                id: <p style={{ fontSize: '18px', color: "red" }}><b>#{order._id}</b></p>,
                numofItems: <p style={{ fontSize: '14px' }}><b>x{order.orderItems.length}</b></p>,
                amount: <p style={{ fontSize: '16px', color: "crimson" }}><b>${order.totalPrice}</b></p>,
                status: order.orderStatus && String(order.orderStatus).includes('Đã giao hàng')
                    ? <p style={{ color: 'green' }}><b>{order.orderStatus}</b></p>
                    : <p style={{ color: 'red' }}><b>{order.orderStatus}</b></p>,
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2" >
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" style={{ marginLeft: '3px' }}
                        onClick={() => deleteOrderHandler(order._id)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="container container-fluid">
                            <h1 className="my-5"><b>Tất cả đơn hàng</b></h1>

                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setOrders()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            )}
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList
