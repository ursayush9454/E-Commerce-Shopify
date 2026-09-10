const express = require("express");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const authMiddleWare = require("../middileware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleWare,
  addToWishlist
);

router.get(
  "/",
  authMiddleWare,
  getWishlist
);

router.delete(
  "/:productId",
  authMiddleWare,
  removeFromWishlist
);

module.exports = router;