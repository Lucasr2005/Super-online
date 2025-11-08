import { Product } from "../components/product.jsx";
export function displayProducts(products) {
    return products.map((product) => (
        <Product
            key={product.id}
            id={product.id}
            image_url={product.image_url}
            name={product.name}
            price={product.price}
        />
    ));
}
