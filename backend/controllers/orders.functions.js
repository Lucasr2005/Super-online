import axios from "axios";
import jwt from "jsonwebtoken";
const getCoordinatesFromAddress = async (address) => {
    const searchAddress = `${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country}`;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchAddress)}&format=geojson`;
    const geoResponse = await axios.get(nominatimUrl, {
        headers: {
            // Es importante proveer un User-Agent válido con un email de contacto real según la poiltica de Nominatim.
            'User-Agent': 'Super-Online-App/1.0 (lukisromero@hotmail.com.ar)'
        }
    });
    if (!geoResponse.data.features || geoResponse.data.features.length === 0) {
        return null;
    }
    return geoResponse.data.features[0].geometry.coordinates;
}

const getDistanceInMeters = async (STORE_COORDINATES, destinationCoordinates) => {
    const openRoutesUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTES_APY_KEY}&start=${STORE_COORDINATES.join(',')}&end=${destinationCoordinates.join(',')}`;
    const routeResponse = await axios.get(openRoutesUrl);
    if (!routeResponse.data.features || routeResponse.data.features.length === 0) {
        return null;
    }
    return routeResponse.data.features[0].properties.summary.distance;
}

const STORE_COORDINATES = [-58.6082141, -34.5624953];
const FUEL_CONSUMPTION_PER_METER = 0.0001;
const FUEL_PRICE = 1;
const ROUND_TRIP_MULTIPLIER = 2;
const MINIMUM_FEE = 5;

export async function getShippingPrice(req, res) {
    const { address } = req.body;

    if (!address || !address.street || !address.houseNumber || !address.city || !address.state || !address.country) {
        return res.status(400).send("La dirección está incompleta.");
    }

    try {
        const destinationCoordinates = await getCoordinatesFromAddress(address);
        if (!destinationCoordinates) {
            return res.status(404).send("No se pudieron encontrar las coordenadas para la dirección proporcionada. Verifique que sea correcta.");
        }
        const distanceInMeters = await getDistanceInMeters(STORE_COORDINATES, destinationCoordinates);
        if (!distanceInMeters) {
            return res.status(400).send("No se pudo calcular una ruta a la dirección proporcionada.");
        }

        const shippingPrice = Math.max(MINIMUM_FEE, distanceInMeters * ROUND_TRIP_MULTIPLIER * FUEL_CONSUMPTION_PER_METER * FUEL_PRICE);

        res.status(200).json({ price: Math.round(shippingPrice) });

    } catch (error) {
        console.error(error);
        if (error.config?.url?.includes('nominatim')) {
            return res.status(500).send("Ha ocurrido un error interno al obtener las coordenadas de la direccion");
        }
        res.status(500).send("Ha ocurrido un error al obtener el precio de envio");
    }
}

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import pool from "../database/db.connection.js";

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

function validateOrderPayload({ cart, shippingPrice, address }) {
    if (!cart || !Array.isArray(cart) || cart.length === 0 || !shippingPrice) {
        return { error: true, message: "El carrito está vacío o no es válido.", status: 400 };
    }

    if (!address || !address.street || !address.houseNumber || !address.homeType || !address.city || !address.state || !address.country) {
        return { error: true, message: "La dirección está incompleta.", status: 400 };
    }
    return { error: false };
}

function formatDeliveryAddress(address) {
    let deliveryAddress = `${address.street}, ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country}`;
    if (address.apartmentNumber) {
        deliveryAddress += `, Depto ${address.apartmentNumber}`;
    }
    return deliveryAddress;
}

async function getUserIdFromRequest(req) {
    const { auth_token } = req.cookies;
    if (!auth_token) {
        const err = new Error("Usuario no autenticado. No se encontró el token.");
        err.status = 401;
        throw err;
    }

    try {
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        const userResult = await pool.query("SELECT id FROM users WHERE id=$1", [decoded.id]);
        if (userResult.rows.length === 0) {
            const err = new Error("Usuario no autenticado o inválido.");
            err.status = 401;
            throw err;
        }
        return userResult.rows[0].id;
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            const err = new Error("Token inválido o expirado.");
            err.status = 401;
            throw err;
        }
        throw error; // Re-throw other errors
    }
}

async function createDbOrder({ userId, deliveryAddress, address, shippingPrice }) {
    const orderResult = await pool.query(
        "INSERT INTO orders (user_id, delivery_address, delivery_house_type, delivery_apartment_number, shipping_price, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [userId, deliveryAddress, address.homeType, address.apartmentNumber, shippingPrice, "Pending"]
    );
    return orderResult.rows[0].id;
}

async function addProductsToDbOrder(orderId, cart) {
    const productIds = cart.map(item => item.id);
    const productsResult = await pool.query("SELECT * FROM products WHERE id = ANY($1)", [productIds]);

    if (productsResult.rows.length !== productIds.length) {
        const err = new Error("Uno o más productos en el carrito no fueron encontrados.");
        err.status = 404;
        throw err;
    }

    const productMap = new Map(productsResult.rows.map(p => [p.id, p]));

    const orderItemsPromises = cart.map(item => {
        const product = productMap.get(item.id);
        return pool.query(
            "INSERT INTO order_products (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)",
            [orderId, product.id, item.quantity, product.price]
        );
    });

    await Promise.all(orderItemsPromises);
}

export async function createOrder(req, res) {
    try {
        const { cart, shippingPrice, address } = req.body;
        const validation = validateOrderPayload({ cart, shippingPrice, address });
        if (validation.error) {
            return res.status(validation.status).json({ message: validation.message });
        }


        const userId = await getUserIdFromRequest(req);
        const deliveryAddress = formatDeliveryAddress(address);

        const orderId = await createDbOrder({ userId, deliveryAddress, address, shippingPrice });
        await addProductsToDbOrder(orderId, cart);

        return res.status(201).json({ message: "Orden creada con éxito.", orderId });
    } catch (error) {
        console.error("Error al crear la orden:", error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno al crear la orden." });
    }
}