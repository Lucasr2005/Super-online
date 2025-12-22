import { useMemo } from "react";
import { DisplayCategory } from "./DisplayCategory";
import { useDispatch } from "react-redux";

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
    <section className="w-full h-screen bg-gray-300 absolute z-10 p-4">
      <DisplayCategory
        key={CATEGORIES[0]}
        category={CATEGORIES[0]}
        options={filterOptions.subCategories}
        setOption={setSubCategory}
      />
      <div className="mt-4">
        <DisplayCategory
          key={CATEGORIES[1]}
          category={CATEGORIES[1]}
          options={filterOptions.brands}
          setOption={setBrand}
        />
      </div>

      <p
        className="w-full text-center text-lg text-blue-400 underline cursor-pointer pt-10"
        onClick={() => dispatch({ type: "@filters/setDisplay", payload: false })}
      >
        Aplicar
      </p>
    </section>
  );
}
