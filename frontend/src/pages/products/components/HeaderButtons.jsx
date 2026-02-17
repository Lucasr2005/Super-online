import { useDispatch } from "react-redux";
import filterImg from "../images/filter.png";

export function HeaderButtons() {
  const dispatch = useDispatch();
  return (
    <header className="flex justify-center gap-4 mx-3 mt-5 ">
      <div
        className="bg-white rounded-md w-full h-12 flex justify-center items-center py-2  gap-2  border-[#eae9e9] mt-2 shadow-[3px_2px_10px_3px_#00000024] cursor-pointer "
        onClick={() => dispatch({ type: "@filters/setDisplay", payload: true })}
      >
        <p>Filtrar y ordenar</p>
        <img
          className="w-5"
          src={filterImg}
        />
      </div>
    </header>
  );
}
