import { useEffect, useState } from "react";
import { createMPOrder } from "../../../../services/orders.js";

export function useMercadoPagoPreference({ cart, shippingPrice, isAddressSet }) {
    const [preferenceId, setPreferenceId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAddressSet && cart.length > 0 && shippingPrice > 0) {
            setIsLoading(true);
            setError(null);
            setPreferenceId(null);

            createMPOrder(cart, shippingPrice)
                .then((response) => {
                    if (response?.preference_id) {
                        setPreferenceId(response.preference_id);
                    } else {
                        setError(new Error("No se pudo generar la preferencia de pago."));
                    }
                })
                .catch((err) => {
                    console.error("Error creating Mercado Pago preference:", err);
                    setError(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setPreferenceId(null);
        }
    }, [cart, shippingPrice, isAddressSet]);

    return { preferenceId, error, isLoading };
}