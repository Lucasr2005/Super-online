import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { createMPOrder } from "../../../services/orders.js";

initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { locale: "es-AR" });

export function MercadoPagoPayment({ shippingPrice }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingPrice > 0 && cart.length > 0) {
      setIsLoading(true);
      setError(null);
      setPreferenceId(null);
      createMPOrder(cart, shippingPrice)
        .then((response) => {
          if (response?.preference_id) {
            setPreferenceId(response.preference_id);
          }
        })
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    } else {
      setPreferenceId(null);
    }
  }, [cart, shippingPrice]);

  if (shippingPrice <= 0) {
    return null;
  }

  return (
    <div className="mt-4">
      {isLoading && <p className="text-sm text-gray-600">Generando botón de pago...</p>}
      {preferenceId && !isLoading && <Wallet initialization={{ preferenceId }} />}
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}
