import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`, {
      state: { product },
    });
  };

  return (
    <div className="product-card">

      <div
        className="product-image-container"
        onClick={handleProductClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <button
          className="wishlist-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={19} strokeWidth={1.8} />
        </button>

        <button
          className="quick-add"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic baad me lagayenge
          }}
        >
          <ShoppingBag size={17} />
          Add to Cart
        </button>
      </div>

      <div
        className="product-info"
        onClick={handleProductClick}
        style={{ cursor: "pointer" }}
      >
        <p className="product-category">
          {product.category}
        </p>

        <div className="product-name-row">
          <h3>
            {product.name}
          </h3>

          <span className="product-price">
            ₹{product.price}
          </span>
        </div>

        <p className="product-descreption">
          {product.description}
        </p>
      </div>

    </div>
  );
};

export default ProductCard;