import pool from "../../database/db.connection.js"

export async function getProductById(req, res) {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "Datos inclompletos" })
    }
    try {
        const result = await pool.query("SELECT * FROM products WHERE id=$1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se ha encontrado el producto" })
        }
        const product = result.rows[0]
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error al buscar el producto" })

    }
}