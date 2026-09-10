import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // =========================
  // Fetch Cart
  // =========================
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/cart",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

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
      console.error("Checkout Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // Input Change
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Place Order
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await fetch(
        "http://localhost:5000/api/orders/place",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Place Order Response:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired. Please login again.");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Unable to place order");
        return;
      }

      alert("Order placed successfully! 🎉");

      // Backend already clears MongoDB cart
      navigate("/");

    } catch (error) {
      console.error("Place Order Error:", error);

      alert(
        "Unable to connect with server. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="checkout-page">
        <div className="checkout-loading">
          Loading checkout...
        </div>
      </div>
    );
  }

  // =========================
  // Empty Cart
  // =========================
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>

          <p>
            Add some products before checking out.
          </p>

          <button
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
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
        item.quantity,
    0
  );

  const shipping = 99;
  const total = subtotal + shipping;

  return (
    <div className="checkout-page">

      <div className="checkout-wrapper">

        {/* HEADER */}

        <div className="checkout-header">

          <span>SHOPIFY</span>

          <h1>
            Checkout
          </h1>

          <p>
            Complete your details to place your order.
          </p>

        </div>

        <div className="checkout-content">

          {/* =========================
              CUSTOMER FORM
          ========================= */}

          <div className="checkout-form-section">

            <h2>
              Shipping Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="checkout-form"
            >

              {/* NAME */}

              <div className="checkout-input-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="checkout-input-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>

              {/* PHONE */}

              <div className="checkout-input-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />

              </div>

              {/* ADDRESS */}

              <div className="checkout-input-group">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  required
                ></textarea>

              </div>

              {/* CITY + STATE */}

              <div className="checkout-row">

                <div className="checkout-input-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />

                </div>

                <div className="checkout-input-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />

                </div>

              </div>

              {/* PINCODE */}

              <div className="checkout-input-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6 digit pincode"
                  maxLength="6"
                  required
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="place-order-button"
                disabled={placingOrder}
              >
                {placingOrder
                  ? "PLACING ORDER..."
                  : "PLACE ORDER"}
              </button>

            </form>

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div className="checkout-summary">

            <div className="checkout-summary-card">

              <span className="summary-label">
                YOUR ORDER
              </span>

              <h2>
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="checkout-products">

                {cartItems.map((item) => (

                  <div
                    className="checkout-product"
                    key={item.product?._id}
                  >

                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                    />

                    <div className="checkout-product-info">

                      <h3>
                        {item.product?.name}
                      </h3>

                      <p>
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <strong>
                      ₹
                      {(
                        (item.product?.price || 0) *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="summary-line"></div>

              {/* SUBTOTAL */}

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {subtotal.toLocaleString("en-IN")}
                </span>

              </div>

              {/* SHIPPING */}

              <div className="summary-row">

                <span>
                  Shipping
                </span>

                <span>
                  ₹99
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
                  {total.toLocaleString("en-IN")}
                </strong>

              </div>

              <div className="secure-payment">
                🔒 Secure & encrypted checkout
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;