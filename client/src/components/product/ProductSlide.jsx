import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './ProductSlide.css'
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { addItemToCart } from '../../store/actions/cartActions'
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import soldout from '../../../src/assets/hethang.png'


const ProductSlide = ({ prt, history, products }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const addToCart = (id, quantity) => {
        dispatch(addItemToCart(id, quantity))
        history.push('/cart')
        alert.success('Items added to cart')
    }

    console.log(prt)
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                slidesPerGroup={1}
                // loop={true}
                // loopFillGroupWithBlank={true}
                // pagination={{

                // }}
                speed={1000}
                autoplay=
                {{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                breakpoints={{
                    // when window width is <= 499px
                    250: {
                        slidesPerView: 1,
                        spaceBetweenSlides: 10
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetweenSlides: 30
                    },
                    830: {
                        slidesPerView: 3,
                        spaceBetweenSlides: 30
                    },

                    // when window width is <= 999px
                    999: {
                        slidesPerView: 4,
                        spaceBetweenSlides: 30
                    }
                }}
                className="mySwiper"
            >
                {products && products.map(product => (
                    <SwiperSlide>
                        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                            <div className="card p-3 rounded" key={product._id}>
                                <img
                                    className="card-img-slide mx-auto"
                                    src={product.images[0].url}
                                    alt={product.name}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title-item-slide" >
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
                                    {product.stock > 0 ? <div className="d-flex justify-content-around">
                                        <Link to={`/product/${product._id}`}
                                            className="btn-view-dt-slide btn-block"
                                        >Xem chi tiết</Link>
                                        <button
                                            className="btn-view-dt-slide"
                                            disabled={product.stock === 0}
                                            onClick={addToCart}
                                        ><i class="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
                                    </div>
                                        : <div className="d-flex justify-content-around">
                                            <img src={soldout} alt="Hết hàng" width="60px" height='30px' className="sold-out" />
                                        </div>}
                                </div>
                            </div>
                        </Link>

                    </SwiperSlide>
                ))}


            </Swiper>
        </>
    );
}
export default ProductSlide;