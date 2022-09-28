const express = require('express');
const router = express.Router();

const { registerUser,
    loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateUserProfile,
    getAllUsers, getUserDetail, updateUser, deleteUser
} = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

//security
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)
//profile
router.route('/profile').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/profile/update').put(isAuthenticatedUser, updateUserProfile)
//admin user
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetail)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)


module.exports = router