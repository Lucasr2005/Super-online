import { useSelector } from "react-redux";
import { Product } from "./components/product.jsx";
import { ShippingAddress } from "./components/shippingAddress.jsx";
import { useState, useMemo } from "react";
import { CartSummary } from "./components/CartSummary.jsx";

function Cart() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState({});

  const cartSummary = useMemo(() => {
    if (!cart || !products) return 0;

    const rawTotal = cart.reduce((total, cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return total;
      return total + product.price * cartItem.quantity;
    }, 0);

    return Math.round(rawTotal * 100) / 100;
  }, [cart, products]);

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

      <ShippingAddress
        address={address}
        setAddress={setAddress}
      />

      <CartSummary
        address={address}
        total={cartSummary}
      />
    </div>
  );
}

export default Cart;
