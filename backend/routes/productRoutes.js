const express = require("express");

const {
    createProduct,
    getProducts,
    GetproductbyId,
    UpdateProduct,
    DeleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middileware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createProduct);

router.get("/", getProducts);
router.get("/:id", GetproductbyId);
router.put("/:id", authMiddleware, UpdateProduct);
router.delete("/:id", authMiddleware, DeleteProduct);

module.exports = router;