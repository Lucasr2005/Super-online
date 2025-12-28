import { getShippingPrice } from "../../../services/orders.js";
import { useState } from "react";
import { Summary } from "./Summary";

const getShippingCost = async (address, setShippingPrice) => {
  const shippingButton = document.querySelector("button[name='shipping']");
  shippingButton.innerText = "Calculando...";
  shippingButton.disabled = true;
  const response = await getShippingPrice(address);
  setShippingPrice(response.price);
  shippingButton.innerText = "Calcular envío";
  shippingButton.disabled = false;
};

export function CartSummary({ total, address }) {
  const [shippingPrice, setShippingPrice] = useState(0);
  return (
    <section className="mx-5 flex-col my-5 bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] p-3 gap-5 py-4 mb-20">
      <h2 className="text-xl font-semibold mb-2">Resumen de compra</h2>
      <Summary
        total={total}
        shippingPrice={shippingPrice}
      />
      {address.homeType && (
        <button
          className="bg-black py-2 opacity-85 text-white w-full rounded-lg mt-3"
          name="shipping"
          onClick={() => getShippingCost(address, setShippingPrice)}
        >
          Calcular envío
        </button>
      )}
    </section>
  );
}
