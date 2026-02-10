import pool from "../../database/db.connection.js"
import jwt from "jsonwebtoken";

export async function verifyToken(req, res) {
    const { auth_token } = req.cookies
    if (!auth_token) {
        return res.status(401).json({ message: "No se encontró token" });
    }

    try {
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        const result = await pool.query("SELECT id FROM users WHERE id=$1", [decoded.id]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Token inválido" });
        }

        return res.status(200).json({ message: "Token válido" });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token inválido" });
        }
        console.error("Error al verificar el token:", error);
        return res.status(500).json({ message: "Error interno al verificar el token." });
    }
}