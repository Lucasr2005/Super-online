export function Product({ id, image_url, name, price }) {
  return (
    <>
      <div
        key={id}
        className=" bg-[#FFFFFF] p-3 rounded-md flex flex-col items-center  shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)]"
      >
        <img
          src={image_url}
          alt=""
          className="w-40 mb-5 rounded-md "
        />
        <h2 className="w-full text-balance font-semibold opacity-75 line-clamp-2 mb-1">{name}</h2>
        <div className="mt-auto w-full">
          <p className="w-full">${price}</p>
          <button className="bg-[#007BFF] text-white p-2 my-3 w-full text-sm rounded-sm cursor-pointer">
            Agregar al carrito
          </button>
        </div>
      </div>
    </>
  );
}
