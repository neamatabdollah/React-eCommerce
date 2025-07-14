import { Link } from "react-router-dom";
import "./Navbar.css";
// import { useCart } from "../../contexts/CartContext/useCart";
import { useSelector } from "react-redux";

export default function Navbar() {
  // const { cartCount } = useCart();
  const count = useSelector((state) => state.counter?.totalCount);
  console.log("totalCount", count);

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        Shop<span>Easy</span>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            {" "}
            {/* 🛒 <span className="cart-counter">{cartCount}</span> */}
            🛒 <span className="cart-counter">{count}</span>
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
