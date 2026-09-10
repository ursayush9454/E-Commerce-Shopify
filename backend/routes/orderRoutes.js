const express = require("express");

const {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    cancelOrder
} = require("../controllers/orderController")

const authMiddleWare = require("../middileware/authMiddleware");

const router = express.Router();


// Place order
router.post("/place", authMiddleWare, placeOrder);

// Get all my orders
router.get("/my-orders", authMiddleWare, getMyOrders);

// Get single order
router.get("/:orderId", authMiddleWare, getSingleOrder);

// Cancel order
router.put("/cancel/:orderId", authMiddleWare, cancelOrder);


module.exports = router;