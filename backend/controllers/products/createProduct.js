import pool from "../../database/db.connection.js"

export async function createProduct(req, res) {
    const { name, category, brand, price, stock, img_name, sub_category } = req.body
    if (!name || !category || !brand || !price || !stock || !img_name || !sub_category) {
        return res.status(400).json({ message: "Datos inclompletos" })
    }
    try {
        const result = await pool.query("INSERT INTO products (name, category, brand, price, stock, img_name, sub_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, category, brand, price, stock, img_name, sub_category])
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "No se ha podido ingresar el producto" })
        }
        const product = result.rows[0]
        return res.status(200).json({ message: `Producto ${product.name} creado con exito` })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ha ocurrido un error al crear el producto" })

    }
}