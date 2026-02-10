import { MercadoPagoConfig, Preference } from 'mercadopago';
import pool from "../../../database/db.connection.js";

const setItems = (products, cart, shippingPrice) => {
    const items = products.map(item => ({
        title: item.name,
        quantity: cart.get(item.id),
        unit_price: Number(item.price),
        currency_id: "ARS"
    }))
    items.push({
        title: "Envio",
        quantity: 1,
        unit_price: Number(shippingPrice),
        currency_id: "ARS"
    })
    return items
}

export async function createMPOrder(req, res) {
    const { cart, shippingPrice, orderId } = req.body;
    if (!cart || !Array.isArray(cart) || cart.length === 0 || !shippingPrice || !orderId) {
        return res.status(400).json({ message: "El carrito está vacío, no es válido o falta el ID de la orden." });
    }
    const ids = cart.map(item => item.id);
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = ANY($1)", [ids])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se han encontrado los productos" })
        }

        const products = result.rows
        const cartMap = new Map(cart.map(p => [p.id, p.quantity]));
        const items = setItems(products, cartMap, shippingPrice);

        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const preference = new Preference(client);

        const resultMP = await preference.create({
            body: {
                items,
                back_urls: {
                    success: process.env.MP_SUCCESS,
                    failure: process.env.MP_FAILURE,
                    pending: process.env.MP_PENDING
                },
                auto_return: "approved",
                external_reference: orderId,
            }
        });
        if (!resultMP) {
            return res.status(500).send("Ha ocurrido un error al crear la orden");
        }
        return res.status(200).json({ preference_id: resultMP.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error interno al crear la orden");
    }
}