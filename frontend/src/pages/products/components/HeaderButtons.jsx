import { useDispatch } from "react-redux";
import filterImg from "../images/filter.png";
import orderByImg from "../images/orderBy.png";
export function HeaderButtons() {
  const dispatch = useDispatch();
  return (
    <header className="flex justify-center gap-4 mx-2 mt-5 ">
      <div
        className="bg-white rounded-md w-1/2 h-12 flex justify-center items-center py-2  gap-2  border-[#eae9e9] mt-2 shadow-[3px_2px_10px_3px_#00000024] cursor-pointer "
        onClick={() => dispatch({ type: "@filters/setDisplay", payload: true })}
      >
        <p>Agregar filtros</p>
        <img
          className="w-5"
          src={filterImg}
          alt=""
        />
      </div>
      <div className="bg-white rounded-md w-1/2 flex justify-center items-center py-2  gap-2  border-[#eae9e9] mt-2 shadow-[3px_2px_10px_3px_#00000024] cursor-pointer ">
        <p className=" xl:text-xl">Ordenar por</p>
        <img
          className="w-5"
          src={orderByImg}
          alt=""
        />
      </div>
    </header>
  );
}
