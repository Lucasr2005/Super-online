import { useSelector } from "react-redux";

export function Summary({ subtotal }) {
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
