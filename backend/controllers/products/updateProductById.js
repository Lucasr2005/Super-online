import pool from "../../database/db.connection.js"

export async function updateProductById(req, res) {
    const { id } = req.params
    const { name, category, brand, price, stock, image_url, sub_category } = req.body
    if (!name || !category || !brand || !price || !stock || !image_url || !sub_category) {
        return res.status(400).json({ message: "Datos inclompletos" })
    }
    try {
        const result = await pool.query("UPDATE products SET name=$1, category=$2, brand=$3, price=$4, stock=$5, image_url=$6, sub_category=$7 WHERE id=$8 RETURNING *", [name, category, brand, price, stock, image_url, sub_category, id])
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "No se ha podido actualizar el producto" })
        }
        const product = result.rows[0]
        return res.status(200).json({ message: `Producto ${product.name} actualizado con exito`, product })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ha ocurrido un error al actualizar el producto" })

    }
}
