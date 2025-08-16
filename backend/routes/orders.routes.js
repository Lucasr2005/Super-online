import express from "express"

const router = express.Router()

router.get("/orders", (req, res) => {
    res.send("Get orders")
})

export default router