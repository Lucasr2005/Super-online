import pool from "../../database/db.connection.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Datos incompletos." })
    }

    try {
        const findEmail = await pool.query("SELECT * FROM users WHERE email =$1", [email])
        if (findEmail.rows.length === 0) {

            return res.status(404).json({ message: "Datos incorrectos." })
        }

        const hashedPassword = findEmail.rows[0].password

        if (!await bcrypt.compare(password, hashedPassword)) {
            return res.status(401).json({ message: "Datos incorrectos." });
        }

        const id = findEmail.rows[0].id
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "Usuario logueado con éxito." })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ha ocurrido un error al buscar el usuario." })
    }
}