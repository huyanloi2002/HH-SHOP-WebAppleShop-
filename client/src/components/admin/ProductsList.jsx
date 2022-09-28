import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/Element/MetaData';
import Loader from '../layout/Element/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { getAdminProducts, clearErrors, deleteProduct } from '../../store/actions/productActions';
import Sidebar from './Sidebar';
import actionTypes from '../../store/actions/actionTypes';

const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.productAdmin)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Product deleted successfully')
            history.push('/admin/products')
            dispatch({ type: actionTypes.DELETE_PRODUCT_RESET })
        }
    }, [alert, dispatch, error, isDeleted, deleteError, history]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Ảnh',
                    field: 'image',
                    sort: 'asc'
                },
                {
                    label: 'Tên sản phẩm',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Giá',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Số lượng',
                    field: 'stock',
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
        products.forEach(product => {
            data.rows.push({
                image: <img src={product.images[0].url} alt={product.name} width="40px" />,
                name: <p style={{ fontSize: '15px' }}><b>{product.name}</b></p>,
                price: <p style={{ fontSize: '16px', color: 'crimson' }}><b>${product.price}</b></p>,
                stock: <p style={{ fontSize: '14px' }}><b>x{product.stock}</b></p>,
                actions:
                    <React.Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2" style={{ marginLeft: '3px' }}
                            onClick={() => deleteProductHandler(product._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </React.Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <React.Fragment>
            <MetaData title={"All Products"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <React.Fragment>
                        <div className="container container-fluid">
                            <h1 className="my-5"><b>Tất cả sản phẩm</b></h1>
                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setProducts()}
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
