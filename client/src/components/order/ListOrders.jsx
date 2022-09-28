import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Element/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../store/actions/orderActions';
import { useAlert } from 'react-alert';
import MetaData from '../layout/Element/MetaData';

const ListOrders = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { orders, error, loading } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [alert, dispatch, error]);

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
                    field: 'numOfItems',
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
                    sort: 'asc'
                }

            ],
            rows: []
        }
        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Đã giao hàng')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }
    return (
        <React.Fragment>
            <MetaData title={'My Orders'} />
            <div className="container container-fluid">
                <h1 className="mt-5"><b>Đơn hàng của tôi</b></h1>

                {loading ? <Loader /> : (

                    <MDBDataTable
                        data={setOrders()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />

                )
                }
            </div>
        </React.Fragment >
    );
}

export default ListOrders;
