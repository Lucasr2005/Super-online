import express from "express"

const router = express.Router()

router.get("/users", (req, res) => {
    res.send("Get users")
})

export default router