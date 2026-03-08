import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export function ShippingAddressForm({ onClose }) {
  const [formData, setFormData] = useState(useSelector((state) => state.delivery.address));
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.homeType) {
      toast.error("Debes seleccionar un tipo de vivienda (Casa o Departamento).");
      return;
    }
    dispatch({ type: "@delivery/setAddress", payload: formData });
    document.body.style.overflow = "auto";
    onClose();
  };

  return (
    <div className="fixed lg:bg-black/55 w-full h-screen flex items-center justify-center top-16 left-0 z-50 lg:top-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white min-h-screen max-h-screen justify-center pb-16 w-full px-4 py-4 flex flex-col gap-y-3  lg:max-w-1/2 lg:rounded-lg lg:shadow-lg lg:px-10 lg:py-8 lg:justify-between lg:min-h-[90vh] lg:max-h-[90vh] lg:my-16"
      >
        <h1 className=" text-xl w-full text-center">Dirección de envío</h1>
        <div className="w-full flex justify-center gap-x-5 my-2">
          <button
            type="button"
            className={`w-1/2 justify-center text-lg py-3 px-4 rounded-lg border-2 transition-all border-gray-200 cursor-pointer ${
              formData.homeType === "House" ? " border-green-400" : ""
            }`}
            name="homeType"
            value="House"
            onClick={handleChange}
          >
            Casa
          </button>
          <button
            type="button"
            className={`w-1/2 justify-center text-lg py-3 px-4 rounded-lg border-2 transition-all border-gray-200 cursor-pointer ${
              formData.homeType === "Apartment" ? " border-green-400" : ""
            }`}
            name="homeType"
            value="Apartment"
            onClick={handleChange}
          >
            Departamento
          </button>
        </div>
        <section className="flex gap-x-5">
          <div>
            <label htmlFor="street">Calle</label>
            <input
              id="street"
              className="bg-[#d9d9d9] outline-0 w-full rounded-lg py-3 px-5 "
              type="text"
              name="street"
              placeholder="Calle"
              value={formData.street || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="houseNumber">Número</label>
            <input
              id="houseNumber"
              className="bg-[#d9d9d9] outline-0 w-full rounded-lg py-3 px-5 "
              type="number"
              name="houseNumber"
              placeholder="Número"
              value={formData.houseNumber || ""}
              onChange={handleChange}
              required
            />
          </div>
        </section>
        {formData.homeType === "Apartment" && (
          <div>
            <label htmlFor="apartment">Departamento</label>
            <input
              id="apartment"
              className="bg-[#d9d9d9] outline-0 w-full rounded-lg py-3 px-5  "
              type="text"
              name="apartment"
              placeholder="Departamento"
              value={formData.apartment || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="city">Ciudad</label>
          <input
            id="city"
            className="bg-[#d9d9d9] outline-0 w-full rounded-lg py-3 px-5 "
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formData.city || ""}
            onChange={handleChange}
            required
          />
        </div>

        <section className="flex flex-col gap-x-5 ">
          <label htmlFor="instruction">Instrucciones</label>
          <textarea
            id="instruction"
            className="bg-[#d9d9d9] outline-0 w-full rounded-lg py-3 px-5 "
            name="instruction"
            maxLength={100}
            placeholder="Ej: No hay timbre, apaludir."
            value={formData.instruction || ""}
            onChange={handleChange}
          ></textarea>
        </section>
        <footer className="flex gap-x-5">
          <button
            className="  text-lg text-black px-5 py-3 w-full mt-5 hover:underline cursor-pointer "
            type="button"
            onClick={onClose}
          >
            Volver
          </button>
          <button
            className="bg-black rounded-md text-lg text-white px-5 py-3 w-full mt-5 cursor-pointer hover:bg-gray-900 transition-all"
            type="submit"
          >
            Guardar
          </button>
        </footer>
      </form>
    </div>
  );
}
