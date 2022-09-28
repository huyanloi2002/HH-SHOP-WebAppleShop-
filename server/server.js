require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require('./config/database')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())

//Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//Router
app.use('/api/v1', require('./routes/productRouter'))
app.use('/api/v1', require('./routes/authRouter'))
app.use('/api/v1', require('./routes/orderRouter'))
app.use('/api/v1', require('./routes/paymentRouter'))

//Connect
connectDatabase()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})
