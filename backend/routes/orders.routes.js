import express from "express"
import { createMPOrder, getShippingPrice } from "../controllers/orders.functions.js";

const router = express.Router()

router.get("/orders", (req, res) => {
    res.send("Get orders")
})

router.post("/shippingPrice", getShippingPrice)

router.post("/mercadoPago", createMPOrder)

export default router

