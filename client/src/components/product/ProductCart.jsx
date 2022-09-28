import React, { useEffect, useState } from 'react'
import MetaData from '../layout/Element/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import ProductCartItem from './ProductCartItem';
import Loader from '../layout/Element/Loader';
import { useAlert } from 'react-alert';
import { Route } from 'react-router-dom';
import Search from '../layout/Element/Search';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import './ProductCart.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range)



const ProductCart = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 5000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filterProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword
    const categories = [
        'MACBOOK',
        'APPLE WATCH',
        'IPAD',
        'IPHONE',
        'OTHERS',
    ]
    //get all product and filter
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, error, alert, currentPage, keyword, price, category, rating])
    //set pagination
    const setCurrentpageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    console.log(products)
    let count = productsCount;
    if (keyword || !keyword) {
        count = filterProductsCount
    }

    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                <React.Fragment>
                    <MetaData title={'HH-SHOP'} />
                    <div className="container container-fluid">
                        <h1 id="products_heading" style={{ fontWeight: 'bold' }}>Sản phẩm</h1>
                        <section id="products" className="container mt-5">
                            <div className="prd-card">
                                {/* {keyword ? ( */}
                                <React.Fragment>
                                    <div className="mt-5 mb-5 filter-card">
                                        <div className="px-5">

                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    5000: `$5000`
                                                }}
                                                min={1}
                                                max={5000}
                                                defaultValue={[1, 5000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                            <hr className="my-5" />
                                            <div className="filter-ct-r">
                                                <div className="mt-5 category">
                                                    <h4 className="mb-3" style={{ fontWeight: 'bold' }}>
                                                        Thể loại
                                                    </h4>
                                                    <ul className="pl-0">
                                                        {categories.map(category => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none',
                                                                }}
                                                                key={category}
                                                                onClick={() => setCategory(category)}
                                                            >
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <hr className=" my-3 rating" />
                                                <div className="mt-5">
                                                    <h4 className="mb-3" style={{ fontWeight: 'bold' }}>
                                                        Xếp hạng
                                                    </h4>
                                                    <ul className="pl-0">
                                                        {[5, 4, 3, 2, 1, 0].map(star => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none',
                                                                }}
                                                                key={star}
                                                                onClick={() => setRating(star)}
                                                            >
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner"
                                                                        style={{
                                                                            width: `${star * 20}%`
                                                                        }}
                                                                    >
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card">
                                        <Route render={({ history }) => <Search className="search-prd" history={history} style={{ width: '100%' }} />} />
                                        <div className="row">
                                            {products.map(product => (
                                                <ProductCartItem key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </React.Fragment>
                                {/* ) : (
                                    products.map(product => (
                                        <ProductCartItem key={product._id} product={product} col={3} />
                                    ))
                                )} */}


                            </div>
                        </section>
                        {resPerPage <= count && (
                            <div className='d-flex justify-content-center mt-5'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentpageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </div>
                </React.Fragment >
            )}
        </React.Fragment >
    );
}

export default ProductCart;
