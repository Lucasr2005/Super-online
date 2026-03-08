import express from "express"
import { configDotenv } from "dotenv"
import { fileURLToPath } from "url"
import path from "path"
import cors from "cors"
import productsRouter from "./routes/products.routes.js"
import usersRouter from "./routes/users.routes.js"
import ordersRouter from "./routes/orders.routes.js"
import cookieParser from "cookie-parser"
import categoriesRouter from "./routes/categories.routes.js"

configDotenv({ quiet: true })
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL] }))

app.use(express.json())
app.use(cookieParser())

app.use("/api/public/products", express.static(path.join(__dirname, "public/assets/products")))
app.use("/api/public/category", express.static(path.join(__dirname, "public/assets/categories")))

app.use("/api", productsRouter)
app.use("/api", usersRouter)
app.use("/api", ordersRouter)
app.use("/api", categoriesRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})

export default app
