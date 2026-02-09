export function Product({ id, image_url, name, price, quantity }) {
  return (
    <>
      <article className="flex flex-row justify-between  items-center text-sm ">
        <span className="font-semibold w-6 text-start">{quantity}</span>
        <h2 className="text-balance opacity-75 line-clamp-1 max-w-[200px] w-[200px]">{name}</h2>
        <p className="font-semibold w-12">${price}</p>
      </article>
    </>
  );
}
