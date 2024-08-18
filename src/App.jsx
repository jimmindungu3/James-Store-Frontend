import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartContext from "./context/cartContext.js";
import Home from "./pages/Home.jsx";
import CartPage from "./pages/Cart.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";
import AboutPage from "./pages/About.jsx";
import ContactPage from "./pages/Contact.jsx";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./index.css";

const App = () => {
  // get cart from localstorage and initialize state to its content
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("myCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // update localstorage when state changes
  useEffect(() => {
    window.localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          num: updatedCart[existingProductIndex].num + 1,
        };

        return updatedCart;
      } else {
        return [...prevCart, { ...product, num: 1 }];
      }
    });
    toast.success(`${product.title} added to cart`)
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
    toast.error('Product(s) removed from cart')
  };

  // Function to decrement the quantity of a product in the cart
  const decrementProduct = (id) => {
    setCart((prevCart) => {
      return prevCart
        .map((product) => {
          if (product.id === id && product.num > 1) {
            return { ...product, num: product.num - 1 };
          }
          return product;
        })
        .filter((product) => product.num > 0); // Remove product if quantity is zero
    });
    toast.error('1 item removed')
  };

  // Function to empty the cart
  const emptyCart = () => {
    setCart([]);
    toast.error('Cart emptied!')
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decrementProduct, emptyCart }}
    >
      <RouterProvider router={router} />
      <ToastContainer limit={4}/>
    </CartContext.Provider>
  );
};

// Define your routes here
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "*", element: <NotFound /> },
]);

export default App;
