import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Category } from "./category.jsx";
import { Wheat, Carrot, GlassWater, Sparkles } from "lucide-react";

export function Categories() {
  const products = useSelector((state) => state.products);

  // Mapeo de categorías a íconos. ¡Puedes personalizarlo!
  const categoryIcons = {
    Panadería: Wheat,
    Frutas: Carrot,
    Bebidas: GlassWater,
    default: Sparkles,
  };

  const categoriesData = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    const categoryCounts = products.reduce((acc, product) => {
      const { category } = product;
      if (category) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [products]);

  return (
    <section className="py-8 px-4 ">
      <h2 className="text-2xl font-semibold mb-6 text-center ">Explora por categoría</h2>
      {categoriesData.length > 0 ? (
        <div className="grid grid-cols-3  gap-4">
          {categoriesData.map(({ name, count }) => (
            <Category
              key={name}
              category={name}
              count={count}
              icon={categoryIcons[name] || categoryIcons.default}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-4">No hay categorías para mostrar.</p>
      )}
    </section>
  );
}
