import React, { useState } from 'react';
import MetaData from '../layout/Element/MetaData';
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../store/actions/cartActions';
import CheckoutStep from './CheckoutStep';

const ShippingInfo = ({ history }) => {
    const countriesList = Object.values(countries)

    const dispatch = useDispatch();
    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
        history.push('/confirm')
    }
    // console.log(address, city, phoneNo, postalCode, country)
    return (
        <React.Fragment>
            <MetaData title={'Shipping Information'} />
            <CheckoutStep shipping />
            <div className="row wrapper">
                <div className="col-10 ">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h2 className="mb-4" style={{ textAlign: 'center' }}><b>Thông tin giao hàng</b></h2>
                        <div className="form-group mb-1">
                            <label htmlFor="address_field"><b>Địa chỉ: </b></label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-1">
                            <label htmlFor="city_field"><b>Thành phố: </b></label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-1">
                            <label htmlFor="phone_field"><b>Số ĐT: </b></label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-1">
                            <label htmlFor="postal_code_field"><b>Mã vùng: </b></label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field"><b>Quốc gia: </b></label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            <b> Tiếp tục</b>
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ShippingInfo;
