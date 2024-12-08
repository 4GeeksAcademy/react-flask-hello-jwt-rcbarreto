import React, { useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de importar el contexto
import { Link, useNavigate } from "react-router-dom"; // Para redirigir al usuario

export const Navbar = () => {
  const { store, actions } = useContext(Context); // Obtener el estado y acciones del contexto
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (store.isAuthenticated) {
      // Si está logueado, hacer logout
      actions.logout(); // Llama a la acción de logout
      navigate("/signin"); // Redirigir a la página de login después del logout
    } else {
      // Si no está logueado, redirigir a la página de login
      navigate("/signin");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mi Aplicación
        </Link>
        <button
          className="btn btn-outline-primary"
          onClick={handleButtonClick} // Ejecutar la acción al hacer clic
        >
          {store.isAuthenticated ? "Logout" : "Check"}
        </button>
      </div>
    </nav>
  );
};
