import axios from "axios";

const URL_BASE = "http://localhost:3000/api/register";

export const registerUser = async (user) => {
    try {
        const response = await axios.post(URL_BASE, user);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Ocurrió un error al registrar el usuario.");
    }
}
