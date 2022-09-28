const Product = require('../models/productModel')
require("dotenv").config()
const connectDatabase = require('../config/database')

const product = require('../data/product.json')
const { connect } = require('mongoose')

connectDatabase()

const seedProduct = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted successfully')

        await Product.insertMany(product)
        console.log('All Products are inserted successfully')

        process.exit()

    } catch (err) {
        console.log(err.message);
        process.exit();
    }
}

seedProduct()