import axios from "axios";
const URL_BASE = import.meta.env.VITE_BACKEND_API_URL

export async function getCategories() {
    try {
        const response = await axios.get(URL_BASE + "/categories", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(error.response?.data);
        throw new Error(error.response?.data || "Ocurrió un error al obtener las categorías.");
    }
}