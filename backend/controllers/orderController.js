const Order = require("../models/Order");
const Cart = require("../models/Cart");


// =========================
// Place Order
// =========================
const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.userId
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // Create order items
        const orderItems = cart.items.map((item) => ({
            Product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        // Calculate total
        const totalAmount = orderItems.reduce(
            (total, item) => {
                return total + item.price * item.quantity;
            },
            0
        );

        // Create order
        const order = await Order.create({
            user: req.user.userId,
            items: orderItems,
            totalAmount
        });

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Placing Order",
            error: error.message
        });
    }
};


// =========================
// Get My Orders
// =========================
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.userId
        })
        .populate("items.Product")
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Orders Fetched Successfully",
            orders
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Orders",
            error: error.message
        });
    }
};


// =========================
// Get Single Order
// =========================
const getSingleOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.userId
        }).populate("items.Product");

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        res.status(200).json({
            message: "Order Fetched Successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Order",
            error: error.message
        });
    }
};


// =========================
// Cancel Order
// =========================
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.userId
        });

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        if (order.status === "Delivered") {
            return res.status(400).json({
                message: "Delivered order cannot be cancelled"
            });
        }

        if (order.status === "Cancelled") {
            return res.status(400).json({
                message: "Order is already cancelled"
            });
        }

        order.status = "Cancelled";

        await order.save();

        res.status(200).json({
            message: "Order Cancelled Successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Cancelling Order",
            error: error.message
        });
    }
};


module.exports = {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    cancelOrder
};