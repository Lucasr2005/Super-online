import { Link } from "react-router-dom";
import { normalizeString } from "../../../functions/normalizeString.js";

export function Category({ category, count, icon: Icon }) {
  return (
    <Link
      to={`/productos/${normalizeString(category)}`}
      className="group bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center aspect-square w-[100px]"
    >
      {Icon && (
        <Icon
          className="w-8 h-8 mb-3 text-primary transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
      )}
      <h3 className="font-semibold text-foreground text-sm leading-tight">{category}</h3>
      <p className="text-xs text-muted-foreground mt-1">
        {count} {count === 1 ? "producto" : "productos"}
      </p>
    </Link>
  );
}
