export const handleLogout = ({ dispatch }) => {
    dispatch({ type: "@user/logoutUser" });
};