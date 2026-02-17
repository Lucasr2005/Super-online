import { useEffect, useState } from "react";
import { getUserOrders } from "../../services/orders";

export function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getUserOrders().then((res) => setOrders(res));
  }, []);
  return <h1>Orders</h1>;
}
