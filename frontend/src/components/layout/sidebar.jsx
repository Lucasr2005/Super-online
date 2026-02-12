import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { handleSetSidebar } from "./functions/setSidebar.js";
import { Logout } from "./logout.jsx";
import { MenuOptions } from "./menuOptions.jsx";

export function SideBar() {
  const { displaySideBar } = useSelector((state) => state.layout);
  useEffect(() => {
    if (displaySideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [displaySideBar]);

  const dispatch = useDispatch();

  if (!displaySideBar) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => handleSetSidebar({ dispatch })}
      ></div>

      <aside className="relative z-10 w-4/5 max-w-xs bg-white h-full shadow-xl flex flex-col">
        <header className="p-4 border-b">
          <Link
            to="/"
            className="text-xl font-semibold text-blue-800"
            onClick={() => handleSetSidebar({ dispatch })}
          >
            Súper Online
          </Link>
        </header>
        <MenuOptions />
        <Logout />
      </aside>
    </div>
  );
}
