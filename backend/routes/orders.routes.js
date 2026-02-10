import express from "express"
import { createMPOrder } from "../controllers/orders/mercadoPago/createMPOrder.js"
import { createOrder } from "../controllers/orders/createOrderInDB.js"
import { getShippingPrice } from "../controllers/orders/ShippingPrice.js"
import { receiveWebhook } from "../controllers/orders/mercadoPago/notificationWebHook.js"

const router = express.Router()

router.get("/orders", (req, res) => {
    res.send("Get orders")
})
router.post("/createOrder", createOrder)

router.post("/shippingPrice", getShippingPrice)

router.post("/mercadoPago", createMPOrder)

router.post("/mercadoPago/checkout", receiveWebhook);

export default router
