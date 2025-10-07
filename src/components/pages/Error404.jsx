import React from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer"; // ajustá la ruta según tu estructura
import "./Error404.css";

const Error404 = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">¡Ups! Página no encontrada</h2>
        <p className="error-description">
          La página que estás buscando puede haber sido eliminada, cambiada o está temporalmente fuera de servicio.
        </p>

        <img
          src="error-404-realista.png"
          alt="Error 404"
          className="error-image"
        />

        <Link to="/" className="error-btn">
          Volver al inicio
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Error404;
