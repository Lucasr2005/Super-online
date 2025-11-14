export function DisplayOptions({ options }) {
  if (!options) {
    return;
  }
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
              id={option}
            />
            <label
              className="py-2 max-w-full w-full text-left text-md cursor-pointer"
              htmlFor={option}
            >
              {option}
            </label>
          </div>
        );
      })}
    </>
  );
}
