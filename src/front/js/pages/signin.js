import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de importar el contexto
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import { Link } from "react-router-dom";

export const Signin = () => {
  const { actions } = useContext(Context); // Obtener las acciones del contexto
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Para mostrar errores

  // Maneja el evento de cambio de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página

    // Validar si hay campos vacíos
    if (!user.email || !user.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Llamada a la acción del contexto para hacer login
      const response = await actions.login(user.email, user.password);

      if (response) {
        // Si la respuesta es exitosa, redirigir al dashboard o página principal
        navigate("/loginsuccess");  // O la ruta que desees
      } else {
        // Si hay algún error, mostrar el mensaje
        setError("Credenciales inválidas. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      setError("Hubo un error al iniciar sesión. Por favor, intenta más tarde.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      {error && (
        <div
          className="alert alert-danger mt-3"
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderColor: "#f5c6cb",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      <h2 className="mb-4 text-center">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Ingrese su correo"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Iniciar sesión
        </button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/register" style={{ fontWeight: "bold", textDecoration: "none" }}>
          ¿No tienes cuenta? <span style={{ color: "#007bff" }}>Regístrate aquí</span>
        </Link>
      </div>
    </div>
  );
};
