const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')


const { getProducts,
    newProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews, deleteReview, getAdminProducts } = require('../controllers/productController')

router.route('/products').get(getProducts)
router.route('/admin/products').get(getAdminProducts)
router.route('/product/:id').get(getProductById)

router.route('/admin/new/product').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/review').delete(isAuthenticatedUser, deleteReview)




module.exports = router