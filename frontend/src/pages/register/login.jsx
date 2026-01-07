import { useState } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { InputField } from "./components/inputField.jsx";
import { loginUser } from "../../services/users.js";
import { useDispatch } from "react-redux";

const handleSubmit = (e, formData, setError, redirect, dispatch, navigate) => {
  e.preventDefault();

  loginUser(formData)
    .then((response) => {
      dispatch({ type: "@user/setUser" });
      console.log(redirect);
      navigate(redirect);
    })
    .catch((err) => {
      setError(err);
      setTimeout(() => setError(null), 5000);
    });
};

const getFullRedirectPath = () => {
  const search = location.search;
  const parts = search.split("?redirect=");

  if (parts.length > 1) {
    return decodeURIComponent(parts[1]) || "/";
  }
  return searchParams.get("redirect") || "/";
};

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const redirect = getFullRedirectPath();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col w-80 gap-5 px-3"
        onSubmit={(e) => handleSubmit(e, formData, setError, redirect, dispatch, navigate)}
      >
        <h2 className="text-2xl font-semibold">Iniciar sesión</h2>
        <p className="text-red-600 min-h-[1.5rem]">{error ? error.message : ""}</p>

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
