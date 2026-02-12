import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logoutImg from "../../assets/images/logout.png";
import { handleSetSidebar } from "./functions/setSidebar.jsx";

export function SideBar() {
  const { displaySideBar } = useSelector((state) => state.layout);
  useEffect(() => {
    if (displaySideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [displaySideBar]);

  const [displayCategories, setDisplayCategories] = useState(false);
  const { isLogged } = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!products) return;
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    setCategories(uniqueCategories);
  }, [products]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "@user/logoutUser" });
  };
  if (!displaySideBar) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => handleSetSidebar({ dispatch })}
      ></div>

      <aside className="relative z-10 w-4/5 max-w-xs bg-white h-full shadow-xl flex flex-col">
        <div className="p-4 border-b">
          <Link
            to="/"
            className="text-xl font-semibold text-blue-800"
          >
            Súper Online
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-4">
          <div>
            <h3
              className="font-semibold p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setDisplayCategories(!displayCategories)}
            >
              Categorías
            </h3>
            {displayCategories && (
              <ul className="flex flex-col  font-semibold ml-4">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      to={`/productos/${category}`}
                      className="block p-2 rounded-md font-medium hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <hr />
          <div>
            <ul className="flex flex-col  font-semibold">
              <li>
                <Link
                  to="/carrito"
                  className="block p-2 rounded-md hover:bg-gray-100"
                >
                  Carrito
                </Link>
              </li>
              <li>
                <Link
                  to="/mis-pedidos"
                  className="block p-2 rounded-md hover:bg-gray-100"
                >
                  Mis Pedidos
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {isLogged && (
          <div
            className="w-full flex justify-center items-center gap-2 py-4"
            onClick={handleLogout}
          >
            <img
              src={logoutImg}
              alt="Cerrar sesión"
              className="w-6 h-6"
            />
            Cerrar sesión
          </div>
        )}
      </aside>
    </div>
  );
}
