import pool from "../database/db.connection.js"
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "Usuario creado con éxito" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ha ocurrido un error al registrar el usuario" })
    }
}

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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "Usuario logueado con éxito." })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ha ocurrido un error al buscar el usuario." })
    }
}

export async function verifyToken(req, res) {
    const { auth_token } = req.cookies
    if (!auth_token) {
        return res.status(401).json({ message: "No se encontró token" });
    }

    try {
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        const result = await pool.query("SELECT id FROM users WHERE id=$1", [decoded.id]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Token inválido" });
        }

        return res.status(200).json({ message: "Token válido" });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token inválido" });
        }
        console.error("Error al verificar el token:", error);
        return res.status(500).json({ message: "Error interno al verificar el token." });
    }
}