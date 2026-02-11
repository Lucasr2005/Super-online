import { Link } from "react-router-dom";
import cartImg from "../images/cart.png";
import menuImg from "../images/menu.png";
import searchImg from "../images/search.png";

export function Header() {
  return (
    <header className="flex items-center py-4 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
      <button
        className="px-4"
        aria-label="Abrir menú"
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
      <div className="flex items-center mr-4 gap-4">
        <button>
          <img
            src={searchImg}
            alt="Icono de búsqueda"
            className="h-8"
          />
        </button>
        <Link to="/carrito">
          <img
            src={cartImg}
            alt="Icono de carrito"
            className="h-8"
          />
        </Link>
      </div>
    </header>
  );
}
