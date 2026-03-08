import { Product } from "../components/product.jsx";
export function displayProducts(products) {
  if (!products || products.length === 0) {
    return <p>No se han encontrado productos</p>;
  }
  return products.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      img_name={product.img_name}
      name={product.name}
      price={product.price}
    />
  ));
}
