import { useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { createOrder } from "../../../../services/orders.js";
import { useMercadoPagoPreference } from "./useMercadoPagoPreference.js";

initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { locale: "es-AR" });

export function MercadoPagoPayment() {
  const cart = useSelector((state) => state.cart);
  const { shippingPrice, address, isAddressSet } = useSelector((state) => state.delivery);

  const { preferenceId, error, isLoading } = useMercadoPagoPreference({
    cart,
    shippingPrice,
    isAddressSet,
  });

  const handlePaymentSubmit = () => {
    createOrder(cart, shippingPrice, address);
  };

  return (
    <div className="mt-4">
      {isLoading && <p className="text-sm text-gray-600">Generando botón de pago...</p>}
      {preferenceId && !isLoading && (
        <Wallet
          initialization={{ preferenceId }}
          onSubmit={handlePaymentSubmit}
        />
      )}
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}
