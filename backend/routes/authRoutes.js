const express = require("express");

const {
  registerUser,
  loginUser,
  resetPassword,
} = require("../controllers/authController");

const authMiddleware = require("../middileware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/reset-password", resetPassword);

// Protected Profile Route
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Profile accessed successfully",
    user: req.user,
  });
});

module.exports = router;