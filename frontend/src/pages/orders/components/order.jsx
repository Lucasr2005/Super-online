const STATE_COLORS = {
  approved: "#A7D08C",
  pending: "#F4B183",
  rejected: "#E07A5F",
};
const STATE_LABELS = {
  approved: "Aprobado",
  pending: "Pendiente",
  rejected: "Rechazado",
};

export function Order({ order }) {
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(order.orderAt));

  const stateColor = STATE_COLORS[order.state.toLowerCase()];

  return (
    <article
      className="bg-[#FFFFFF] rounded-md flex flex-col items-start shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] mx-5 my-3 p-3 gap-4 border-l-8"
      style={{ borderColor: stateColor }}
    >
      <span
        className="gap-2 px-1 rounded-sm"
        style={{ backgroundColor: stateColor }}
      >
        {STATE_LABELS[order.state.toLowerCase()]}
      </span>
      <div>
        <h1 className="font-semibold">Pedido #{order.id.slice(0, 8)}</h1>
        <p className="text-sm opacity-75">{formattedDate}</p>
      </div>
      <div className="w-full flex justify-end">
        <button className="bg-blue-600  text-white  px-2 py-1 rounded-sm text-sm">
          Ver detalles
        </button>
      </div>
    </article>
  );
}
