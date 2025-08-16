import pool from "../database/db.connection.js"

export async function createProduct(req, res) {
    const { name, category, brand, price, stock, image_url, sub_category } = req.body
    if (!name || !category || !brand || !price || !stock || !image_url || !sub_category) {
        return res.status(400).json({ message: "Datos inclompletos" })
    }
    try {
        const result = await pool.query("INSERT INTO products (name, category, brand, price, stock, image_url, sub_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, category, brand, price, stock, image_url, sub_category])
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

export async function getProducts(req, res) {
    try {
        const result = await pool.query("SELECT * FROM products")
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se han encontrado productos" })
        }
        const products = result.rows
        return res.status(200).json(products)

    } catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error al buscar los productos" })

    }
}

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

