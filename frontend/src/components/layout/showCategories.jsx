import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleSetSidebar } from "./functions/setSidebar.js";

export function ShowCategories({ displayCategories }) {
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) return;
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    setCategories(uniqueCategories);
  }, [products]);

  if (!displayCategories) return null;
  return (
    <ul className="flex flex-col  font-semibold ml-4">
      {categories.map((category) => (
        <li key={category}>
          <Link
            onClick={() => handleSetSidebar({ dispatch })}
            to={`/productos/${category}`}
            className="block p-2 rounded-md font-medium hover:bg-gray-100"
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
