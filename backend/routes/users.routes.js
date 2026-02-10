import express from "express"
import { register } from "../controllers/users/register.js"
import { login } from "../controllers/users/login.js"
import { verifyToken } from "../controllers/users/verifyToken.js"
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/verifyToken", verifyToken)

export default router