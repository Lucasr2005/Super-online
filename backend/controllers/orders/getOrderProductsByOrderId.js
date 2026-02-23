import pool from "../../database/db.connection.js";

export async function getOrderProductsByOrderId(req, res) {
    const { auth_token } = req.cookies
    const { orderId } = req.params
    if (!auth_token) {
        return res.status(401).json({ message: "No se encontró token" });
    }

    try {
        const result = await pool.query("SELECT * FROM order_products WHERE order_id=$1", [orderId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se han encontrado productos" })
        }
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error al buscar los productos" });
    }
}