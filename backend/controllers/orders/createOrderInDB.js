import jwt from "jsonwebtoken";
import pool from "../../database/db.connection.js";

function validateOrderPayload({ cart, shippingPrice, address }) {
  if (!cart || !Array.isArray(cart) || cart.length === 0 || !shippingPrice) {
    return { error: true, message: "El carrito está vacío o no es válido.", status: 400 };
  }

  if (
    !address ||
    !address.street ||
    !address.houseNumber ||
    !address.homeType ||
    !address.city ||
    !address.state ||
    !address.country
  ) {
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
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
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
    [userId, deliveryAddress, address.homeType, address.apartmentNumber, shippingPrice, "Pending"],
  );
  return orderResult.rows[0].id;
}

async function addProductsToDbOrder(orderId, cart) {
  const productIds = cart.map((item) => item.id);
  const productsResult = await pool.query("SELECT * FROM products WHERE id = ANY($1)", [
    productIds,
  ]);

  if (productsResult.rows.length !== productIds.length) {
    const err = new Error("Uno o más productos en el carrito no fueron encontrados.");
    err.status = 404;
    throw err;
  }

  const productMap = new Map(productsResult.rows.map((p) => [p.id, p]));

  const orderItemsPromises = cart.map((item) => {
    const product = productMap.get(item.id);
    return pool.query(
      "INSERT INTO order_products (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)",
      [orderId, product.id, item.quantity, product.price],
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
