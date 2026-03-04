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
    <>
      <div className="mt-5 lg:mt-10 lg:flex lg:w-4/5 lg:mx-auto lg:gap-5 lg:justify-center">
        <section className="mx-5 flex flex-col gap-5 lg:min-w-lg lg:max-w-lg">
          <h2 className="text-2xl font-semibold ">Mis productos</h2>

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
        <div className="lg:mt-12 lg:bg-[#FFFFFF] lg:rounded-md lg:shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] lg:h-fit">
          <ShippingAddress />
          <hr className="mx-5 hidden lg:flex" />
          <CartSummary />
        </div>
      </div>
    </>
  );
}

export default Cart;
