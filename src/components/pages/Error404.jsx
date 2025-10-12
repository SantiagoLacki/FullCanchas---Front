import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <img
          src="error-404-realista.png"
          alt="Error 404"
          className="error-image"
        />

        <Link to="/" className="error-btn">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error404;
