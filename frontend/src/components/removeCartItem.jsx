import { useDispatch } from "react-redux";

export function RemoveCartItem({ productId, display }) {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch({ type: "@cart/removeProduct", payload: { id: productId } });
    display(false);
  };
  return (
    <section
      className="fixed top-0 left-0 w-full h-full bg-black/55 flex items-center justify-center z-50"
      onClick={() => display(false)}
    >
      <div className="bg-white py-10 w-full mx-5 rounded-lg">
        <h1 className="text-sm font-semibold text-center">
          Deseas eliminar el producto del carrito?
        </h1>
        <div className="flex justify-center gap-5 mt-5">
          <button
            className=" text-black py-2 px-4 rounded-md"
            onClick={() => display(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={handleRemoveItem}
          >
            Eliminar
          </button>
        </div>
      </div>
    </section>
  );
}
