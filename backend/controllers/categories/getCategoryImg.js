import path from "path";
import { cache } from "../../cache.js"

export async function getCategoryImg(req, res) {
    const { fileName } = req.params;
    try {
        if (cache.has(`category_img_${fileName}`)) {
            const cachedFilePath = cache.get(`category_img_${fileName}`);
            return res.sendFile(cachedFilePath);
        }
        const filePath = path.join(process.cwd(), "public", "assets", "categories", fileName);
        cache.set(`category_img_${fileName}`, filePath);
        res.sendFile(filePath);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error al buscar la imagen" });
    }
}