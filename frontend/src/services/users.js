import axios from "axios";

const URL_BASE = "http://localhost:3000/api";

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${URL_BASE}/register`, user, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Ocurrió un error al registrar el usuario.");
    }
}

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${URL_BASE}/login`, user, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Ocurrió un error al logear el usuario.");
    }
}

export const verifyToken = async () => {
    try {
        const response = await axios.get(`${URL_BASE}/verifyToken`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Ocurrió un error al verificar el token.");
    }
}
