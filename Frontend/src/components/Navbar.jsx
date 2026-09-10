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
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(value)}#products`);
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

    // Wishlist page
    navigate("/wishlist");
  };

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setCollectionOpen(false);
  };

  // =========================
  // ENTER KEY SEARCH
  // =========================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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

          <Link
            to="/"
            className="nav-link nav-link-active"
          >
            Shop
          </Link>


          {/* Collections */}

          <div
            className="collection-dropdown"
            onMouseEnter={() => setCollectionOpen(true)}
            onMouseLeave={() => setCollectionOpen(false)}
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
                  <span>SHOP COLLECTIONS</span>
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


          <Link
            to="/about"
            className="nav-link"
          >
            About
          </Link>


          <Link
            to="/contact"
            className="nav-link"
          >
            Contact
          </Link>

        </div>


        {/* ================= ACTIONS ================= */}

        <div className="nav-actions">


          {/* SEARCH */}

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
              onFocus={() => setSearchOpen(true)}
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


          {/* WISHLIST */}

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


          {/* USER */}

          <Link
            to="/login"
            className="icon-btn desktop-icon user-nav-btn"
            aria-label="Account"
          >
            <User
              size={20}
              strokeWidth={1.8}
            />
          </Link>


          {/* CART */}

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
              0
            </span>

          </Link>


          {/* MOBILE MENU */}

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

          <Link
            to="/"
            onClick={closeMobileMenu}
          >
            Shop
          </Link>


          <div className="mobile-collections">

            <button
              className="mobile-collection-title"
              onClick={() =>
                setCollectionOpen(!collectionOpen)
              }
            >

              <span>Collections</span>

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


          <Link
            to="/about"
            onClick={closeMobileMenu}
          >
            About
          </Link>


          <Link
            to="/contact"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>


          <div className="mobile-extra">

            <button onClick={handleWishlist}>
              <Heart size={19} />
              Wishlist
            </button>

            <Link
              to="/login"
              onClick={closeMobileMenu}
            >
              <User size={19} />
              Account
            </Link>

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