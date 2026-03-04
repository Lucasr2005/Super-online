import { useSelector } from "react-redux";
import { Category } from "./category.jsx";

export function Categories() {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  const categoryCounts = products.reduce((acc, product) => {
    const { category } = product;
    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <section className="py-8 px-4 ">
      <h2 className="text-2xl font-semibold mb-6 text-center ">Explora por categoría</h2>
      {categories.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 place-items-center w-fit mx-auto md:flex md:flex-wrap md:gap-10">
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category.name}
              count={categoryCounts[category.name]}
              imgName={category.img_name}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-4">No hay categorías para mostrar.</p>
      )}
    </section>
  );
}
