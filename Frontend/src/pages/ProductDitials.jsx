import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import "./ProductDitials.css";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);

  const [isWishlisted, setIsWishlisted] =
    useState(false);


  // =========================================
  // CHECK WISHLIST
  // =========================================

  const checkWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token || !product?._id) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      const exists = (data.wishlist || []).some(
        (item) =>
          item.product?._id === product._id
      );

      setIsWishlisted(exists);

    } catch (error) {
      console.error(
        "Check Wishlist Error:",
        error
      );
    }
  };


  // =========================================
  // CHECK WHEN PRODUCT LOADS
  // =========================================

  useEffect(() => {
    checkWishlist();
  }, [product?._id]);


  // =========================================
  // DECREASE QUANTITY
  // =========================================

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  // =========================================
  // INCREASE QUANTITY
  // =========================================

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };


  // =========================================
  // ADD / REMOVE WISHLIST
  // =========================================

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    // Login check
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setWishlistLoading(true);


      // =====================================
      // REMOVE
      // =====================================

      if (isWishlisted) {

        const response = await fetch(
          `http://localhost:5000/api/wishlist/${product._id}`,
          {
            method: "DELETE",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log(
          "Remove Wishlist:",
          data
        );


        if (response.status === 401) {

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          alert(
            "Session expired. Please login again."
          );

          navigate("/login");

          return;
        }


        if (!response.ok) {
          alert(
            data.message ||
              "Unable to remove from wishlist"
          );

          return;
        }


        setIsWishlisted(false);

        alert(
          "Product removed from wishlist"
        );

        return;
      }


      // =====================================
      // ADD
      // =====================================

      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId: product._id,
          }),
        }
      );


      const data = await response.json();

      console.log(
        "Add Wishlist:",
        data
      );


      if (response.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(
          "Session expired. Please login again."
        );

        navigate("/login");

        return;
      }


      if (!response.ok) {

        alert(
          data.message ||
            "Unable to add to wishlist"
        );

        return;
      }


      setIsWishlisted(true);

      alert(
        "Product added to wishlist ❤️"
      );

    } catch (error) {

      console.error(
        "Wishlist Error:",
        error
      );

      alert(
        "Unable to connect with server."
      );

    } finally {

      setWishlistLoading(false);

    }
  };


  // =========================================
  // ADD TO CART
  // =========================================

  const addToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
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
            quantity: quantity,
          }),
        }
      );


      const data = await response.json();


      console.log(
        "Add To Cart Response:",
        data
      );


      if (response.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(
          "Session expired. Please login again."
        );

        navigate("/login");

        return;
      }


      if (!response.ok) {

        alert(
          data.message ||
            "Unable to add product to cart"
        );

        return;
      }


      alert(
        "Product added to cart successfully!"
      );

    } catch (error) {

      console.error(
        "Add To Cart Error:",
        error
      );

      alert(
        "Unable to connect with server. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // BUY NOW
  // =========================================

  const buyNow = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
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
            quantity: quantity,
          }),
        }
      );


      const data = await response.json();


      console.log(
        "Buy Now Response:",
        data
      );


      if (response.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(
          "Session expired. Please login again."
        );

        navigate("/login");

        return;
      }


      if (!response.ok) {

        alert(
          data.message ||
            "Unable to proceed"
        );

        return;
      }


      navigate("/checkout");

    } catch (error) {

      console.error(
        "Buy Now Error:",
        error
      );

      alert(
        "Unable to connect with server. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // PRODUCT NOT FOUND
  // =========================================

  if (!product) {

    return (
      <div className="product-not-found">

        <h2>
          Product not found
        </h2>

        <button
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>

      </div>
    );
  }


  // =========================================
  // UI
  // =========================================

  return (
    <div className="product-details-page">

      <div className="product-details-container">


        {/* BACK BUTTON */}

        <button
          className="product-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />

          Back
        </button>


        <div className="product-details-card">


          {/* =================================
              IMAGE
          ================================= */}

          <div className="product-details-image">

            <img
              src={product.image}
              alt={product.name}
            />


            {/* WISHLIST BUTTON */}

            <button
              className={`details-wishlist-btn ${
                isWishlisted
                  ? "wishlisted"
                  : ""
              }`}
              onClick={handleWishlist}
              disabled={wishlistLoading}
              title={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >

              <Heart
                size={21}
                strokeWidth={1.7}
              />

            </button>

          </div>


          {/* =================================
              INFORMATION
          ================================= */}

          <div className="product-details-info">


            <p className="product-details-category">
              {product.category}
            </p>


            <h1 className="product-details-title">
              {product.name}
            </h1>


            <p className="product-details-description">
              {product.description}
            </p>


            <h2 className="product-details-price">
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </h2>


            <p className="product-details-stock">

              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}

            </p>


            <div className="product-details-divider"></div>


            {/* =================================
                WISHLIST TEXT BUTTON
            ================================= */}

            <button
              className={`details-wishlist-text ${
                isWishlisted
                  ? "wishlisted-text"
                  : ""
              }`}
              onClick={handleWishlist}
              disabled={wishlistLoading}
            >

              <Heart
                size={18}
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
              />

              {wishlistLoading
                ? "Updating..."
                : isWishlisted
                ? "Remove from Wishlist"
                : "Add to Wishlist"}

            </button>


            {/* =================================
                QUANTITY
            ================================= */}

            <div className="quantity-wrapper">

              <span className="quantity-label">
                Quantity
              </span>


              <div className="quantity-box">

                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                  disabled={
                    quantity <= 1
                  }
                >
                  −
                </button>


                <span>
                  {quantity}
                </span>


                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                  disabled={
                    quantity >=
                    product.stock
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* =================================
                ACTIONS
            ================================= */}

            <div className="product-actions">

              <button
                type="button"
                disabled={
                  product.stock <= 0 ||
                  loading
                }
                className="add-cart-btn"
                onClick={addToCart}
              >

                <ShoppingBag size={18} />

                {loading
                  ? "Adding..."
                  : "Add to Cart"}

              </button>


              <button
                type="button"
                disabled={
                  product.stock <= 0 ||
                  loading
                }
                className="buy-now-btn"
                onClick={buyNow}
              >

                {loading
                  ? "Processing..."
                  : "Buy Now"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;