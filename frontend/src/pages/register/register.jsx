import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "./components/inputField.jsx";
import { registerUser } from "../../services/users.js";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const handleSubmit = (e, formData, dispatch, navigate) => {
  e.preventDefault();
  if (formData.password !== formData.password_confirm) {
    toast.error("Las contraseñas no coinciden");
    return;
  }
  registerUser(formData)
    .then((response) => {
      dispatch({ type: "@user/setUser" });
      navigate("/");
    })
    .catch((err) => {
      toast.error(err.message || "Error al registrarse");
    });
};

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col w-80 gap-5 px-3"
        onSubmit={(e) => handleSubmit(e, formData, dispatch, navigate)}
      >
        <h2 className="text-2xl font-semibold">Registrarse</h2>
        <div className="flex gap-5">
          <InputField
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Apellido"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
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
