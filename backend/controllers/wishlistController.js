const Wishlist = require("../models/Wishlist");

// ================= ADD TO WISHLIST =================

// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const { productId } = req.body;

//     if (!productId) {
//       return res.status(400).json({
//         message: "Product ID is required",
//       });
//     }

//     const alreadyExists = await Wishlist.findOne({
//       user: userId,
//       product: productId,
//     });

//     if (alreadyExists) {
//       return res.status(400).json({
//         message: "Product already in wishlist",
//       });
//     }

//     const wishlist = await Wishlist.create({
//       user: userId,
//       product: productId,
//     });

//     res.status(201).json({
//       message: "Product added to wishlist",
//       wishlist,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to add product to wishlist",
//       error: error.message,
//     });
//   }
// };
const addToWishlist = async (req, res) => {
  try {
    console.log("========== WISHLIST ==========");
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);

    const userId = req.user.userId;
    const { productId } = req.body;

    console.log("USER ID:", userId);
    console.log("PRODUCT ID:", productId);

    if (!userId) {
      return res.status(401).json({
        message: "User ID missing from token",
      });
    }

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const alreadyExists = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: userId,
      product: productId,
    });

    console.log("WISHLIST CREATED:", wishlist);

    res.status(201).json({
      message: "Product added to wishlist",
      wishlist,
    });

  } catch (error) {
    console.log("🔥 WISHLIST ERROR:", error);

    res.status(500).json({
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
};

// ================= GET WISHLIST =================

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    const wishlist = await Wishlist.find({
      user: userId,
    }).populate("product");

    res.status(200).json({
      message: "Wishlist fetched successfully",
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};


// ================= REMOVE FROM WISHLIST =================

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const deleted = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found in wishlist",
      });
    }

    res.status(200).json({
      message: "Product removed from wishlist",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product from wishlist",
      error: error.message,
    });
  }
};


module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};