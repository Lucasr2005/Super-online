import { useSelector } from "react-redux";

export function DisplayOptions({ options, setOption, name }) {
  if (!options) {
    return <p>No sea han encontrado opciones</p>;
  }
  const handleChange = (e) => {
    setOption(e.target.value);
  };
  const subCategory = useSelector((state) => state.filters.subCategory);
  const brand = useSelector((state) => state.filters.brand);
  return (
    <>
      {options.map((option) => {
        return (
          <div
            className="flex gap-x-2 "
            key={option}
          >
            <input
              className="ml-4 w-5 cursor-pointer"
              type="checkbox"
              name={name}
              id={`${name}-${option}`}
              value={option}
              onChange={handleChange}
              checked={subCategory.includes(option) || brand.includes(option)}
            />
            <label
              className="py-2 max-w-full w-full text-left text-md cursor-pointer"
              htmlFor={`${name}-${option}`}
            >
              {option}
            </label>
          </div>
        );
      })}
    </>
  );
}
