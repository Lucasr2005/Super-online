import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "./services/products.js";
import { fetchProducts } from "./functions/fetch.products.js";
import Home from "./pages/home/home.jsx";
import Products from "./pages/products/products.jsx";
import Cart from "./pages/cart/cart.jsx";
import Register from "./pages/register/register.jsx";
import Login from "./pages/register/login.jsx";
import { Success } from "./pages/paymentStatus/success.jsx";

function WebRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts().then((allProducts) => {
      dispatch(fetchProducts(allProducts));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/registro"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/productos/:category"
          element={<Products />}
        />
        <Route
          path="/carrito"
          element={<Cart />}
        />
        <Route
          path="/pago/exitoso"
          element={<Success />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default WebRoutes;
