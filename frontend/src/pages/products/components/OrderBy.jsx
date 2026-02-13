import { OrderByOption } from "./OrderByOption";
import { useDispatch, useSelector } from "react-redux";

export function OrderBy() {
  const dispatch = useDispatch();
  const handleChangeOption = (e) => {
    dispatch({ type: "@filters/setOrderBy", payload: e.target.value });
  };
  const { orderBy } = useSelector((state) => state.filters);
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
            orderBy={orderBy}
          />
          <OrderByOption
            label="Precio descendente"
            name="order"
            value="priceDesc"
            onChange={handleChangeOption}
            orderBy={orderBy}
          />
          <OrderByOption
            label="Nombre ascendente"
            name="order"
            value="nameAsc"
            onChange={handleChangeOption}
            orderBy={orderBy}
          />
          <OrderByOption
            label="Nombre descendente"
            name="order"
            value="nameDesc"
            onChange={handleChangeOption}
            orderBy={orderBy}
          />
        </form>
      </section>
    </div>
  );
}
