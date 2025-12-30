import { useDispatch } from "react-redux";
import { DisplayQuantity } from "../../components/displayQuantity";

export function Product({ id, image_url, name, price, quantity }) {
  const dispatch = useDispatch();

  const removeProduct = (id) => {
    const ok = window.confirm("Desea eliminar el producto del carrito?");
    if (!ok) return;
    dispatch({ type: "@cart/removeProduct", payload: { id } });
  };

  return (
    <>
      <article className="bg-[#FFFFFF] rounded-md flex flex-row items-start shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)]">
        <section
          key={id}
          className="flex flex-row items-center gap-5 flex-1  p-3"
        >
          <img
            src={image_url}
            alt=""
            className="w-24 mb-5 rounded-md "
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
