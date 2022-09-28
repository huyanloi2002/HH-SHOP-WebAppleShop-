import React, { useEffect, useState } from 'react';
import MetaData from '../layout/Element/MetaData';
import Sidebar from '../admin/Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from '../../store/actions/productActions'
import { clearErrors } from '../../store/actions/userActions';
import actionTypes from '../../store/actions/actionTypes';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


const mdParser = new MarkdownIt(/* Markdown-it options */);


const Dashboard = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])
    const [imagesReview, setImagesReview] = useState([])
    const [contentHTML, setContentHTML] = useState('')
    const [contentText, setContentText] = useState('')

    const categories = [
        'MACBOOK',
        'APPLE WATCH',
        'IPAD',
        'IPHONE',
        'OTHERS',
    ]


    const { loading, error, success } = useSelector(state => state.newProduct)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success) {
            history.push('/admin/products')
            alert.success('Product created successfully')
            dispatch({ type: actionTypes.NEW_PRODUCT_RESET })
        }

    }, [error, dispatch, alert, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name)
        formData.set('price', price)
        formData.set('description', description)
        formData.set('category', category)
        formData.set('stock', stock)
        formData.set('seller', seller)
        formData.set('contentHTML', contentHTML)
        formData.set('contentText', contentText)

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
        // console.log(formData)
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesReview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesReview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentText(text);
    }
    return (
        <React.Fragment>
            <MetaData title={'New Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="container container-fluid">
                        <div className="wrapper-new-pr my-5 col-md-12">
                            <form className="shadow-lg"
                                onSubmit={submitHandler}
                                encType='multipart/form-data'>
                                <h1 className="mb-4"><b>Sản phẩm mới</b></h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên sản phẩm:</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Giá sản phẩm:</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Mô tả sản phẩm:</label>
                                    <textarea
                                        className="form-control"
                                        id="description_field"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Thể loại sản phẩm:</label>
                                    <select className="form-control" id="category_field"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">
                                            Chọn loại
                                        </option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Số lượng:</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Nhà cung cấp:</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-10">
                                    <label>Specifications</label>
                                    <MdEditor style={{ height: '500px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={handleEditorChange} />
                                </div>
                                <div className='form-group'>
                                    <label>Ảnh sản phẩm (chọn được nhiều):</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                        </label>
                                    </div>


                                    {imagesReview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    TẠO MỚI SẢN PHẨM
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Dashboard;
