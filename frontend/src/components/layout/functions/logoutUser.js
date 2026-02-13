import { logout } from "../../../services/users.js";

export const handleLogout = ({ dispatch }) => {
    logout();
    dispatch({ type: "@user/logoutUser" });
};