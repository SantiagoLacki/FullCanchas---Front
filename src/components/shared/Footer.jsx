import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-middle container-fluid">
        <div className="footer-col footer-left">
          <img
            src="logo_fullCancha_png.png"
            alt="FullCancha Logo"
            className="footer-logo"
          />
        </div>

        <div className="footer-col footer-center pt-4 text-center">
          <h4 className="footer-title fs-4">Sobre Nosotros</h4>
          <a href="/politicasDePrivacidad">Políticas de Privacidad</a>
          <a href="/terminosycondiciones">Términos y Condiciones</a>
          <a href="/quienesSomos">¿Quiénes Somos?</a>
          <p><i className="bi bi-geo-alt fs-4 text-white"></i> Gral. José María Paz 1544, San Miguel de Tucumán, Tucumán</p>

          
        </div>

        <div className="footer-col footer-right">
          <div className="sponsor-logos">
            <p className="footer-social-title fs-4">Nuestras redes</p>
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
      </div>
    </footer>
  );
};

export default Footer;
