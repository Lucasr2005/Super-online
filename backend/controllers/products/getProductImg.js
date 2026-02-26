import path from "path";
export async function getProductImg(req, res) {
    const { fileName } = req.params;
    try {
        const filePath = path.join(process.cwd(), "public", "assets", "products", fileName);
        res.sendFile(filePath);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error al buscar la imagen" });
    }
}