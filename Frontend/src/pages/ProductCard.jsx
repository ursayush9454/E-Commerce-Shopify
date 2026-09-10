import React, { useState } from "react";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // VIEW PRODUCT DETAILS
  // =========================

  const viewDetails = () => {
    navigate(`/product/${product._id}`, {
      state: {
        product: product,
      },
    });
  };

  // =========================
  // ADD TO WISHLIST
  // =========================

  const toggleWishlist = () => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist) {
      const alreadyExists = savedWishlist.some(
        (item) => item._id === product._id
      );

      if (!alreadyExists) {
        savedWishlist.push(product);
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify(savedWishlist)
      );

      setWishlist(true);
    } else {
      const updatedWishlist = savedWishlist.filter(
        (item) => item._id !== product._id
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      setWishlist(false);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (product.stock <= 0) {
      alert("Product is out of stock");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/cart",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      console.log("Add To Cart:", data);

      // =========================
      // INVALID TOKEN
      // =========================

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired. Please login again.");

        navigate("/login");
        return;
      }

      // =========================
      // ERROR
      // =========================

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to add product to cart"
        );
        return;
      }

      alert("Product added to cart successfully!");

    } catch (error) {
      console.error("Cart Error:", error);

      alert(
        "Unable to connect with server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">

      {/* ================= IMAGE ================= */}

      <div
        className="product-card-image"
        onClick={viewDetails}
      >

        <img
          src={product.image}
          alt={product.name}
        />

        {/* Category */}

        <span className="product-category">
          {product.category}
        </span>

        {/* Wishlist */}

        <button
          className={`wishlist-btn ${
            wishlist ? "wishlist-active" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            fill={wishlist ? "currentColor" : "none"}
          />
        </button>

        {/* Out of stock */}

        {product.stock <= 0 && (
          <div className="out-stock-overlay">
            Out of Stock
          </div>
        )}

        {/* Quick View */}

        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            viewDetails();
          }}
        >
          Quick view
          <ArrowUpRight size={15} />
        </button>

      </div>


      {/* ================= INFO ================= */}

      <div className="product-card-info">

        <div className="product-card-top">

          <div>

            <p className="product-card-category">
              {product.category}
            </p>

            <h3
              onClick={viewDetails}
              className="product-card-title"
            >
              {product.name}
            </h3>

          </div>

        </div>


        {/* Price */}

        <div className="product-card-bottom">

          <div>

            <p className="product-card-price">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            {product.stock > 0 && (
              <p className="product-stock">
                {product.stock} available
              </p>
            )}

          </div>


          {/* Add Cart */}

          <button
            className="card-cart-btn"
            onClick={addToCart}
            disabled={
              product.stock <= 0 || loading
            }
          >

            <ShoppingBag size={16} />

            <span>
              {loading
                ? "Adding..."
                : product.stock <= 0
                ? "Sold Out"
                : "Add to Cart"}
            </span>

          </button>

        </div>


        {/* Details */}

        <button
          className="details-btn"
          onClick={viewDetails}
        >
          View details
          <ArrowUpRight size={15} />
        </button>

      </div>

    </div>
  );
};

export default ProductCard;