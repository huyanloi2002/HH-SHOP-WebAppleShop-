const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (!token) {
            return res.status(400).json({
                success: true,
                msg: 'Login first to access this resource.'
            })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await User.findById(decoded.id);

        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

//User
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                msg: `Role (${req.user.role}) is not allowed to access this resource`
            })
        }
        next()
    }
}
