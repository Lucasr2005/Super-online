import axios from "axios";
const URL_BASE = import.meta.env.VITE_BACKEND_API_URL
export async function getShippingPrice(address) {

    const completeAddress = {
        ...address,
        state: "Buenos Aires",
        country: "Argentina"
    };
    try {

        const response = await axios.post(URL_BASE + "/shippingPrice", { address: completeAddress });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data || "Ocurrió un error al calcular el precio de envío.");
    }
}

export async function createMPOrder(cart, shippingPrice, orderId) {
    try {
        const response = await axios.post(URL_BASE + "/mercadoPago", { cart, shippingPrice, orderId }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data || "Ocurrió un error al crear la orden.");
    }
}

export async function createOrder(cart, shippingPrice, address) {
    const completeAddress = {
        ...address,
        state: "Buenos Aires",
        country: "Argentina"
    };
    try {
        const response = await axios.post(URL_BASE + "/createOrder", { cart, shippingPrice, address: completeAddress }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(error.response?.data);
        throw new Error(error.response?.data || "Ocurrió un error al crear la orden.");
    }
}

export async function getUserOrders() {
    try {
        const response = await axios.get(URL_BASE + "/ordersByUserId", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(error.response?.data);
        throw new Error(error.response?.data || "Ocurrió un error al obtener las ordenes.");
    }
}

export async function getOrderProducts(orderId) {
    try {
        const response = await axios.get(URL_BASE + "/ordersById" + "/" + orderId, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(error.response?.data);
        throw new Error(error.response?.data || "Ocurrió un error al obtener los productos de la orden.");
    }
}