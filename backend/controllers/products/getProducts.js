import pool from "../../database/db.connection.js"

export async function getProducts(req, res) {
    try {
        const result = await pool.query("SELECT p.*,c.name AS category FROM products p INNER JOIN categories c ON p.category_id = c.id")
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se han encontrado productos" })
        }
        const products = result.rows
        return res.status(200).json(products)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ha ocurrido un error al buscar los productos" })

    }
}