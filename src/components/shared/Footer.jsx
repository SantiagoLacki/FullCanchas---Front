import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Fila con 3 columnas */}
      <div className="footer-middle container-fluid">
        {/* Columna izquierda: enlaces + redes */}
        <div className="footer-col footer-left">
          <h4 className="footer-title">Enlaces</h4>
          <a href="/quienesSomos">Quiénes Somos</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/reservas">Reservas</a>

          <p className="footer-social-title">Nuestras redes</p>
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

        {/* Columna central: logo + copyright */}
        <div className="footer-col footer-center">
          <img
            src="logo_fullCancha_png.png"
            alt="FullCancha Logo"
            className="footer-logo"
          />
          <p className="footer-copy">
            © FullCancha 2025 - Designed & Developed by Alejo3D
          </p>
        </div>

        {/* Columna derecha: logos de marcas */}
        <div className="footer-col footer-right">
          <h4 className="footer-title">Auspician</h4>
          <div className="sponsor-logos">
            <img src="png-adidas-logo.png" alt="Sponsor 1" className="logo-adidas" />
            <img src="png-nike-logo.png" alt="Sponsor 2" />
            <img src="png-puma-logo.png" alt="Sponsor 3" />
            <img src="logo_lig_tucu.png" alt="Liga Tucumana" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
