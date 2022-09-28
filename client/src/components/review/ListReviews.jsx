import React
    // , { useEffect }
    from 'react';
// import { useAlert } from 'react-alert';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteReview, clearErrors } from '../../store/actions/productActions'
// import actionTypes from '../../store/actions/actionTypes';

const ListReviews = ({ reviews, history, productId, users }) => {
    // const alert = useAlert();
    // const dispatch = useDispatch();
    // const { isDeleted, error: DeleteError } = useSelector(state => state.deleteReview)
    // const { user } = useSelector(state => state.auth)

    // useEffect(() => {
    //     if (DeleteError) {
    //         alert.error(DeleteError)
    //         dispatch(clearErrors())
    //     }
    //     if (isDeleted) {
    //         alert.success('Deleted review successfully')
    //         history.push('/')
    //         dispatch({ type: actionTypes.DELETE_REVIEW_RESET })
    //     }

    // }, [dispatch, alert, isDeleted, DeleteError, history, user])

    // const deleteReviewHandler = (productId, id) => {
    //     dispatch(deleteReview(productId, id))
    // }
    return (
        <React.Fragment>
            <div class="container container-fluid">
                <div class="reviews w-75">

                    {reviews && reviews.map((review, index) => (
                        <React.Fragment>
                            <div>
                                <div class="review-card my-3 d-flex justify-content-between"
                                    style={{ cursor: 'pointer' }}
                                    key={index}
                                >
                                    <div>
                                        <div class="rating-outer">
                                            <div class="rating-inner"
                                                style={{ width: `${(review.rating / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p class="review_user">by {review.name}</p>
                                        <p class="review_comment">{review.comment}</p>
                                    </div>

                                    {/* <div className="delete-rw"
                                        onClick={() => deleteReviewHandler(productId, review._id)}
                                    ><p>X</p></div> */}


                                </div>

                            </div>


                        </React.Fragment>
                    ))}

                </div>
            </div>
        </React.Fragment >
    );
}

export default ListReviews;
