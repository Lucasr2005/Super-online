import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/products.js";
import { displayProducts } from "./functions/display.products.jsx";
import { normalizeString } from "./functions/normalizeString.js";
import { FiltersMenu } from "./components/FiltersMenu.jsx";
import { HeaderButtons } from "./components/Headerbuttons.jsx";
import { useSelector } from "react-redux";

function Products() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const displayFilters = useSelector((state) => state.filters.display);

  useEffect(() => {
    getProducts().then((allProducts) => {
      const filtered = allProducts.filter(
        (p) => normalizeString(p.category) === normalizeString(category)
      );
      setProducts(filtered);
    });
  }, [category]);

  return (
    <section className="max-w-screen relative flow-root">
      {displayFilters && <FiltersMenu products={products} />}
      <HeaderButtons />
      <div className="grid grid-cols-2 mx-3 gap-y-5 gap-x-3 mt-5">{displayProducts(products)}</div>
    </section>
  );
}

export default Products;
