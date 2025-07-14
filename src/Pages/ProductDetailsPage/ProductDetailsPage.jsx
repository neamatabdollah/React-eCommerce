import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInterceptor } from "../../networks/interceptor";
// import { useCart } from "../../contexts/CartContext/useCart";
import "./ProductDetailsPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeFromCart } from "../../contexts/store/cartSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // const [count, setCount] = useState(0);
  // const { increaseCart, decreaseCart } = useCart();
  // const { cartItems, updateCount, addToCart } = useCart();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.counter.cartItem);

  useEffect(() => {
    axiosInterceptor.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  // const handleAddToCart = () => {
  //   setCount(1);
  //   increaseCart(1);
  // };

  // const handleIncrease = () => {
  //   if (count < product.stock) {
  //     setCount(count + 1);
  //     increaseCart(1);
  //   }
  // };

  // const handleDecrease = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //     decreaseCart(1);
  //   }
  // };

  if (!product) return <p>Loading...</p>;

  // Convert rating to stars
  const renderStars = () => {
    const rounded = Math.round(product.rating);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rounded ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  // Get count from cartItems
  const current = cartItems.find((item) => item.id === product.id);
  const count = current?.count || 0;

  const handleAddToCart = () => {
    // addToCart(product);
    dispatch(addCart(product));
  };

  const handleIncrease = () => {
    if (count < product.stock) {
      // updateCount(product.id, count + 1);
      dispatch(addCart(product));
    }
  };

  const handleDecrease = () => {
    if (count > 0) {
      // updateCount(product.id, count - 1);
      dispatch(removeFromCart(product));
    }
  };
  return (
    <>
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="product-details">
        <img src={product.images[0]} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p className="product-rating">{renderStars()}</p>
        {count === 0 ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <div className="details-counter">
            <button onClick={handleDecrease}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
        )}
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </>
  );
}
