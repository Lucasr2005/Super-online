import { Summary } from "../components/Summary.jsx";
import { Products } from "./components/products.jsx";
import { MercadoPagoPayment } from "./components/mercadoPago/MercadoPagoPayment.jsx";

function Checkout() {
  return (
    <>
      <h2 className=" text-2xl font-semibold my-5 w-full text-center">Finalizar compra</h2>
      <section className="bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] mx-5 py-5">
        <h2 className=" text-xl font-medium px-3 mb-10">Resumen del pedido</h2>

        <section className="mx-5">
          <Products />
          <hr className="opacity-50 my-4" />
          <Summary />
          <MercadoPagoPayment />
        </section>
      </section>
    </>
  );
}

export default Checkout;
