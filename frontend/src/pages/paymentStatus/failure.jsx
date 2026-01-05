import { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import failureImg from "../images/failure.png";

export function Failure() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  useEffect(() => {
    if (!paymentId) {
      navigate("/");
      return;
    }
  }, [paymentId, status, dispatch, navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4 pb-20">
      <img
        src={failureImg}
        alt="Pago exitoso"
        className="w-36"
      />

      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Pago rechazado</h2>
        <p className="text-gray-600 text-lg">Vuelve a intentarlo.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <Link
          to="/carrito"
          className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
        >
          Volver al carrito
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
