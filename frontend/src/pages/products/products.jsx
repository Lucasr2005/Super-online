import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((response) => setProducts(response));
  }, []);
  return (
    <>
      <section className="max-w-screen my-10">
        <div className="grid grid-cols-2 mx-3 gap-y-5 gap-x-3">
          {products.map((product) => (
            <div
              key={product.id}
              className=" bg-[#FFFFFF] p-3 rounded-md flex flex-col items-center  shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)]"
            >
              <img
                src={product.image_url}
                alt=""
                className="w-40 mb-5 rounded-md "
              />
              <h2 className="w-full text-balance font-semibold opacity-75 line-clamp-2 mb-1">
                {product.name}
              </h2>
              <div className="mt-auto w-full">
                <p className="w-full">${product.price}</p>
                <button className="bg-[#007BFF] text-white p-2 my-3 w-full text-sm rounded-sm cursor-pointer">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Products;
