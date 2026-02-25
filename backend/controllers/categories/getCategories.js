import pool from "../../database/db.connection.js";
export async function getCategories(req, res) {
    try {
        const result = await pool.query("SELECT * FROM categories");
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se han encontrado categorias" });
        }
        const categories = result.rows;
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error al buscar las categorias" });
    }
} 