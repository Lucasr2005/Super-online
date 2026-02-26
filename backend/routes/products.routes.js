import express from "express"
import { createProduct } from "../controllers/products/createProduct.js"
import { getProducts } from "../controllers/products/getProducts.js"
import { getProductById } from "../controllers/products/getProductById.js"
import { updateProductById } from "../controllers/products/updateProductById.js"
import { deleteProductById } from "../controllers/products/deleteProductById.js"
import { getProductImg } from "../controllers/products/getProductImg.js"
const router = express.Router()

router.post("/products", createProduct)
router.get("/products", getProducts)
router.get("/products/:id", getProductById)
router.put("/products/:id", updateProductById)
router.delete("/products/:id", deleteProductById)

router.get("/public/products/:fileName", getProductImg)

export default router