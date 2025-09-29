// src/components/shared/Footer.jsx
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid footer-container">
        {/* Columna izquierda */}
        <div className="footer-left">
          <img
            src="logo_fullCancha_png.png"   // <-- tu logo aquí
            alt="FullCancha Logo"
            className="footer-logo"
          />
          <p className="footer-copy">
            © FullCancha 2025 - Designed & Developed by Alejo3D
          </p>
        </div>

        {/* Columna central */}
        <div className="footer-center">
          <h4 className="footer-title">Secciones</h4>
          <a href="/quienesSomos">Quiénes Somos</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/reservas">Reservas</a>
        </div>

        {/* Columna derecha */}
        <div className="footer-right">
          <p>Seguinos en nuestras redes sociales</p>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
