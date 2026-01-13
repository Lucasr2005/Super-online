import express from "express"
import { createMPOrder, createOrder, getShippingPrice } from "../controllers/orders.functions.js";

const router = express.Router()

router.get("/orders", (req, res) => {
    res.send("Get orders")
})
router.post("/createOrder", createOrder)

router.post("/shippingPrice", getShippingPrice)

router.post("/mercadoPago", createMPOrder)

export default router

