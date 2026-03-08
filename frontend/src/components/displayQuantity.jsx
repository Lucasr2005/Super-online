import { useDispatch } from "react-redux";
import { Plus, Minus } from "lucide-react";
import { toast } from "react-hot-toast";
import { RemoveCartItem } from "./removeCartItem.jsx";
import { useState } from "react";

export function DisplayQuantity({ quantity, id }) {
  const [displayRemove, setDisplayRemove] = useState(false);
  const dispatch = useDispatch();
  const incrementQuantity = (id) => {
    if (quantity >= 10) {
      toast.error("No se puede agregar mas de 10 productos al carrito");
      return;
    }
    dispatch({ type: "@cart/addProduct", payload: { id } });
  };
  const decreaseQuantity = (id) => {
    if (quantity === 1) {
      setDisplayRemove(true);
      return;
    }
    dispatch({ type: "@cart/decreaseQuantity", payload: { id } });
  };
  return (
    <>
      {displayRemove && (
        <RemoveCartItem
          productId={id}
          display={setDisplayRemove}
        />
      )}
      <div className="rounded-lg flex items-center">
        <button
          className="px-2  text-2xl cursor-pointer rounded-full"
          onClick={() => decreaseQuantity(id)}
        >
          <Minus size={18} />
        </button>
        <span className="text-base mx-2">{quantity}</span>
        <button
          className="px-2 py-1 cursor-pointer rounded-full "
          onClick={() => incrementQuantity(id)}
        >
          <Plus size={18} />
        </button>
      </div>
    </>
  );
}
