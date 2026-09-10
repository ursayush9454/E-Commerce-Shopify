import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-eyebrow">
            THE SHOPIFY STORY
          </span>

          <h1>
            Designed for
            <br />
            <em>everyday living.</em>
          </h1>

          <p>
            We believe great style doesn't need to be complicated.
            SHOPIFY brings together timeless design, quality products,
            and effortless shopping in one place.
          </p>

        </div>

        <div className="about-hero-circle"></div>

      </section>


      {/* OUR STORY */}

      <section className="about-story">

        <div className="about-story-image">

          <div className="about-image-box">
            SHOPIFY
          </div>

        </div>

        <div className="about-story-content">

          <span className="about-section-label">
            OUR STORY
          </span>

          <h2>
            More than
            <br />
            <em>just shopping.</em>
          </h2>

          <p>
            SHOPIFY was created with a simple idea — make discovering
            beautiful products feel effortless.
          </p>

          <p>
            From everyday essentials to carefully selected statement
            pieces, every product is chosen with quality, style, and
            value in mind.
          </p>

          <p>
            We are building a shopping experience that feels personal,
            modern, and reliable.
          </p>

        </div>

      </section>


      {/* VALUES */}

      <section className="about-values">

        <div className="about-values-header">

          <span className="about-section-label">
            WHAT WE BELIEVE
          </span>

          <h2>
            Our core
            <br />
            <em>values.</em>
          </h2>

        </div>

        <div className="about-values-grid">

          <div className="about-value-card">

            <span className="value-number">
              01
            </span>

            <h3>
              Quality First
            </h3>

            <p>
              We focus on products that combine thoughtful design,
              reliable quality, and lasting value.
            </p>

          </div>


          <div className="about-value-card">

            <span className="value-number">
              02
            </span>

            <h3>
              Simple Experience
            </h3>

            <p>
              From discovering a product to placing an order,
              we keep every step simple and enjoyable.
            </p>

          </div>


          <div className="about-value-card">

            <span className="value-number">
              03
            </span>

            <h3>
              Customer First
            </h3>

            <p>
              Our customers are at the heart of everything we build,
              and their experience always comes first.
            </p>

          </div>

        </div>

      </section>


      {/* NUMBERS */}

      <section className="about-numbers">

        <div className="about-number">

          <strong>
            100%
          </strong>

          <span>
            Curated Products
          </span>

        </div>


        <div className="about-number">

          <strong>
            24/7
          </strong>

          <span>
            Shopping Experience
          </span>

        </div>


        <div className="about-number">

          <strong>
            ∞
          </strong>

          <span>
            Possibilities
          </span>

        </div>

      </section>


      {/* CTA */}

      <section className="about-cta">

        <span className="about-section-label">
          START EXPLORING
        </span>

        <h2>
          Find something
          <br />
          <em>made for you.</em>
        </h2>

        <p>
          Discover our collection and find your next favorite piece.
        </p>

        <Link
          to="/"
          className="about-shop-btn"
        >
          EXPLORE COLLECTION
          <span>→</span>
        </Link>

      </section>

    </div>
  );
};

export default About;