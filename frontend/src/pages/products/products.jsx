import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { displayProducts } from "./functions/display.products.jsx";
import { normalizeString } from "./functions/normalizeString.js";
import { FiltersMenu } from "./components/FiltersMenu.jsx";
import { HeaderButtons } from "./components/Headerbuttons.jsx";
import { useSelector } from "react-redux";

function Products() {
  const { category: urlCategory } = useParams();

  const displayFilters = useSelector((state) => state.filters.display);
  const allProducts = useSelector((state) => state.products);
  const filters = useSelector((state) => state.filters);

  const filteredProducts = useMemo(() => {
    const productsByCategory = allProducts.filter(
      (p) => normalizeString(p.category) === normalizeString(urlCategory)
    );

    const withSubCategory =
      filters.subCategory.length > 0
        ? productsByCategory.filter((p) => filters.subCategory.includes(p.sub_category))
        : productsByCategory;

    const withBrand =
      filters.brand.length > 0
        ? withSubCategory.filter((p) => filters.brand.includes(p.brand))
        : withSubCategory;

    return withBrand;
  }, [allProducts, urlCategory, filters]);

  const productsForMenu = useMemo(() => {
    return allProducts.filter((p) => normalizeString(p.category) === normalizeString(urlCategory));
  }, [allProducts, urlCategory]);

  if (!allProducts || allProducts.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <section className="max-w-screen relative flow-root">
      {displayFilters && <FiltersMenu products={productsForMenu} />}
      <HeaderButtons />
      <div className="grid grid-cols-2 mx-3 gap-y-5 gap-x-3 mt-5">
        {displayProducts(filteredProducts)}
      </div>
    </section>
  );
}

export default Products;
