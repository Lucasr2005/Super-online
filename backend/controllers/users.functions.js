import pool from "../database/db.connection.js"
import passwordHash from "password-hash"

export async function register(req, res) {
    const { name, lastName, email, password } = req.body

    if (!name || !lastName || !email || !password) {
        return res.status(400).send("Datos incompletos")
    }

    try {
        const hashedPassword = passwordHash.generate(password)

        const result = await pool.query("INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id", [name, lastName, email, hashedPassword])

        if (result.rows.length === 0) {
            return res.status(500).send("Ha ocurrido un error al crear el usuario")
        }

        return res.status(201).json({ message: "Usuario creado con éxito" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ha ocurrido un error al registrar el usuario" })
    }
}