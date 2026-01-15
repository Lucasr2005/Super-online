import { useSelector } from "react-redux";

export function Summary({ subtotal }) {
  const { shippingPrice } = useSelector((state) => state.delivery);
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm">Subtotal</span>
        <span className="font-semibold">${subtotal}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Envio</span>
        <span className="font-semibold">${shippingPrice}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Total</span>
        <span className="font-semibold">${(shippingPrice + subtotal).toFixed(2)}</span>
      </div>
    </>
  );
}
