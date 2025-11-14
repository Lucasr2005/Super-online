import { DisplayOptions } from "./DisplayOptions";

export function DisplayCategory({ category, options }) {
  return (
    <div
      key={category}
      className="ml-2 mt-4"
    >
      <h3 className="text-lg font-semibold capitalize">{category}</h3>
      <section>
        <DisplayOptions options={options} />
      </section>
    </div>
  );
}
