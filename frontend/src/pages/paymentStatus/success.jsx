import { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import successImg from "../images/success.png";

export function Success() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  useEffect(() => {
    if (!paymentId || status !== "approved") {
      navigate("/");
      return;
    }

    localStorage.removeItem("cart");
    dispatch({ type: "@cart/clearCart" });
  }, [paymentId, status, dispatch, navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4 pb-20">
      <img
        src={successImg}
        alt="Pago exitoso"
        className="w-36"
      />

      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">¡Pago acreditado!</h2>
        <p className="text-gray-600 text-lg">Gracias por tu compra.</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 w-full max-w-md">
        <div className="flex justify-between items-center text-sm ">
          <span className="text-gray-500">ID de operación:</span>
          <span className="font-mono font-medium text-blue-600">#{paymentId}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <Link
          to="/mis-pedidos"
          className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
        >
          Ver mis pedidos
        </Link>
        <Link
          to="/"
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
        >
          Seguir comprando
        </Link>
      </div>
    </section>
  );
}
