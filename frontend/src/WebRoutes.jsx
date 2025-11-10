import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Products from "./pages/products/products.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "./services/products.js";
import { fetchProducts } from "./functions/fetch.Products.js";

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
      </Routes>
    </BrowserRouter>
  );
}

export default WebRoutes;
