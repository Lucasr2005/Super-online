import express from "express"

const router = express.Router()

router.get("/products", (req, res) => {
    res.send("Get products")
})

export default router