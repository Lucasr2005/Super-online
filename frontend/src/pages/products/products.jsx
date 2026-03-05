import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { displayProducts } from "./functions/display.products.jsx";
import { normalizeString } from "../../functions/normalizeString.js";
import { FiltersMenu } from "./components/FiltersMenu.jsx";
import { HeaderButtons } from "./components/HeaderButtons.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderBy } from "./functions/orderBy.js";

function Products() {
  const { category: urlCategory } = useParams();

  const displayFilters = useSelector((state) => state.filters.display);
  const allProducts = useSelector((state) => state.products);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (urlCategory) {
      dispatch({ type: "@filters/setCategory", payload: { category: urlCategory } });
    }

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      document.body.style.overflow = isDesktop ? "auto" : displayFilters ? "hidden" : "auto";
      dispatch({ type: "@filters/setDisplay", payload: isDesktop });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [urlCategory, dispatch]);
  useEffect(() => {
    if (displayFilters && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [displayFilters]);

  const filteredProducts = useMemo(() => {
    const productsByCategory = allProducts.filter(
      (p) => normalizeString(p.category) === normalizeString(urlCategory),
    );

    const withSubCategory =
      filters.subCategory.length > 0
        ? productsByCategory.filter((p) => filters.subCategory.includes(p.sub_category))
        : productsByCategory;

    const withBrand =
      filters.brand.length > 0
        ? withSubCategory.filter((p) => filters.brand.includes(p.brand))
        : withSubCategory;

    return orderBy(withBrand, filters.orderBy);
  }, [allProducts, urlCategory, filters]);

  const productsForMenu = useMemo(() => {
    return allProducts.filter((p) => normalizeString(p.category) === normalizeString(urlCategory));
  }, [allProducts, urlCategory]);

  if (!allProducts || allProducts.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <section className="max-w-screen relative flow-root lg:flex lg:mt-10 lg:mx-5 lg:gap-5  ">
      {displayFilters && <FiltersMenu products={productsForMenu} />}
      <HeaderButtons />
      <div className="grid grid-cols-2 mx-3 gap-y-5 gap-x-3 mt-5 md:grid-cols-3 lg:mt-0 xl:grid-cols-4 lg:gap-5">
        {displayProducts(filteredProducts)}
      </div>
    </section>
  );
}

export default Products;
