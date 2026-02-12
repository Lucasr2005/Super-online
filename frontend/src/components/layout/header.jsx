import { Link } from "react-router-dom";
import cartImg from "../../assets/images/cart.png";
import menuImg from "../../assets/images/menu.png";
import { handleSetSidebar } from "./functions/setSidebar.jsx";
import { useDispatch } from "react-redux";

export function Header() {
  const dispatch = useDispatch();
  return (
    <header className="flex items-center py-4 shadow-[0_4px_4px_rgba(0,0,0,0.1)] h-16 sticky top-0 z-50 mt-0 w-full bg-[#fafafa]">
      <button
        className="px-4"
        aria-label="Abrir menú"
        onClick={() => handleSetSidebar({ dispatch })}
      >
        <img
          src={menuImg}
          alt="Icono de menú"
          className="h-6"
        />
      </button>
      <Link
        to="/"
        className="text-blue-800 font-semibold text-2xl flex flex-1"
      >
        Súper Online
      </Link>
      <Link to="/carrito">
        <img
          src={cartImg}
          alt="Icono de carrito"
          className="h-8 mx-4"
        />
      </Link>
    </header>
  );
}
