import { STATE_COLORS, OrderStateTag } from "./orderStateTag.jsx";

export function Order({ order, setSelectedOrder }) {
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(order.created_at));

  const stateColor = STATE_COLORS[order.state.toLowerCase()];

  return (
    <article
      className="bg-[#FFFFFF] rounded-md flex flex-col items-start shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] mx-5 my-3 p-3 gap-4 border-l-8"
      style={{ borderColor: stateColor }}
    >
      <OrderStateTag state={order.state} />
      <div>
        <h1 className="font-semibold">Pedido #{order.id.slice(0, 8)}</h1>
        <p className="text-sm opacity-75">{formattedDate}</p>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-blue-600  text-white  px-2 py-1 rounded-sm text-sm cursor-pointer"
          onClick={() => setSelectedOrder(order)}
        >
          Ver detalles
        </button>
      </div>
    </article>
  );
}
