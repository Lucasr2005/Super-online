import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors"
configDotenv({ quiet: true })
const app = express()

app.use(cors())
app.use(express.json())
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})