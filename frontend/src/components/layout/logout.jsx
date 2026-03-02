import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "./functions/logoutUser.js";
import { handleSetSidebar } from "./functions/setSidebar.js";
import { Power } from "lucide-react";

export function Logout() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);
  if (!isLogged) return null;
  return (
    <div
      className="w-full flex justify-center items-center gap-2 py-4"
      onClick={() => {
        (handleLogout({ dispatch }), handleSetSidebar({ dispatch }));
      }}
    >
      <Power size={24} />
      <p>Cerrar sesión</p>
    </div>
  );
}
