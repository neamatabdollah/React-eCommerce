import { useContext } from "react";
import { CartContext } from "./CartContex.js";

export const useCart = () => useContext(CartContext);
