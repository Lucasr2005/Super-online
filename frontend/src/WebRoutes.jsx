import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Products from "./pages/products/products.jsx";
function WebRoutes() {
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
