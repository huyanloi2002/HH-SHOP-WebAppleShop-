const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
require("dotenv").config()


// Register 
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const emailOld = await User.findOne({ email })
        //Kiểm tra điều kiện
        if (emailOld) {
            return res.status(400).json({
                success: false,
                msg: "The email already exists."
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                msg: "Password is at least 6 characters long.",
            })
        }
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatar',
            width: 150,
            crop: "scale"
        })
        const passwordHash = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: passwordHash,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })

        sendToken(user, 200, res)
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }

}
//Login
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: 'Please enter your email address or password'
            })
        }
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid email or password'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect password."
            })
        }
        sendToken(user, 200, res)

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }

}
//Forgot password
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'User not found with this email'
            })
        }
        //Get reset token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        //Create reset password url
        const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

        const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not request this email,
        then ignore it`
        try {
            await sendEmail({
                email: user.email,
                subject: '2TECH-Shop Recovery',
                message
            })
            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`
            })
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false })

            return res.status(500).json({
                success: false,
                msg: err.message
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Reset password
exports.resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'Password reset token is invalid or has been expired'
            })
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: 'Password does not match'
            })
        }
        const passwordHash = await bcrypt.hash(req.body.password, 10)

        // Setup new password
        user.password = passwordHash;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res)

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Logout
exports.logoutUser = async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(200).json({
            success: true,
            msg: 'Logged out'
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Get user details when currently logged
exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Update password
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password')
        //Check old password is correct
        const isMatched = await bcrypt.compare(req.body.oldPassword, user.password)
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                msg: 'Old password is incorrect'
            })
        }
        //When check succes is hash password
        const passwordHash = await bcrypt.hash(req.body.password, 10)

        user.password = passwordHash
        await user.save();

        sendToken(user, 200, res)

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Update user profile
exports.updateUserProfile = async (req, res, next) => {

    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        }
        if (req.body.avatar !== '') {
            const users = await User.findById(req.user.id)


            const image_id = users.avatar.public_id;
            const res = await cloudinary.v2.uploader.destroy(image_id)

            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'avatar',
                width: 150,
                crop: "scale"
            })

            newUserData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

//ADMIN

//Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({
            success: true,
            count: users.length,
            users
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Get user detail
exports.getUserDetail = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: `User not found with id: ${req.params.id}`
            })
        }
        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Update user
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: `User not found with id: ${req.params.id}`
            })
        }
        await user.remove()
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