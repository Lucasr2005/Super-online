import { useSelector } from "react-redux";

export function Summary() {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);

  const subtotal = cart.reduce((total, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (!product) return total;
    return total + product.price * cartItem.quantity;
  }, 0);
  const { shippingPrice } = useSelector((state) => state.delivery);

  return (
    <section className="flex flex-col gap-2 text-sm text-gray-800 ">
      <div className="flex items-center justify-between">
        <span className="">Subtotal</span>
        <span className="font-semibold ">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between ">
        <span className="">Envio</span>
        <span className="font-semibold ">${shippingPrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-base text-black">Total</span>
        <span className="font-bold text-base text-black">
          ${(shippingPrice + subtotal).toFixed(2)}
        </span>
      </div>
    </section>
  );
}
