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
              className=" bg-white p-3 rounded-md flex flex-col items-center  border-solid border-gray-400 border-1"
            >
              <img
                src={product.image_url}
                alt=""
                className="w-40 mb-5 rounded-md "
              />
              <h2 className="w-full  ">{product.name}</h2>
              <div className="mt-auto w-full">
                <p className="w-full">{product.price}</p>
                <button className="bg-gray-900 text-white p-2 w-full text-sm">
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
