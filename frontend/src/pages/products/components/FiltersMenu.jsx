import { useMemo } from "react";
import { DisplayCategory } from "./DisplayCategory";
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

  return (
    <section className="w-full h-screen bg-gray-300 absolute z-10">
      <DisplayCategory
        key={CATEGORIES[0]}
        category={CATEGORIES[0]}
        options={filterOptions.subCategories}
      />
      <DisplayCategory
        key={CATEGORIES[1]}
        category={CATEGORIES[1]}
        options={filterOptions.brands}
      />

      <p className="w-full text-center text-lg text-blue-400 underline cursor-pointer  mt-10">
        Aplicar
      </p>
    </section>
  );
}
