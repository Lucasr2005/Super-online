import { useState } from "react";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { useSelector } from "react-redux";
export function ShippingAddress() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { address, isAddressSet } = useSelector((state) => state.delivery);
  return (
    <>
      <section className="mx-5 flex-col my-5 bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] p-3 gap-5 py-4">
        <h2 className="text-xl font-semibold">Dirección de envío</h2>
        {isAddressSet ? (
          <div className="mt-4 text-gray-700">
            <p>
              {address.street}, {address.houseNumber}
            </p>
            {address.apartment && <p>Departamento {address.apartment}</p>}
            <p>{address.city}</p>
            <button
              className="text-blue-600 hover:underline mt-2 font-semibold"
              onClick={() => setIsFormVisible(true)}
            >
              Editar dirección
            </button>
          </div>
        ) : (
          <button
            className="bg-black opacity-85  text-white py-2 px-4 rounded-lg w-fit mt-5 "
            onClick={() => setIsFormVisible(true)}
          >
            Agregar dirección
          </button>
        )}
      </section>
      {isFormVisible && <ShippingAddressForm onClose={() => setIsFormVisible(false)} />}
    </>
  );
}
