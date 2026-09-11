import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Get Cart From Backend
  // =========================
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Cart Response:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        setCartItems([]);
        return;
      }

      setCartItems(data.cart?.items || []);
    } catch (error) {
      console.error("Fetch Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load Cart
  // =========================
  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // Update Quantity
  // =========================
  const updateQuantity = async (productId, change) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const currentItem = cartItems.find(
      (item) => item.product?._id === productId
    );

    if (!currentItem) {
      console.log("Cart item not found");
      return;
    }

    const currentQuantity = Number(currentItem.quantity);

    const newQuantity = currentQuantity + change;

    console.log("Current Quantity:", currentQuantity);
    console.log("New Quantity:", newQuantity);

    // =========================
    // Quantity 1 se 0 hone par
    // Product remove hoga
    // =========================
    if (newQuantity < 1) {
      await removeItem(productId);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            quantity: newQuantity,
          }),
        }
      );

      const data = await response.json();

      console.log("Update Cart Response:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Unable to update cart");
        return;
      }

      // Updated cart set karo
      setCartItems(data.cart?.items || []);
    } catch (error) {
      console.error("Update Cart Error:", error);
    }
  };

  // =========================
  // Remove Item
  // =========================
  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Remove Cart Response:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Unable to remove item");
        return;
      }

      setCartItems(data.cart?.items || []);
    } catch (error) {
      console.error("Remove Cart Error:", error);
    }
  };

  // =========================
  // Clear Cart
  // =========================
  const clearCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Clear Cart Response:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Unable to clear cart");
        return;
      }

      setCartItems([]);
    } catch (error) {
      console.error("Clear Cart Error:", error);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h1>Loading cart...</h1>
        </div>
      </div>
    );
  }

  // =========================
  // Not Logged In
  // =========================
  if (!localStorage.getItem("token")) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            🔐
          </div>

          <span>SHOPIFY</span>

          <h1>Please login first</h1>

          <p>
            Login to view your shopping cart.
          </p>

          <Link
            to="/login"
            className="shop-button"
          >
            LOGIN
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // Empty Cart
  // =========================
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            🛒
          </div>

          <span>YOUR SHOPPING BAG</span>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <Link
            to="/"
            className="shop-button"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // Calculate Total
  // =========================
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      (item.product?.price || 0) *
        (item.quantity || 1),
    0
  );

  const shipping = subtotal > 0 ? 99 : 0;

  const total = subtotal + shipping;

  // =========================
  // UI
  // =========================
  return (
    <div className="cart-page">

      <div className="cart-wrapper">

        {/* HEADER */}
        <div className="cart-header">

          <div>

            <span>SHOPIFY</span>

            <h1>
              Your Shopping Bag
            </h1>

          </div>

          <p>
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? "Item"
              : "Items"}
          </p>

        </div>

        {/* CONTENT */}
        <div className="cart-content">

          {/* ITEMS */}
          <div className="cart-items">

            {cartItems.map((item) => {

              const product = item.product;

              return (
                <div
                  className="cart-item"
                  key={product?._id}
                >

                  {/* IMAGE */}
                  <div className="cart-product-image">

                    <img
                      src={product?.image}
                      alt={product?.name}
                    />

                  </div>

                  {/* INFO */}
                  <div className="cart-product-info">

                    <span className="product-category">
                      {product?.category}
                    </span>

                    <h2>
                      {product?.name}
                    </h2>

                    <p className="product-price">
                      ₹
                      {(product?.price || 0).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* ACTIONS */}
                    <div className="item-actions">

                      <div className="quantity-box">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              product?._id,
                              -1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              product?._id,
                              1
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        className="remove-button"
                        onClick={() =>
                          removeItem(
                            product?._id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                  {/* ITEM TOTAL */}
                  <div className="item-total">

                    ₹
                    {(
                      (product?.price || 0) *
                      item.quantity
                    ).toLocaleString("en-IN")}

                  </div>

                </div>
              );
            })}

            {/* CONTINUE */}
            <Link
              to="/"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

            {/* CLEAR CART */}
            <button
              type="button"
              className="remove-button"
              onClick={clearCart}
              style={{
                marginTop: "15px",
              }}
            >
              Clear Cart
            </button>

          </div>

          {/* SUMMARY */}
          <div className="cart-summary">

            <div className="summary-card">

              <span className="summary-label">
                ORDER SUMMARY
              </span>

              <h2>
                Cart Total
              </h2>

              {/* SUBTOTAL */}
              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {/* SHIPPING */}
              <div className="summary-row">

                <span>
                  Shipping
                </span>

                <span>
                  ₹
                  {shipping.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="summary-line"></div>

              {/* TOTAL */}
              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              {/* CHECKOUT */}
              <Link
                to="/checkout"
                className="checkout-button"
              >
                PROCEED TO CHECKOUT

                <span>
                  →
                </span>

              </Link>

              <div className="secure-payment">

                <span>
                  🔒
                </span>

                Secure & encrypted checkout

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;