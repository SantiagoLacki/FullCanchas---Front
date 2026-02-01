import { Link } from "react-router";
import error from "../../assets/error404.png";
import "./Error404.css";

const Error404 = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <img src={error} alt="error 404" className="error-image" />
        <Link to="/" className="error-btn">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error404;
