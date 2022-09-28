import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {

    return (
        <Helmet>
            <title>{`${title}-by-Quang-Huy`}</title>
        </Helmet>
    );
}

export default MetaData;
