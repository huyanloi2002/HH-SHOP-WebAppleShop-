import React, { useEffect, useState } from 'react';
import Loader from '../layout/Element/Loader'
import MetaData from '../layout/Element/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors, getAdminProducts } from '../../store/actions/productActions'
import { addItemToCart } from '../../store/actions/cartActions'
import actionTypes from '../../store/actions/actionTypes';
import ListReviews from '../review/ListReviews';
import ProductSlide from './ProductSlide';
import { Carousel } from 'react-bootstrap'


const ProductDetails = ({ match, history }) => {
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productDetails);
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview);
    const { products } = useSelector(state => state.products)


    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        dispatch(getAdminProducts())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Review posted successfully');
            dispatch({ type: actionTypes.NEW_REVIEW_RESET })
        }
    }, [dispatch, error, alert, match.params.id, reviewError, success])

    const increaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity))
        alert.success('Items added to cart')
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }
    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('productId', match.params.id)

        dispatch(newReview(formData));
    }
    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                <React.Fragment>
                    <MetaData title={product.name} />
                    <div className="container container-fluid">
                        <div className="row d-flex justify-content-around prd-dt">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map(image => (
                                        <Carousel.Item key={image.public_id} >
                                            <img className="d-block w-100" src={image.url} alt={image.public_id} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3 style={{ fontWeight: 'bold' }}>{product.name}</h3>
                                <p id="product_id">Product # {product._id}</p>

                                <hr />

                                <div className="rating-outer">
                                    <div className="rating-inner"
                                        style={{ width: `${(product.ratings / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <span id="no_of_reviews">({product.numOfReviews})</span>

                                <hr />

                                <p id="product_price" >${product.price}</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty}
                                        style={{ width: '30px' }}
                                    >
                                        <b>-</b>
                                    </span>

                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                    <span className="btn btn-primary plus" onClick={increaseQty}
                                        style={{ width: '30px' }}
                                    >
                                        <b>+</b>
                                    </span>
                                </div>
                                {product.stock > 0 ?
                                    <button
                                        type="button"
                                        id="cart_btn"
                                        className="btn btn-primary d-inline ml-4"
                                        disabled={product.stock === 0}
                                        onClick={addToCart}
                                    >Thêm vào giỏ hàng</button> : null
                                }

                                <hr />
                                <div>
                                    <p>Thông tin: <span id="stock_status"
                                        className={product.stock > 0 ? 'greenColor' : 'redColor'}
                                    >
                                        {product.stock > 0 ? `Còn hàng (${product.stock} sp)` : `Hết hàng`}
                                    </span></p>
                                    <hr />


                                    <p>Đã bán: <span id="stock_status"

                                    >
                                        {product.sold}
                                    </span></p>
                                </div>
                                <hr />

                                <h4 className="mt-2" style={{ fontWeight: 'bold' }}>Mô tả:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Nhà cung cấp: <strong>{product.seller}</strong></p>

                                {
                                    user ? <button id="review_btn"
                                        type="button"
                                        className="btn btn-primary mt-4"
                                        data-bs-toggle="modal"
                                        data-bs-target="#ratingModal"
                                        onClick={setUserRatings}
                                    >
                                        Thêm bình luận
                                    </button> :
                                        <div className="alert alert-danger mt-5">
                                            Đăng nhập để bình luận
                                        </div>
                                }

                                <div className="row">
                                    <div className="rating w-50">

                                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="ratingModalLabel">Bình luận</h5>
                                                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">

                                                        <ul className="stars" >
                                                            <li className="star"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li className="star"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li className="star"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li className="star"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li className="star"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                        </ul>

                                                        <textarea name="review" id="review" className="form-control mt-3"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        >

                                                        </textarea>

                                                        <button
                                                            className="btn my-3 float-right review-btn px-4 text-white" data-bs-dismiss="modal" aria-label="Close"
                                                            onClick={reviewHandler}
                                                        >Xác nhận</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div >

                        </div >
                        <div className="row">
                            <div className="specifications" style={{ fontSize: '14px' }}>
                                <h3 style={{ fontWeight: 'bold' }}>Chi tiết sản phẩm:</h3>
                                {product
                                    && product.contentHTML
                                    &&
                                    <div dangerouslySetInnerHTML={{ __html: product.contentHTML }}>
                                    </div>
                                }
                            </div>
                            <div style={{ paddingTop: '50px', paddingBottom: '50px', width: '100%' }}>
                                <h3 style={{ fontWeight: 'bold' }}>Bình luận:</h3>
                                <hr />
                                {
                                    product.reviews && product.reviews.length > 0 && (
                                        <ListReviews reviews={product.reviews} users={user} productId={match.params.id} history={history} />
                                    )
                                }
                                <hr />
                            </div>
                        </div>
                        <h3 style={{ fontWeight: 'bold' }}>Sản phẩm liên quan:</h3>
                    </div >
                    <div style={{ margin: "10px 20px", padding: '10px 0' }}>
                        {/* {products.map(prt => {
                            return prt.category === product.category
                                ? */}
                        < ProductSlide
                            // key={prt._id}
                            products={products}
                        />
                        {/* : null
                        })} */}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment >
    );
}

export default ProductDetails;
