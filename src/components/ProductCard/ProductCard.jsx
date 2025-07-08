import "./ProductCard.css";
import { useCart } from "../../contexts/CartContext/useCart";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToShortList }) {
  const { addToCart, updateCount, cartItems } = useCart();

  const current = cartItems.find((item) => item.id === product.id);
  const count = current?.count || 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrease = () => {
    if (count < product.stock) {
      updateCount(product.id, count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 0) {
      updateCount(product.id, count - 1);
    }
  };

  // ⭐ Convert rating to stars
  const renderStars = () => {
    const rounded = Math.round(product.rating);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rounded ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} className="product-image" />

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">{renderStars()}</div>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>

        {count === 0 ? (
          <button onClick={handleAddToCart} className="btn primary">
            Add to Cart
          </button>
        ) : (
          <div className="counter">
            <button onClick={handleDecrease} className="btn counter-btn">-</button>
            <span>{count}</span>
            <button onClick={handleIncrease} className="btn counter-btn">+</button>
          </div>
        )}

        <button onClick={() => onAddToShortList(product.title)} className="btn secondary">
          ❤️ Add Short List
        </button>

        <Link to={`/products/${product.id}`} className="link-details">
          View Details
        </Link>
      </div>
    </div>
  );
}
