const mongoose = require('mongoose');
require("dotenv").config()


const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, err => {
        if (err) throw err;
        console.log('Connect to MongoDB')
    })
}

module.exports = connectDatabase