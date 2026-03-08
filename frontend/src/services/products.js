import axios from "axios";
const URL_BASE = import.meta.env.VITE_BACKEND_API_URL
export async function getProducts() {
    try {
        const response = await axios.get(`${URL_BASE}/products`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
