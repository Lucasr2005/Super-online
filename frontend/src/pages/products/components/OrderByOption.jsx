export function OrderByOption({ label, name, value, onChange }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        onChange={onChange}
        required
        className="h-4 aspect-square"
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
}
