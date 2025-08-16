import express from "express"
import { createProduct, getProducts, getProductById } from "../controllers/products.functions.js"
const router = express.Router()

router.post("/products", createProduct)
router.get("/products", getProducts)
router.get("/products/:id", getProductById)

export default router