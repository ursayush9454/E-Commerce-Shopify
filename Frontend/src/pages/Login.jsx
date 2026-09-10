
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful!");

      // Go to home page
      navigate("/");

    } catch (error) {
      console.error("Login Error:", error);

      alert(
        "Unable to connect with server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="login-brand">
          SHOPIFY
        </div>

        <div className="login-content">

          <span className="login-eyebrow">
            WELCOME BACK
          </span>

          <h1>
            Good to
            <br />
            <em>see you.</em>
          </h1>

          <p>
            Sign in to continue your journey
            and discover our curated collection
            of timeless pieces.
          </p>

        </div>

        <div className="login-footer">
          © 2026 SHOPIFY. All rights reserved.
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-form-wrapper">

          {/* MOBILE LOGO */}
          <div className="mobile-login-brand">
            SHOPIFY
          </div>


          {/* HEADING */}
          <div className="login-heading">

            <span>WELCOME BACK</span>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Enter your details to continue.
            </p>

          </div>


          {/* FORM */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="login-input-group">

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
            <div className="login-input-group">

              <div className="login-password-label">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>


              <div className="login-password-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "HIDE"
                    : "SHOW"}
                </button>

              </div>

            </div>


            {/* REMEMBER */}
            <div className="login-options">

              <label>
                <input type="checkbox" />

                <span>
                  Remember me
                </span>
              </label>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>


          {/* REGISTER */}
          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;

