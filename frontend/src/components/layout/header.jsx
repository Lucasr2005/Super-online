import { Link } from "react-router-dom";
import { handleSetSidebar } from "./functions/setSidebar.js";
import { useDispatch } from "react-redux";
import { Menu, ShoppingCart } from "lucide-react";

export function Header() {
  const dispatch = useDispatch();
  return (
    <header className="flex items-center py-4 shadow-[0_4px_4px_rgba(0,0,0,0.1)] h-16 sticky top-0 z-50 mt-0 w-full bg-[#fafafa]">
      <button
        aria-label="Abrir menú"
        onClick={() => handleSetSidebar({ dispatch })}
      >
        <Menu
          className="h-8 mx-4"
          width={28}
          height={28}
        />
      </button>
      <Link
        to="/"
        className="text-blue-800 font-semibold text-2xl flex flex-1"
      >
        Súper Online
      </Link>
      <Link to="/carrito">
        <ShoppingCart
          className="h-8 mx-4"
          width={28}
          height={28}
        />
      </Link>
    </header>
  );
}
