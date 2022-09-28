import React from 'react'
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../store/actions/cartActions';
import { useDispatch } from 'react-redux';
import soldout from '../../../src/assets/hethang.png'


const ProductCartItem = ({ product, col }) => {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addItemToCart(product._id, 1))
        alert.success('Items added to cart')
    }

    return (
        <React.Fragment>
            <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>

                <div className="card p-3 rounded">
                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                        <img
                            className="card-img mx-auto"
                            src={product.images[0].url}
                            alt={product.name}
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title-item" >
                                <Link className="card-title-link" to={`/product/${product._id}`}>{product.name}</Link>
                            </h5>
                            <div className="ratings mt-auto">
                                <div className="rating-outer">
                                    <div className="rating-inner"
                                        style={{ width: `${(product.ratings / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <span id="no_of_reviews">({product.numOfReviews})</span>
                            </div>
                            <p className="card-text">${product.price}</p>

                        </div>
                    </Link>
                    {product.stock > 0 ?
                        <div className="d-flex justify-content-around mt-2">
                            <Link to={`/product/${product._id}`}
                                className="btn-view-dt"
                            >Xem chi tiết</Link>
                            <button
                                className="btn-view-dt"
                                disabled={product.stock === 0}
                                onClick={addToCart}
                            ><i class="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
                        </div>
                        :
                        <div className="d-flex justify-content-around">
                            <img src={soldout} alt="Hết hàng" width="100px" height='50px' className="sold-out" />
                        </div>
                    }
                </div>


            </div>
        </React.Fragment >
    );
}

export default ProductCartItem;
