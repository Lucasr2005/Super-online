import { useEffect, useState } from "react";
import { getOrderProducts, getUserOrders } from "../../services/orders.js";
import { Order } from "./components/order.jsx";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  useEffect(() => {
    getUserOrders().then((res) => setOrders(res.reverse()));
  }, []);

  useEffect(() => {
    if (!selectedOrder) return;
    getOrderProducts(selectedOrder.id).then((res) => setOrderProducts(res));
  }, [selectedOrder]);
  return (
    <>
      <h1 className="text-2xl m-5 font-semibold">Mis pedidos</h1>
      <div className="my-5">
        {orders.map((order) => (
          <Order
            key={order.id}
            order={order}
            setSelectedOrder={setSelectedOrder}
          />
        ))}
      </div>
    </>
  );
}
