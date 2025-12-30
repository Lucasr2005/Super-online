import { useState } from "react";
import { Link } from "react-router-dom";
import { InputField } from "./components/inputField.jsx";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    // Aquí iría la lógica para registrar al usuario (ej. una llamada a la API)
    console.log("Usuario a registrar:", formData);
    alert("Usuario creado exitosamente (simulación).");
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col w-80 gap-5 px-3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold">Registrarse</h2>
        <InputField
          label="Ingrese su email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Ingrese su contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          label="Confirme su contraseña"
          type={showPassword ? "text" : "password"}
          name="password_confirm"
          value={formData.password_confirm}
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
          Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-600 underline"
          >
            Iniciar sesión
          </Link>
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md"
        >
          Crear usuario
        </button>
      </form>
    </section>
  );
}

export default Register;
