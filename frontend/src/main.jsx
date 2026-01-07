import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WebRoutes from "./WebRoutes.jsx";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { productsReducer } from "./reducers/products/products.reducer.js";
import { filtersReducer } from "./reducers/products/filters.reducer.js";
import { cartReducer } from "./reducers/products/cart.reducer.js";
import { userReducer } from "./reducers/products/user.reducer.js";
const reducers = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
  user: userReducer,
});
const store = createStore(reducers);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <WebRoutes />
    </Provider>
  </StrictMode>
);
