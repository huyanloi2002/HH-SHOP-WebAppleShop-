const Product = require('../models/productModel')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
//CREATE PRODUCT
exports.newProduct = async (req, res, next) => {
    try {
        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
        req.body.user = req.user.id
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//GET ALL PRODUCT BY FILTER AND SEARCH
exports.getProducts = async (req, res, next) => {
    try {
        const resPerPage = 6;
        const productCount = await Product.countDocuments();

        const apiFeatures = new APIFeatures(Product.find(), req.query)
            .search()
            .filter()

        let products = await apiFeatures.query;
        let filterProductsCount = products.length;
        apiFeatures.pagination(resPerPage)

        const product = await apiFeatures.query


        res.status(200).json({
            success: true,
            count: product.length,
            productCount,
            product,
            filterProductsCount,
            resPerPage
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//GET ALL PRODUCT BY FILTER AND SEARCH
exports.getAdminProducts = async (req, res, next) => {
    try {
        const products = await Product.find()

        res.status(200).json({
            success: true,
            products
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//GET SINGLE PRODUCT
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(400).json({
                successL: false,
                msg: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//UPDATE A PRODUCT
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(400).json({
                successL: false,
                msg: 'Product not found'
            })
        }



        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        if (images !== undefined) {

            // Deleting images associated with the product
            for (let i = 0; i < product.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            }

            let imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'products'
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }

            req.body.images = imagesLinks

        }



        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            product
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//DELETE A PRODUCT
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({
                successL: false,
                msg: 'Product not found'
            })
        }

        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        await product.remove();
        res.status(200).json({
            success: true,
            msg: 'Product is deleted successfully'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//REVIEW
//Create and update
exports.createProductReview = async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await Product.findById(productId)

        const isReviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        )
        if (isReviewed) {
            product.reviews.forEach(review => {
                if (review.user.toString() === req.user._id.toString()) {
                    review.comment = comment;
                    review.rating = rating
                }
            });
        } else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }
        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save({ validateBeforeSave: false })
        res.status(200).json({
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Get product review
exports.getProductReviews = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.id);

        res.status(200).json({
            success: true,
            reviews: product.reviews
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Get delete review
exports.deleteReview = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.productId);

        const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

        const numOfReviews = reviews.length;

        const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
