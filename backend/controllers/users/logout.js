export function logout(req, res) {
    const auth_token = req.cookies.auth_token;
    if (!auth_token) {
        return res.status(401).json({ message: "No se encontró token" });
    }
    try {
        res.clearCookie("auth_token");
        res.status(200).json({ message: "Logout realizado con exito" });
    } catch (error) {
        console.error("Error al cerrar sesion:", error);
        res.status(500).json({ message: "Error interno al cerrar sesion." });
    }
}