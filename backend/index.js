import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors"
import productsRouter from "./routes/products.routes.js"
import usersRouter from "./routes/users.routes.js"
import ordersRouter from "./routes/orders.routes.js"
configDotenv({ quiet: true })
const app = express()

app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL] }))
app.use(express.json())
app.use("/api", productsRouter)
app.use("/api", usersRouter)
app.use("/api", ordersRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})