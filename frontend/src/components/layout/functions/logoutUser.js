import { logout } from "../../../services/users.js";
import { toast } from "react-hot-toast";

export const handleLogout = ({ dispatch }) => {
    logout();
    dispatch({ type: "@user/logoutUser" });
    toast.success("Sesión cerrada correctamente");
};