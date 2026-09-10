const Cart = require("../models/Cart");
const Product = require("../models/Product");

// =========================
// Add Product To Cart
// =========================
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        const addQuantity = quantity || 1;

        if (addQuantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        let cart = await Cart.findOne({
            user: req.user.userId
        });

        // Cart doesn't exist
        if (!cart) {
            cart = await Cart.create({
                user: req.user.userId,
                items: [
                    {
                        product: productId,
                        quantity: addQuantity
                    }
                ]
            });

            return res.status(201).json({
                message: "Product Added To Cart",
                cart
            });
        }

        // Check existing product
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += addQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: addQuantity
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Product Added To Cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Adding Product To The Cart",
            error: error.message
        });
    }
};


// =========================
// Get User Cart
// =========================
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.userId
        }).populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart is empty"
            });
        }

        res.status(200).json({
            message: "Cart Fetched Successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Cart",
            error: error.message
        });
    }
};


// =========================
// Update Cart Quantity
// =========================
const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity are required"
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({
            user: req.user.userId
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product Not Found In Cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            message: "Cart Updated Successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Updating Cart",
            error: error.message
        });
    }
};


// =========================
// Remove Product From Cart
// =========================
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user.userId
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }

        const itemExists = cart.items.some(
            item => item.product.toString() === productId
        );

        if (!itemExists) {
            return res.status(404).json({
                message: "Product Not Found In Cart"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            message: "Product Removed From Cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Removing Product From Cart",
            error: error.message
        });
    }
};


// =========================
// Clear Cart
// =========================
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.userId
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            message: "Cart Cleared Successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Clearing Cart",
            error: error.message
        });
    }
};


module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
};