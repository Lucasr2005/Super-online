import { useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useMercadoPagoPreference } from "./useMercadoPagoPreference.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { locale: "es-AR" });

export function MercadoPagoPayment({ orderId }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!orderId) return navigate("/carrito");
  }, [orderId]);
  const cart = useSelector((state) => state.cart);
  const { shippingPrice, address, isAddressSet } = useSelector((state) => state.delivery);

  const { preferenceId, error, isLoading } = useMercadoPagoPreference({
    cart,
    shippingPrice,
    isAddressSet,
    orderId,
  });

  return (
    <div className="mt-4 mx-5">
      {isLoading && <p className="text-sm text-gray-600">Generando botón de pago...</p>}
      {preferenceId && !isLoading && <Wallet initialization={{ preferenceId }} />}
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}
