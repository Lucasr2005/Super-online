import { OrderStateTag } from "./orderStateTag.jsx";
import { useSelector } from "react-redux";
import { OrderProducts } from "./orderProducts.jsx";
import { useMemo } from "react";

// Un mejor ícono de cierre
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export function OrderDetails({ order, orderProducts, handleClose }) {
  if (!order) return null;
  const products = useSelector((state) => state.products);
  const shippingPrice = order.shipping_price;

  const subTotal = useMemo(() => {
    if (!orderProducts?.length) return 0;
    return orderProducts.reduce((acc, product) => acc + product.unit_price * product.quantity, 0);
  }, [orderProducts]);

  return (
    <div
      className="bg-black/65 fixed top-0 left-0 h-screen w-full z-10 flex items-center justify-center px-5"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-white p-4 rounded-lg flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full flex justify-end cursor-pointer text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          <CloseIcon />
        </div>
        <h1 className="font-semibold text-lg mb-2">Detalles del pedido #{order.id.slice(0, 8)}</h1>
        <OrderStateTag state={order.state} />
        <p className="text-sm text-gray-600 my-2">Dirección: {order.delivery_address}</p>
        <div className="flex-grow overflow-y-auto my-4 border-y py-2">
          <OrderProducts
            orderProducts={orderProducts}
            products={products}
          />
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal:</p>
            <p className="font-medium">${subTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Envío:</p>
            <p className="font-medium">${shippingPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold text-base">
            <p>Total:</p>
            <p>${(shippingPrice + subTotal).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
