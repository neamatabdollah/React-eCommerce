import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../../contexts/CartContext/useCart";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        Shop<span>Easy</span>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            {" "}
            🛒 <span className="cart-counter">{cartCount}</span>
          </Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
