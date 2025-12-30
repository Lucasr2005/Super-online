export const InputField = ({ label, type, name, value, onChange }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      className="w-full bg-gray-200 rounded-md p-2 "
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);
