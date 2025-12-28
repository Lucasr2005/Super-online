import axios from "axios";
const URL_BASE = "http://localhost:3000/api/shippingPrice";
export async function getShippingPrice(address) {

    const completeAddress = {
        ...address,
        state: "Buenos Aires",
        country: "Argentina"
    };
    try {

        const response = await axios.post(URL_BASE, { address: completeAddress });
        return response.data;
    } catch (error) {
        console.error(error);
        return "error";
    }
}
