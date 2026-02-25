import express from "express"
import { getCategories } from "../controllers/categories/getCategories.js"
import { getCategoryImg } from "../controllers/categories/getCategoryImg.js"

const router = express.Router()

router.get("/categories", getCategories)

router.get("/category/:fileName", getCategoryImg)

export default router