import React from 'react'
import ProductCart from './product/ProductCart';
import Banner from './layout/Banner/Banner';

const Home = ({ match }) => {

    return (
        <React.Fragment>
            <Banner />
            <ProductCart match={match} />
        </React.Fragment>
    );
}

export default Home;
