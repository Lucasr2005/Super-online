import { useEffect, useState } from "react";
import { getOrderProducts, getUserOrders } from "../../services/orders.js";
import { Order } from "./components/order.jsx";
import { OrderDetails } from "./components/orderDetails.jsx";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  useEffect(() => {
    getUserOrders().then((res) => setOrders(res.reverse()));
  }, []);

  useEffect(() => {
    if (!selectedOrder) {
      document.body.style.overflow = "auto";
      return;
    } else {
      document.body.style.overflow = "hidden";
    }
    getOrderProducts(selectedOrder.id).then((res) => setOrderProducts(res));
  }, [selectedOrder]);
  const handleClose = () => {
    setSelectedOrder(null);
    setOrderProducts([]);
  };

  return (
    <>
      <OrderDetails
        order={selectedOrder}
        orderProducts={orderProducts}
        handleClose={handleClose}
      />
      <h1 className="text-2xl m-5 font-semibold">Mis pedidos</h1>
      <div className="my-5 md:grid md:grid-cols-2  gap-4">
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
