import React, { useEffect } from 'react';
import MetaData from '../layout/Element/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { getAdminProducts, clearErrors } from '../../store/actions/productActions';
import Sidebar from './Sidebar';

const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { products, error } = useSelector(state => state.products)

    let allReview = []
    products.forEach(product => {
        if (product.reviews) {
            allReview = allReview.concat(product.reviews)
        }

    })
    console.log('allReview', allReview)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [alert, dispatch, error, history]);

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Mã bình luận',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Mã ngươi dùng',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Tên',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Xếp hạng',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Bình luận',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                },

            ],
            rows: []
        }


        allReview.forEach(review => {
            data.rows.push({
                id: review._id,
                user: review.user,
                name: review.name,
                role: <div class="rating-outer">
                    <div class="rating-inner"
                        style={{ width: `${(review.rating / 5) * 100}%` }}
                    ></div>
                </div>
                ,
                comment: review.comment,
                actions:
                    <React.Fragment>

                        <button className="btn btn-danger py-1 px-2" style={{ marginLeft: '3px' }}
                            disabled
                        >
                            <i className="fa fa-trash"></i>
                        </button>

                    </React.Fragment>
            })
        })

        return data;
    }



    return (
        <React.Fragment>
            <MetaData title={"All Reviews"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <React.Fragment>
                        <div className="container container-fluid">
                            <h1 className="my-5"><b>Tất cả đánh giá</b></h1>
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        </div>
                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductsList;
