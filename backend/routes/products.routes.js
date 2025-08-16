import express from "express"
import { createProduct, getProducts, getProductById, deleteProductById, updateProductById } from "../controllers/products.functions.js"
const router = express.Router()

router.post("/products", createProduct)
router.get("/products", getProducts)
router.get("/products/:id", getProductById)
router.put("/products/:id", updateProductById)
router.delete("/products/:id", deleteProductById)

export default router