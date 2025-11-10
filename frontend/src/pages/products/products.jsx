import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/products.js";
import { displayProducts } from "./functions/display.products.jsx";
import { normalizeString } from "./functions/normalizeString.js";

function Products() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    getProducts().then((allProducts) => {
      const filtered = allProducts.filter(
        (p) => normalizeString(p.category) === normalizeString(category)
      );
      setProducts(filtered);
    });
  }, [category]);

  return (
    <section className="max-w-screen my-10">
      <div className="grid grid-cols-2 mx-3 gap-y-5 gap-x-3">{displayProducts(products)}</div>
    </section>
  );
}

export default Products;
