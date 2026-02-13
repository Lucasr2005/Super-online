import { Link } from "react-router-dom";
import { useState } from "react";
import { handleSetSidebar } from "./functions/setSidebar.js";
import { useDispatch } from "react-redux";
import { ShowCategories } from "./showCategories.jsx";

export function MenuOptions({}) {
  const [displayCategories, setDisplayCategories] = useState(false);
  const dispatch = useDispatch();
  return (
    <nav className="flex-1 p-4 flex flex-col gap-4">
      <div>
        <h3
          className="font-semibold p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => setDisplayCategories(!displayCategories)}
        >
          Categorías
        </h3>
        <ShowCategories displayCategories={displayCategories} />
      </div>
      <hr />
      <div>
        <ul className="flex flex-col  font-semibold">
          <Link
            to="/carrito"
            className="block p-2 rounded-md hover:bg-gray-100"
            onClick={() => handleSetSidebar({ dispatch })}
          >
            Carrito
          </Link>
          <Link
            to="/mis-pedidos"
            className="block p-2 rounded-md hover:bg-gray-100"
            onClick={() => handleSetSidebar({ dispatch })}
          >
            Mis Pedidos
          </Link>
        </ul>
      </div>
    </nav>
  );
}
