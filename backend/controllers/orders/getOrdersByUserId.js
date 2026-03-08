import jwt from "jsonwebtoken";
import pool from "../../database/db.connection.js";

export async function getOrdersByUserId(req, res) {
    const { auth_token } = req.cookies
    if (!auth_token) {
        return res.status(401).json({ message: "No se encontró token" });
    }

    try {
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        const result = await pool.query("SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at ASC", [decoded.id]);
        return res.status(200).json(result.rows);
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token inválido" });
        }
        console.error("Error al verificar el token:", error);
        return res.status(500).json({ message: "Error interno al verificar el token." });
    }
}