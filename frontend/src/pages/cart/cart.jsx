import { useSelector } from "react-redux";
import { Product } from "./components/product.jsx";
import { ShippingAddress } from "./components/ShippingAddress.jsx";
import { useMemo } from "react";
import { CartSummary } from "./components/CartSummary.jsx";

function Cart() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold m-5">Mis productos</h2>
      <section className="mx-5 flex flex-col gap-5">
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

      <ShippingAddress />

      <CartSummary />
    </div>
  );
}

export default Cart;
