import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home.jsx";
function WebRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default WebRoutes;
