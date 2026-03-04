import { DisplayQuantity } from "../../../components/displayQuantity";
import { useState } from "react";
import { RemoveCartItem } from "../../../components/removeCartItem.jsx";

export function Product({ id, img_name, name, price, quantity }) {
  const [displayRemove, setDisplayRemove] = useState(false);

  const removeProduct = (id) => {
    setDisplayRemove(true);
  };
  const IMG_URL = import.meta.env.VITE_BACKEND_API_URL + "/public/products/" + img_name;

  return (
    <>
      {displayRemove && (
        <RemoveCartItem
          productId={id}
          display={setDisplayRemove}
        />
      )}
      <article className="bg-[#FFFFFF] rounded-md flex flex-row items-start shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)]">
        <section
          key={id}
          className="flex flex-row items-center gap-5 flex-1  p-3"
        >
          <img
            src={IMG_URL}
            alt=""
            className="w-24 mb-5 rounded-md aspect-square"
          />

          <div>
            <h2 className="w-full text-balance font-semibold opacity-75 line-clamp-2 mb-1">
              {name}
            </h2>
            <div className="mt-auto w-full">
              <p className="w-full">${price}</p>
              <DisplayQuantity
                quantity={quantity}
                id={id}
              />
            </div>
          </div>
        </section>
        <span
          className="flex justify-end pr-2 text-2xl"
          onClick={() => removeProduct(id)}
        >
          ×
        </span>
      </article>
    </>
  );
}
