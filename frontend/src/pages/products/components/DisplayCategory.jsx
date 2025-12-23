import { DisplayOptions } from "./DisplayOptions";

export function DisplayCategory({ category, options, setOption }) {
  return (
    <div
      key={category}
      className="ml-2 mt-4"
    >
      <h3 className="text-lg font-semibold capitalize">{category}</h3>
      <section>
        <DisplayOptions
          options={options}
          setOption={setOption}
          name={category}
        />
      </section>
    </div>
  );
}
