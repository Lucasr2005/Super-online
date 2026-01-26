import { getShippingPrice } from "../../../services/orders.js";
import { useState } from "react";
import { Summary } from "../../components/Summary.jsx";
import { MercadoPagoPayment } from "./MercadoPagoPayment.jsx";
import { useDispatch, useSelector } from "react-redux";

export function CartSummary({ subtotal }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { address, isAddressSet, shippingPrice } = useSelector((state) => state.delivery);
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

  return (
    <section className="mx-5 flex-col my-5 bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] p-3 gap-5 py-4 mb-20">
      <h2 className="text-xl font-semibold mb-2">Resumen de compra</h2>
      <Summary subtotal={subtotal} />

      {isAddressSet && shippingPrice == 0 && (
        <button
          className="bg-black py-2 opacity-85 text-white w-full rounded-lg mt-3 disabled:opacity-50"
          onClick={handleGetShippingCost}
          disabled={isLoading}
        >
          {isLoading ? "Calculando..." : "Calcular envío"}
        </button>
      )}
      <MercadoPagoPayment />
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </section>
  );
}
