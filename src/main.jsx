// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.css';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CartProvider } from "./contexts/CartContext/CartProvider";
import { LoaderProvider } from "./contexts/LoaderContext/LoaderProvider";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { store } from "../src/contexts/store/index";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <LoaderProvider>
        <AuthProvider>
          {/* <CartProvider> */}
            <RouterProvider router={router} />
          {/* </CartProvider> */}
        </AuthProvider>
      </LoaderProvider>
    </React.StrictMode>
  </Provider>
);
