import { Product } from "./product.jsx";
import { useSelector } from "react-redux";
export function Products() {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  if (!cart || !products) return "No se han encontrado productos";
  return (
    <section className="flex flex-col gap-2">
      {cart &&
        products &&
        cart.map((p) => {
          const product = products.find((product) => product.id === p.id);
          return (
            product && (
              <Product
                key={p.id}
                id={p.id}
                image_url={product.image_url}
                name={product.name}
                price={product.price}
                quantity={p.quantity}
              />
            )
          );
        })}
    </section>
  );
}
