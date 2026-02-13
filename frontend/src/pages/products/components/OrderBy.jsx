import { OrderByOption } from "./OrderByOption";
import { useDispatch } from "react-redux";

export function OrderBy() {
  const dispatch = useDispatch();
  const handleChangeOption = (e) => {
    dispatch({ type: "@filters/setOrderBy", payload: e.target.value });
  };
  return (
    <div className="ml-2 mt-4 ">
      <h3 className="text-lg font-semibold ">Ordenar por</h3>
      <section className="flex flex-col ml-4 ">
        <form>
          <OrderByOption
            label="Precio ascendente"
            name="order"
            value="priceAsc"
            onChange={handleChangeOption}
          />
          <OrderByOption
            label="Precio descendente"
            name="order"
            value="priceDesc"
            onChange={handleChangeOption}
          />
          <OrderByOption
            label="Nombre ascendente"
            name="order"
            value="NameAsc"
            onChange={handleChangeOption}
          />
          <OrderByOption
            label="Nombre descendente"
            name="order"
            value="NameDesc"
            onChange={handleChangeOption}
          />
        </form>
      </section>
    </div>
  );
}
