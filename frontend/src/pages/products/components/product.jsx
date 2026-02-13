import { useDispatch, useSelector } from "react-redux";
import { DisplayQuantity } from "../../../components/displayQuantity.jsx";
const addProduct = (id, dispatch) => {
  if (id) {
    dispatch({ type: "@cart/addProduct", payload: { id } });
  }
};

export function Product({ id, image_url, name, price }) {
  const cartProduct = useSelector((state) => {
    return state.cart.find((product) => product.id === id);
  });

  const dispatch = useDispatch();
  return (
    <>
      <div
        key={id}
        className=" bg-[#FFFFFF] p-3 rounded-md flex flex-col items-center  shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] min-h-[340px]"
      >
        <img
          src={image_url}
          alt=""
          className="w-40 mb-5 rounded-md "
        />
        <h2 className="w-full text-balance font-semibold opacity-75 line-clamp-2 mb-1">{name}</h2>
        <p className="w-full">${price}</p>
        {cartProduct ? (
          <div className="mt-auto w-full flex justify-center flex-1">
            <DisplayQuantity
              quantity={cartProduct.quantity}
              id={id}
            />
          </div>
        ) : (
          <div className="mt-auto w-full">
            <button
              className="bg-[#007BFF] text-white p-2 my-3 w-full text-sm rounded-sm cursor-pointer"
              onClick={() => addProduct(id, dispatch)}
            >
              Agregar al carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
