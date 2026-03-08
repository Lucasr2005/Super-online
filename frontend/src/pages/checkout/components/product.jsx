export function Product({ id, image_url, name, price, quantity }) {
  return (
    <>
      <article className="flex flex-row justify-between  items-center text-sm ">
        <span className="font-semibold w-6 text-center">{quantity}</span>
        <h2 className="text-balance opacity-75 line-clamp-1 max-w-[200px] w-[200px] md:max-w-[350px] md:min-w-[350px] md:line-clamp-1 md:text-base ">
          {name}
        </h2>
        <p className="font-semibold w-12">${price}</p>
      </article>
    </>
  );
}
