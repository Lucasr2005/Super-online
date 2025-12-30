export function Summary({ total, shippingPrice }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm">Subtotal</span>
        <span className="font-semibold">${total}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Envio</span>
        <span className="font-semibold">${shippingPrice}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Total</span>
        <span className="font-semibold">${(total + shippingPrice).toFixed(2)}</span>
      </div>
    </>
  );
}
