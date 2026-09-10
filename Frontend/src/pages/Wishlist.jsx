import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ================= FETCH WISHLIST =================

  const fetchWishlist = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Wishlist Response:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch wishlist"
        );
      }

      setWishlist(data.wishlist || []);

    } catch (error) {
      console.error("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ================= REMOVE =================

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Remove Wishlist:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Unable to remove product");
        return;
      }

      // UI se instantly remove
      setWishlist((prev) =>
        prev.filter(
          (item) => item.product?._id !== productId
        )
      );

    } catch (error) {
      console.error("Remove Wishlist Error:", error);

      alert("Unable to connect with server.");
    }
  };

  // ================= ADD TO CART =================

  const addToCart = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      console.log("Add Cart:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Unable to add to cart");
        return;
      }

      alert("Product added to cart successfully!");

    } catch (error) {
      console.error("Cart Error:", error);

      alert("Unable to connect with server.");
    }
  };

  // ================= NOT LOGIN =================

  if (!token) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-login">

          <Heart size={45} strokeWidth={1.3} />

          <h2>Login to view your wishlist</h2>

          <p>
            Save your favorite products and access them
            anytime.
          </p>

          <button onClick={() => navigate("/login")}>
            Login
            <ArrowRight size={17} />
          </button>

        </div>
      </div>
    );
  }

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="wishlist-page">

        <div className="wishlist-loading">
          <div className="wishlist-loader"></div>
          <p>Loading wishlist...</p>
        </div>

      </div>
    );
  }

  // ================= EMPTY =================

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">

        <div className="wishlist-empty">

          <div className="empty-heart">
            <Heart size={42} strokeWidth={1.2} />
          </div>

          <p className="wishlist-label">
            YOUR WISHLIST
          </p>

          <h1>Your wishlist is empty</h1>

          <p>
            Save products you love and come back to them
            whenever you want.
          </p>

          <button
            onClick={() => navigate("/")}
            className="continue-shopping"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </button>

        </div>

      </div>
    );
  }

  // ================= MAIN =================

  return (
    <div className="wishlist-page">

      <div className="wishlist-container">

        {/* HEADER */}

        <div className="wishlist-header">

          <div>
            <p className="wishlist-label">
              YOUR COLLECTION
            </p>

            <h1>My Wishlist</h1>

            <p>
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "product"
                : "products"}{" "}
              saved
            </p>
          </div>

          <button
            className="wishlist-shop-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
            <ArrowRight size={17} />
          </button>

        </div>


        {/* PRODUCTS */}

        <div className="wishlist-grid">

          {wishlist.map((item) => {

            const product = item.product;

            if (!product) return null;

            return (
              <div
                className="wishlist-card"
                key={item._id}
              >

                {/* IMAGE */}

                <div
                  className="wishlist-image"
                  onClick={() =>
                    navigate(
                      `/product/${product._id}`,
                      {
                        state: { product },
                      }
                    )
                  }
                >

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <button
                    className="remove-wishlist"
                    onClick={(e) => {
                      e.stopPropagation();

                      removeFromWishlist(
                        product._id
                      );
                    }}
                    title="Remove from wishlist"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>


                {/* INFO */}

                <div className="wishlist-info">

                  <p className="wishlist-category">
                    {product.category}
                  </p>

                  <h2
                    onClick={() =>
                      navigate(
                        `/product/${product._id}`,
                        {
                          state: { product },
                        }
                      )
                    }
                  >
                    {product.name}
                  </h2>

                  <p className="wishlist-description">
                    {product.description}
                  </p>

                  <div className="wishlist-bottom">

                    <strong>
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <button
                      className="wishlist-cart-btn"
                      onClick={() =>
                        addToCart(product._id)
                      }
                    >
                      <ShoppingBag size={17} />

                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default Wishlist;