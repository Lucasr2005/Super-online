import { useState } from "react";
import { ShippingAddressForm } from "./ShippingAddressForm";
export function ShippingAddress({ address, setAddress }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <>
      <section className="mx-5 flex-col my-5 bg-[#FFFFFF] rounded-md shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.1)] p-3 gap-5 py-4 mb-80">
        <h2 className="text-xl font-semibold">Dirección de envío</h2>
        {Object.keys(address).length === 0 ? (
          <button
            className="bg-black opacity-85  text-white p-2 rounded-lg w-fit mt-5 "
            onClick={() => setIsFormVisible(true)}
          >
            Agregar dirección
          </button>
        ) : (
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
        )}
      </section>
      {isFormVisible && (
        <ShippingAddressForm
          address={address}
          onSave={handleSaveAddress}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </>
  );
}
