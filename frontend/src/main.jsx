import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WebRoutes from "./WebRoutes.jsx";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { productsReducer } from "./reducers/products.reducer.js";
import { filtersReducer } from "./reducers/filters.reducer.js";
import { cartReducer } from "./reducers/cart.reducer.js";
import { userReducer } from "./reducers/user.reducer.js";
import { deliveryReducer } from "./reducers/delivery.reducer.js";
import { layoutReducer } from "./reducers/layout.reducer.js";
import { categoriesReducer } from "./reducers/categories.reducer.js";
const reducers = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
  user: userReducer,
  delivery: deliveryReducer,
  layout: layoutReducer,
  categories: categoriesReducer,
});
const store = createStore(reducers);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <WebRoutes />
    </Provider>
  </StrictMode>,
);
