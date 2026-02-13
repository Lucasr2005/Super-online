import { createOrder, getShippingPrice } from "../../../services/orders.js";
import { useState } from "react";
import { Summary } from "../../../components/Summary.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CartSummary() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { address, isAddressSet, shippingPrice } = useSelector((state) => state.delivery);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleGetShippingCost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getShippingPrice(address);
      dispatch({ type: "@delivery/setShippingPrice", payload: response.price });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleCreateOrder = async () => {
    try {
      const response = await createOrder(cart, shippingPrice, address);
      navigate(`/pago?orderId=${response.orderId}`);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <section className="mx-5 flex-col my-5 bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] p-3 gap-5 py-4 mb-20">
      <h2 className="text-xl font-semibold mb-2">Resumen de compra</h2>
      <Summary />

      {isAddressSet && shippingPrice == 0 && (
        <button
          className="bg-black py-2 opacity-85 text-white w-full rounded-lg mt-3 disabled:opacity-50"
          onClick={handleGetShippingCost}
          disabled={isLoading}
        >
          {isLoading ? "Calculando..." : "Calcular envío"}
        </button>
      )}
      {isAddressSet && shippingPrice > 0 && (
        <button
          onClick={handleCreateOrder}
          className="bg-blue-600 text-white flex flex-1 items-center justify-center py-2 opacity-85 w-full rounded-lg mt-3 disabled:opacity-50"
        >
          Confirmar orden
        </button>
      )}
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </section>
  );
}
