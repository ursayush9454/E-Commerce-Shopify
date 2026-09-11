import React, { useEffect, useState } from "react";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [search, setSearch] = useState("");

  // =========================
  // CART COUNT
  // =========================

  const [cartCount, setCartCount] = useState(0);

  // =========================
  // FETCH CART COUNT
  // =========================

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");

    // User login nahi hai
    if (!token) {
      setCartCount(0);
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

      console.log("Navbar Cart Response:", data);

      // Token expired / invalid
      if (response.status === 401) {
        setCartCount(0);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return;
      }

      // Cart empty
      if (!response.ok) {
        setCartCount(0);
        return;
      }

      const items = data.cart?.items || [];

      // Total quantity calculate
      const totalQuantity = items.reduce(
        (total, item) =>
          total + Number(item.quantity || 0),
        0
      );

      setCartCount(totalQuantity);

    } catch (error) {
      console.error(
        "Navbar Cart Count Error:",
        error
      );

      setCartCount(0);
    }
  };

  // =========================
  // INITIAL CART COUNT
  // =========================

  useEffect(() => {
    fetchCartCount();
  }, []);

  // =========================
  // REFRESH CART COUNT
  // =========================

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
    };
  }, []);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/");
      return;
    }

    navigate(
      `/?search=${encodeURIComponent(value)}#products`
    );

    setSearchOpen(true);
  };

  // =========================
  // CLEAR SEARCH
  // =========================

  const clearSearch = () => {
    setSearch("");
    navigate("/");
  };

  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    navigate("/wishlist");
  };

  // =========================
  // PROFILE / ACCOUNT
  // =========================

  const handleProfile = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/profile");
  };

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setCollectionOpen(false);
  };

  // =========================
  // ESCAPE KEY SEARCH
  // =========================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="logo"
          onClick={closeMobileMenu}
        >
          <span>SHOPIFY</span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}

        <div className="nav-menu">

          {/* SHOP */}

          <Link
            to="/"
            className="nav-link nav-link-active"
          >
            Shop
          </Link>

          {/* ================= COLLECTIONS ================= */}

          <div
            className="collection-dropdown"
            onMouseEnter={() =>
              setCollectionOpen(true)
            }
            onMouseLeave={() =>
              setCollectionOpen(false)
            }
          >

            <button
              className="nav-link collection-button"
              onClick={() =>
                setCollectionOpen(!collectionOpen)
              }
            >
              Collections

              <ChevronDown
                size={14}
                className={
                  collectionOpen
                    ? "rotate-arrow"
                    : ""
                }
              />
            </button>

            {collectionOpen && (
              <div className="collection-menu">

                <div className="collection-heading">
                  <span>
                    SHOP COLLECTIONS
                  </span>
                </div>

                <Link
                  to="/"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  All Products
                </Link>

                <Link
                  to="/?category=Men#products"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  Men
                </Link>

                <Link
                  to="/?category=Women#products"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  Women
                </Link>

                <Link
                  to="/?category=Shoes#products"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  Shoes
                </Link>

                <Link
                  to="/?category=Clothing#products"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  Clothing
                </Link>

                <Link
                  to="/?category=Accessories#products"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  Accessories
                </Link>

                <div className="collection-divider"></div>

                <Link
                  to="/?collection=new#products"
                  className="special-collection"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  New Arrivals
                </Link>

                <Link
                  to="/?collection=best#products"
                  className="special-collection"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  Best Sellers
                </Link>

                <Link
                  to="/?collection=sale#products"
                  className="sale-collection"
                  onClick={() =>
                    setCollectionOpen(false)
                  }
                >
                  Sale
                </Link>

              </div>
            )}

          </div>

          {/* ABOUT */}

          <Link
            to="/about"
            className="nav-link"
          >
            About
          </Link>

          {/* CONTACT */}

          <Link
            to="/contact"
            className="nav-link"
          >
            Contact
          </Link>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="nav-actions">

          {/* ================= SEARCH ================= */}

          <form
            className={`search-box ${
              searchOpen ? "open" : ""
            }`}
            onSubmit={handleSearch}
          >

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onFocus={() =>
                setSearchOpen(true)
              }
              placeholder="Search products..."
              aria-label="Search products"
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={clearSearch}
              >
                <X size={14} />
              </button>
            )}

            <button
              type="submit"
              className="icon-btn search-icon"
              aria-label="Search"
            >
              <Search
                size={19}
                strokeWidth={1.8}
              />
            </button>

          </form>

          {/* ================= WISHLIST ================= */}

          <button
            className="icon-btn wishlist-nav-btn desktop-icon"
            onClick={handleWishlist}
            aria-label="Wishlist"
          >
            <Heart
              size={20}
              strokeWidth={1.8}
            />
          </button>

          {/* ================= USER / PROFILE ================= */}

          <button
            className="icon-btn desktop-icon user-nav-btn"
            onClick={handleProfile}
            aria-label="Account"
          >
            <User
              size={20}
              strokeWidth={1.8}
            />
          </button>

          {/* ================= CART ================= */}

          <Link
            to="/cart"
            className="cart-btn"
            aria-label="Cart"
          >
            <ShoppingBag
              size={21}
              strokeWidth={1.8}
            />

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

          {/* ================= MOBILE MENU ================= */}

          <button
            className="mobile-menu-btn"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            aria-label="Menu"
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (
        <div className="mobile-menu">

          {/* SHOP */}

          <Link
            to="/"
            onClick={closeMobileMenu}
          >
            Shop
          </Link>

          {/* COLLECTIONS */}

          <div className="mobile-collections">

            <button
              className="mobile-collection-title"
              onClick={() =>
                setCollectionOpen(
                  !collectionOpen
                )
              }
            >

              <span>
                Collections
              </span>

              <ChevronDown
                size={17}
                className={
                  collectionOpen
                    ? "rotate-arrow"
                    : ""
                }
              />

            </button>

            {collectionOpen && (
              <div className="mobile-collection-list">

                <Link
                  to="/"
                  onClick={closeMobileMenu}
                >
                  All Products
                </Link>

                <Link
                  to="/?category=Men#products"
                  onClick={closeMobileMenu}
                >
                  Men
                </Link>

                <Link
                  to="/?category=Women#products"
                  onClick={closeMobileMenu}
                >
                  Women
                </Link>

                <Link
                  to="/?category=Shoes#products"
                  onClick={closeMobileMenu}
                >
                  Shoes
                </Link>

                <Link
                  to="/?category=Clothing#products"
                  onClick={closeMobileMenu}
                >
                  Clothing
                </Link>

                <Link
                  to="/?category=Accessories#products"
                  onClick={closeMobileMenu}
                >
                  Accessories
                </Link>

                <Link
                  to="/?collection=new#products"
                  onClick={closeMobileMenu}
                >
                  New Arrivals
                </Link>

                <Link
                  to="/?collection=best#products"
                  onClick={closeMobileMenu}
                >
                  Best Sellers
                </Link>

                <Link
                  to="/?collection=sale#products"
                  className="mobile-sale"
                  onClick={closeMobileMenu}
                >
                  Sale
                </Link>

              </div>
            )}

          </div>

          {/* ABOUT */}

          <Link
            to="/about"
            onClick={closeMobileMenu}
          >
            About
          </Link>

          {/* CONTACT */}

          <Link
            to="/contact"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          {/* ================= MOBILE EXTRA ================= */}

          <div className="mobile-extra">

            {/* WISHLIST */}

            <button
              onClick={() => {
                closeMobileMenu();
                handleWishlist();
              }}
            >
              <Heart size={19} />
              Wishlist
            </button>

            {/* ACCOUNT / PROFILE */}

            <button
              onClick={() => {
                closeMobileMenu();
                handleProfile();
              }}
            >
              <User size={19} />
              Account
            </button>

            {/* CART */}

            <Link
              to="/cart"
              onClick={closeMobileMenu}
            >
              <ShoppingBag size={19} />
              Cart
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;