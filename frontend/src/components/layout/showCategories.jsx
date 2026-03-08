import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleSetSidebar } from "./functions/setSidebar.js";
import { normalizeString } from "../../functions/normalizeString.js";

export function ShowCategories({ displayCategories }) {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  if (!displayCategories || !categories) return null;
  return (
    <ul className="flex flex-col  font-semibold ml-4">
      {categories.map((category) => (
        <li key={normalizeString(category.id)}>
          <Link
            onClick={() => handleSetSidebar({ dispatch })}
            to={`/productos/${normalizeString(category.name)}`}
            className="block p-2 rounded-md font-medium hover:bg-gray-100"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
