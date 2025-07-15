// import { useCart } from "../../contexts/CartContext/useCart";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeFromCart } from "../../contexts/store/cartSlice";
import Loader from "../../components/Loader/Loader";

export default function CartPage() {
  // const { cartItems, updateCount } = useCart();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.counter.cartItem);
  const itemsInCart = cartItems.filter((item) => item.count > 0);

  const totalPrice = itemsInCart.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  if (itemsInCart.length === 0) {
    return (
      <>
        <Loader />
        <div className="Navbar">
          <Navbar />
        </div>
        <h2 className="empty-cart">Your cart is empty.</h2>
        <div className="Footer">
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Loader />
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="cart-page">
        <h2>Your Cart</h2>
        {itemsInCart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.images[0]} alt={item.title} width="100" />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>Unit Price: ${item.price}</p>
              <div className="quantity-control">
                <button
                  // onClick={() =>
                  //   updateCount(item.id, item.count > 0 ? item.count - 1 : 0)
                  // }
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() =>
                    // updateCount(
                    //   item.id,
                    //   item.count < item.stock ? item.count + 1 : item.count
                    // )
                    dispatch(addCart(item))
                  }
                >
                  +
                </button>
              </div>
              <p className="item-total">
                Item Total: ${item.price * item.count}
              </p>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <h3>Cart Total: ${totalPrice}</h3>
        </div>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </>
  );
}
