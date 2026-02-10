import express from "express"
import { createMPOrder, createOrder, getShippingPrice, receiveWebhook } from "../controllers/orders.functions.js";

const router = express.Router()

router.get("/orders", (req, res) => {
    res.send("Get orders")
})
router.post("/createOrder", createOrder)

router.post("/shippingPrice", getShippingPrice)

router.post("/mercadoPago", createMPOrder)

router.post("/mercadoPago/checkout", receiveWebhook);

export default router
