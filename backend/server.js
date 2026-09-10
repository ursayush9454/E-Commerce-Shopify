const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes=require("./routes/productRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const cartRoutes = require("./routes/cartRoutes")

const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes=require("./routes/WishlistRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/orders",orderRoutes);
app.use("/api/wishlist", wishlistRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend API is Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});