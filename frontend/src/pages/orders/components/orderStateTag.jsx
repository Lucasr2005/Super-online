export const STATE_COLORS = {
  approved: "#A7D08C",
  pending: "#F4B183",
  rejected: "#C94C4C",
};
const STATE_LABELS = {
  approved: "Aprobado",
  pending: "Pendiente",
  rejected: "Rechazado",
};

export function OrderStateTag({ state }) {
  const stateColor = STATE_COLORS[state.toLowerCase()];

  return (
    <span
      className="gap-2 px-1 rounded-sm w-fit"
      style={{ backgroundColor: stateColor }}
    >
      {STATE_LABELS[state.toLowerCase()]}
    </span>
  );
}
