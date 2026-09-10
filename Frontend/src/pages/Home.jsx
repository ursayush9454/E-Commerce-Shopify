import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Search,
  Sparkles,
} from "lucide-react";

import ProductCard from "./ProductCard";

import Heroimage from "../assets/image.png";


import "./Home.css";

const API_URL = "http://localhost:5000/api/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Products fetch failed");
      }

      const data = await response.json();

      setProducts(data.products || data);
    } catch (err) {
      console.error(err);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= CATEGORIES =================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // ================= FILTER =================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.name?.toLowerCase() || "";
      const productDescription =
        product.description?.toLowerCase() || "";

      const searchValue = search.toLowerCase();

      const matchesSearch =
        productName.includes(searchValue) ||
        productDescription.includes(searchValue);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  // ================= SCROLL =================

  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home">

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <Sparkles size={14} />
            NEW SEASON · 2026
          </div>

          <h1>
            Designed for
            <br />
            <span>everyday life.</span>
          </h1>

          <p className="hero-description">
            Discover carefully selected fashion, electronics
            and everyday essentials made for comfort,
            quality and style.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={scrollToProducts}
            >
              Shop collection
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-btn"
              onClick={scrollToProducts}
            >
              Explore
            </button>

          </div>

          <div className="hero-mini-info">
            <span>✓ Premium products</span>
            <span>✓ Secure checkout</span>
          </div>

        </div>

        {/* HERO IMAGE */}

        <div className="hero-image">

          <img
            src={Heroimage}
            alt="SHOPIFY collection"
          />

          <div className="hero-floating-card">

            <span>EDITOR'S PICK</span>

            <strong>
              Everyday essentials
            </strong>

            <small>
              Fashion · Tech · Lifestyle
            </small>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="feature-item">

          <div className="feature-icon">
            <Truck size={21} />
          </div>

          <div>
            <h4>Free shipping</h4>
            <p>On orders over ₹999</p>
          </div>

        </div>


        <div className="feature-item">

          <div className="feature-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h4>Secure payment</h4>
            <p>100% secure checkout</p>
          </div>

        </div>


        <div className="feature-item">

          <div className="feature-icon">
            <RefreshCcw size={21} />
          </div>

          <div>
            <h4>Easy returns</h4>
            <p>7 days return policy</p>
          </div>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section
        className="products-section"
        id="products"
      >

        <div className="section-header">

          <div>

            <p className="section-label">
              OUR COLLECTION
            </p>

            <h2>
              Shop our products
            </h2>

            <p className="section-description">
              Discover products selected for your everyday lifestyle.
            </p>

          </div>

          <div className="product-count">
            {filteredProducts.length} Products
          </div>

        </div>


        {/* SEARCH + FILTER */}

        <div className="shop-controls">

          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>


          <div className="category-list">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => {
                  setCategory(item);
                  setShowAll(false);
                }}
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="loading-container">

            <div className="loader"></div>

            <h3>Loading collection</h3>

            <p>
              Bringing the latest products for you...
            </p>

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="error-container">

            <div className="error-icon">!</div>

            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button
              onClick={fetchProducts}
              className="retry-btn"
            >
              Try again
            </button>

          </div>

        )}


        {/* NO PRODUCTS */}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (

            <div className="empty-products">

              <Search size={35} />

              <h3>No products found</h3>

              <p>
                Try another search or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>

            </div>

          )}


        {/* PRODUCTS */}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (

            <>

              <div className="products-grid">

                {displayedProducts.map((product) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                  />

                ))}

              </div>


              {/* VIEW ALL */}

              {filteredProducts.length > 8 && (

                <div className="view-all-wrapper">

                  <button
                    className="view-all-btn"
                    onClick={() =>
                      setShowAll((prev) => !prev)
                    }
                  >

                    {showAll
                      ? "Show less"
                      : `View all ${filteredProducts.length} products`}

                    <ArrowRight
                      size={17}
                      className={
                        showAll
                          ? "arrow-up"
                          : ""
                      }
                    />

                  </button>

                </div>

              )}

            </>

          )}

      </section>


      {/* ================= NEWSLETTER ================= */}

      <section className="newsletter">

        <div className="newsletter-content">

          <p className="section-label">
            STAY IN THE LOOP
          </p>

          <h2>
            Get the latest drops.
          </h2>

          <p>
            Subscribe for new products, exclusive offers
            and updates.
          </p>

          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
            }}
          >

            <input
              type="email"
              placeholder="Your email address"
              required
            />

            <button type="submit">
              Subscribe
              <ArrowRight size={17} />
            </button>

          </form>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand">

            <h3>SHOPIFY</h3>

            <p>
              Designed for
              <br />
           everyday life.
            </p>

          </div>


          <div className="footer-column">

            <h4>Shop</h4>

            <button onClick={scrollToProducts}>
              All products
            </button>

            <button onClick={scrollToProducts}>
              New arrivals
            </button>

            <button onClick={scrollToProducts}>
              Best sellers
            </button>

          </div>


          <div className="footer-column">

            <h4>Company</h4>

            <a href="/about">About</a>
            <a href="/contact">Contact</a>

          </div>


          <div className="footer-column">

            <h4>Help</h4>

            <a href="/contact">Shipping</a>
            <a href="/contact">Returns</a>
            <a href="/contact">FAQ</a>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 <i>Shopify</i>. All rights reserved.
          </p>

          <div className="footer-links">

            <span>Privacy</span>
            <span>Terms</span>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;