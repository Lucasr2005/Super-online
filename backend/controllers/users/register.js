import pool from "../../database/db.connection.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    const { name, lastName, email, password } = req.body

    if (!name || !lastName || !email || !password) {
        return res.status(400).json({ message: "Datos incompletos" })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
    }

    try {
        const findEmail = await pool.query("SELECT email FROM users WHERE email =$1", [email])
        if (findEmail.rows.length > 0) {

            return res.status(409).json({ message: "El email ya se encuentra registrado." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query("INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id", [name, lastName, email, hashedPassword])

        if (result.rows.length === 0) {
            return res.status(500).json({ message: "Ha ocurrido un error al crear el usuario" })
        }

        const id = result.rows[0].id
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "Usuario creado con éxito" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ha ocurrido un error al registrar el usuario" })
    }
}