import { useSelector } from "react-redux";
import { Product } from "./components/product.jsx";
import { ShippingAddress } from "./components/ShippingAddress.jsx";
import { CartSummary } from "./components/CartSummary.jsx";
import { CartEmpty } from "./components/cartEmpty.jsx";

function Cart() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  if (!cart || cart.length === 0 || !products) return <CartEmpty />;

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
                  img_name={product.img_name}
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
