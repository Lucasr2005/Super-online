import express from "express"
import { createProduct } from "../controllers/products.functions.js"
const router = express.Router()

router.post("/products", createProduct)

export default router