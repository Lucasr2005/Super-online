import { useState } from "react";
import { Link } from "react-router-dom";
import { InputField } from "./components/inputField.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form className="flex flex-col w-80 gap-5 px-3">
        <h2 className="text-2xl font-semibold">Iniciar sesión</h2>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div>
          <input
            className="mr-2"
            type="checkbox"
            id="show_password"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show_password">Mostrar contraseña</label>
        </div>
        <p className="text-sm">
          No tienes una cuenta?{" "}
          <Link
            to="/registro"
            className="text-blue-600 underline"
          >
            Registrate
          </Link>
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md"
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}

export default Login;
