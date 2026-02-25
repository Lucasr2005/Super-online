import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

export function CartEmpty() {
  return (
    <section className="h-screen flex flex-col justify-center items-center mx-5 pb-16">
      <ShoppingBasket
        size={120}
        className="text-gray-400"
        strokeWidth={1.5}
      />
      <p className="w-full text-center text-xl font-semibold my-5">El carrito está vacío</p>
      <div className="flex gap-4 justify-center w-full">
        <Link
          to="/mis-pedidos"
          className="w-80 bg-white border-2 border-gray-200 text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-50 transition-colors text-center flex items-center justify-center"
        >
          Ver mis pedidos
        </Link>
        <Link
          to="/"
          className="w-80 bg-black text-white py-3 px-2 rounded-lg  hover:bg-gray-900 transition-colors text-center flex items-center justify-center"
        >
          Ir al inicio
        </Link>
      </div>
    </section>
  );
}
