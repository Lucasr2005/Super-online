import { OrderByOption } from "./OrderByOption";

export function OrderBy() {
  return (
    <div className="ml-2 mt-4 ">
      <h3 className="text-lg font-semibold capitalize">Ordenar Por</h3>
      <section className="flex flex-col ml-4 ">
        <form>
          <OrderByOption
            label="Menor precio"
            name="order"
            value="priceAsc"
          />
          <OrderByOption
            label="Mayor precio"
            name="order"
            value="priceDesc"
          />
          <OrderByOption
            label="Nombre ascendente"
            name="order"
            value="NameAsc"
          />
          <OrderByOption
            label="Nombre descendente"
            name="order"
            value="NameDesc"
          />
        </form>
      </section>
    </div>
  );
}
