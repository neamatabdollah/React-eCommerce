import { useState } from "react";
import { CartContext } from "./CartContex";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { ...product, count: 1 }];
      }
    });
  };

  const updateCount = (id, newCount) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: newCount } : item))
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCount,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
