import { useEffect, useState } from "react";
import { getUserOrders } from "../../services/orders.js";
import { Order } from "./components/order.jsx";

export function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getUserOrders().then((res) => setOrders(res.reverse()));
  }, []);
  return (
    <>
      <h1 className="text-2xl m-5 font-semibold">Mis pedidos</h1>
      <div className="my-5">
        {orders.map((order) => (
          <Order
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </>
  );
}
