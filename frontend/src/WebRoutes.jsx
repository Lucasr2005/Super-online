import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "./services/products.js";
import { fetchProducts } from "./functions/fetch.Products.js";
import Home from "./pages/home/home.jsx";
import Products from "./pages/products/products.jsx";
import Cart from "./pages/cart/cart.jsx";

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
          path="/productos/:category"
          element={<Products />}
        />
        <Route
          path="/carrito"
          element={<Cart />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default WebRoutes;
