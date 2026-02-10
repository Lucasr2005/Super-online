import { MercadoPagoConfig, Payment } from 'mercadopago';
import pool from "../../../database/db.connection.js";


export async function receiveWebhook(req, res) {
    const { body } = req;
    if (body.type === "payment") {
        const paymentId = body.data.id;

        try {
            const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
            const payment = new Payment(client);

            const paymentDetails = await payment.get({
                id: paymentId,
            });

            const orderId = paymentDetails.external_reference;
            const status = paymentDetails.status;

            if (status === "approved") {
                const approved = await pool.query("UPDATE orders SET state = $1 WHERE id = $2", [status, orderId]);
                if (approved) {
                    return res.status(200).json({ message: "El pago se ha aprobado." });
                }
            }
            else if (status === "rejected") {
                const declined = await pool.query("UPDATE orders SET state = $1 WHERE id = $2", [status, orderId]);
                if (declined) {
                    return res.status(200).json({ message: "El pago se ha rechazado." });
                }
            }

        } catch (error) {
            console.error("Error al obtener detalles del pago:", error);
            return res.status(500).json({ message: "Error al procesar el webhook." });
        }
    }
    res.sendStatus(200);
}