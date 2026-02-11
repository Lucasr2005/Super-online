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
import { Failure } from "./pages/paymentStatus/failure.jsx";
import { verifyToken } from "./services/users.js";
import { OnlyLogguedInRoutes } from "./middleware/OnlyLogguedInRoutes.jsx";
import Checkout from "./pages/checkout/checkout.jsx";
import { Header } from "./pages/components/header.jsx";

function WebRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts().then((allProducts) => {
      dispatch(fetchProducts(allProducts));
    });
    verifyToken()
      .then(() => {
        dispatch({ type: "@user/setUser" });
      })
      .catch(() => {
        dispatch({ type: "@user/setInvalid" });
      });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/registro"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/productos/:category"
          element={<Products />}
        />
        <Route element={<OnlyLogguedInRoutes />}>
          <Route
            path="/carrito"
            element={<Cart />}
          />
          <Route
            path="/pago"
            element={<Checkout />}
          />
          <Route
            path="/pago/exitoso"
            element={<Success />}
          />
          <Route
            path="/pago/rechazado"
            element={<Failure />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default WebRoutes;
