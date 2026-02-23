export function OrderProducts({ orderProducts, products }) {
  return (
    <>
      {orderProducts.map((orderProduct) => {
        const product = products.find((product) => product.id === orderProduct.product_id);
        return (
          <div
            className="flex p-2"
            key={orderProduct.id}
          >
            <p className="w-4">{orderProduct.quantity}</p>
            <p className="ml-2 flex-1">{product.name}</p>
            <p className="font-semibold">${product.price}</p>
          </div>
        );
      })}
    </>
  );
}
