import axios from "axios";
const URL_BASE = "http://localhost:3000/api";
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

export async function createMPOrder(cart, shippingPrice) {
    try {
        const response = await axios.post(URL_BASE + "/mercadoPago", { cart, shippingPrice });
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