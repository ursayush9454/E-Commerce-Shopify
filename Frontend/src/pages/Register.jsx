
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    // Check password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful!");

      // Go to login page
      navigate("/login");

    } catch (error) {
      console.error("Register Error:", error);

      alert(
        "Unable to connect with server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}
      <div className="register-left">

        <div className="register-brand">
          SHOPIFY
        </div>

        <div className="register-content">
          <span className="register-eyebrow">
            JOIN THE COLLECTION
          </span>

          <h1>
            Create your
            <br />
            <em>account.</em>
          </h1>

          <p>
            Discover a curated collection of
            timeless pieces designed for your
            everyday style.
          </p>
        </div>

        <div className="register-footer">
          © 2026 SHOPIFY. All rights reserved.
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="register-right">

        <div className="register-form-wrapper">

          <div className="mobile-register-brand">
            SHOPIFY
          </div>

          <div className="register-heading">

            <span>GET STARTED</span>

            <h2>
              Create an account
            </h2>

            <p>
              Fill in your details to get started.
            </p>

          </div>


          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div className="register-input-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>


            {/* EMAIL */}
            <div className="register-input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>


            {/* PASSWORD */}
            <div className="register-input-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                minLength="6"
                required
              />

            </div>


            {/* CONFIRM PASSWORD */}
            <div className="register-input-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                minLength="6"
                required
              />

            </div>


            {/* TERMS */}
            <div className="register-terms">

              <input
                type="checkbox"
                id="terms"
                required
              />

              <label htmlFor="terms">
                I agree to the terms and conditions
              </label>

            </div>


            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>


          {/* LOGIN LINK */}
          <div className="register-login">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;

