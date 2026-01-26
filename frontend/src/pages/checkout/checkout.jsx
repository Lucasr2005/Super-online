import { useSelector } from "react-redux";
import { Product } from "./components/product.jsx";
import { Summary } from "../components/Summary.jsx";

function Checkout() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <h2 className=" text-2xl font-semibold my-5 w-full text-center">Finalizar compra</h2>
      <section className="bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] mx-5 py-5">
        <h2 className=" text-xl font-medium px-3 mb-10">Resumen del pedido</h2>
        <section className="flex flex-col gap-2 mx-5">
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
        <hr className="mx-5 opacity-50 my-4" />
        <section className="mx-5">
          <Summary subtotal={cart.reduce((total, cartItem) => total + cartItem.quantity, 0)} />
        </section>
      </section>
    </>
  );
}

export default Checkout;
