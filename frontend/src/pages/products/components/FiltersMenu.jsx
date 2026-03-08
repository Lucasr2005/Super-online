import { useMemo } from "react";
import { DisplayCategory } from "./DisplayCategory";
import { useDispatch } from "react-redux";
import { OrderBy } from "./OrderBy.jsx";

const CATEGORIES = ["Sub-categoría", "Marca"];
export function FiltersMenu({ products }) {
  const filterOptions = useMemo(() => {
    if (!products || products.length === 0) {
      return {};
    }

    const subCategories = [...new Set(products.map((p) => p.sub_category))];
    const brands = [...new Set(products.map((p) => p.brand))];

    return { subCategories, brands };
  }, [products]);
  const dispatch = useDispatch();
  const setSubCategory = (category) => {
    dispatch({ type: "@filters/setSubCategory", payload: category });
  };
  const setBrand = (brand) => {
    dispatch({ type: "@filters/setBrand", payload: brand });
  };

  return (
    <section className="w-full h-[91vh] overflow-y-scroll bg-gray-300 absolute z-10 p-4 lg:relative lg:w-1/4 lg:h-fit lg:rounded-lg pb-16 lg:overflow-y-auto">
      <OrderBy />
      <DisplayCategory
        key={CATEGORIES[0]}
        category={CATEGORIES[0]}
        options={filterOptions.subCategories}
        setOption={setSubCategory}
      />
      <DisplayCategory
        key={CATEGORIES[1]}
        category={CATEGORIES[1]}
        options={filterOptions.brands}
        setOption={setBrand}
      />

      <p
        className="w-full text-center text-lg text-blue-400 underline cursor-pointer pt-10 lg:hidden"
        onClick={() => dispatch({ type: "@filters/setDisplay", payload: false })}
      >
        Aplicar
      </p>
    </section>
  );
}
