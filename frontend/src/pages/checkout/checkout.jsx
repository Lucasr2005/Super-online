import { Summary } from "../components/Summary.jsx";
import { Products } from "./components/products.jsx";
import { MercadoPagoPayment } from "./components/mercadoPago/MercadoPagoPayment.jsx";
import { useSelector } from "react-redux";

function Checkout() {
  const orderId = new URLSearchParams(window.location.search).get("orderId");
  const { address, isAddressSet } = useSelector((state) => state.delivery);
  return (
    <>
      <h2 className=" text-2xl font-semibold my-5 w-full text-center">Finalizar compra</h2>
      <p className="text-sm w-full text-center mb-5 text-gray-700">Orden #{orderId.slice(0, 8)}</p>
      <section className="bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] mx-5 py-5 px-5">
        <h2 className=" text-xl font-medium mb-5">Resumen del pedido</h2>
        {isAddressSet && (
          <p className="text-xs mb-5 opacity-90">
            Enviar a: {address.street}, {address.houseNumber}
          </p>
        )}
        <Products />
        <hr className="opacity-50 my-4" />
        <Summary />
      </section>
      <MercadoPagoPayment orderId={orderId} />
    </>
  );
}

export default Checkout;
