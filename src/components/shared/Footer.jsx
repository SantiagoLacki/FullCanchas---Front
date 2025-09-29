// src/components/shared/Footer.jsx
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container-fluid">
        {/* Columna izquierda */}
        <div className="footer-left">
          <img
            src="logo_fullCancha_png.png"
            alt="FullCancha Logo"
            className="footer-logo"
          />
          <p className="footer-copy">
            © FullCancha 2025 - Todos los derechos reservados.
          </p>
        </div>

        {/* Columna central (Enlaces) */}
        <div className="footer-center">
          <h4 className="footer-title">Enlaces</h4>
          <a href="/quienesSomos">Quiénes Somos</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/reservas">Reservas</a>
        </div>

        {/* Nueva columna con enlaces de prueba */}
        <div className="footer-extra">
          <h4 className="footer-title">Otros</h4>
          <a href="#">Enlace 1</a>
          <a href="#">Enlace 2</a>
          <a href="#">Enlace 3</a>
        </div>

        {/* Columna derecha (Redes sociales) */}
        <div className="footer-right">
          <p>Nuestras redes sociales:</p>
          <div className="social-icons">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
