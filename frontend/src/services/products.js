import axios from "axios";
const URL_BASE = "http://localhost:3000/api/products";
export async function getProducts() {
    try {
        const response = await axios.get(URL_BASE);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
