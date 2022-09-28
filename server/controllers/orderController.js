const Order = require('../models/orderModel')
const Product = require('../models/productModel')


//Create a new order
exports.newOrder = async (req, res, next) => {

    try {
        const {
            orderItems,
            shippingInfo,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body

        orderItems.forEach(async item => {
            await updateStock(item.product, item.quantity)
        })
        const order = await Order.create({
            orderItems,
            shippingInfo,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        })
        res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Get single order
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')

        if (!order) {
            return res.status(400).json({
                success: false,
                msg: 'No Order found with this ID'
            })
        }
        res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Get my order
exports.getMyOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json({
            success: true,
            orders
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

//ADMIN

//Get all order by admin
exports.getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find()
        let totalAmount = 0;
        orders.forEach(order => {
            if (order.orderStatus === "Đã giao hàng") {
                totalAmount += order.totalPrice

            }
        })
        res.status(200).json({
            success: true,
            totalAmount,
            orders
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
//Update /Process order
exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order.orderStatus === "Đã giao hàng") {
            return res.status(400).json({
                success: false,
                msg: 'You have already delivered this order'
            })
        }
        order.orderItems.forEach(async item => {
            await updateStock(item.product, item.quantity)
        })

        order.orderStatus = req.body.status;
        order.deliveredAt = Date.now()

        await order.save()

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
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity
    product.sold = product.sold + quantity

    await product.save({ validateBeforeSave: false })
}

//Delete order
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(400).json({
                success: false,
                msg: 'No order found with this ID'
            })
        }

        await order.remove()
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