import { Button } from "react-bootstrap";
import { Link } from "react-router";

const ItemCancha = () => {
    const eliminarCancha=()=>{
    }
    return (
        <tr>
            <td className="text-center align-middle fw-light">1</td>
            <td className="align-middle fw-light">Cancha N° 1</td>
            <td className="text-center align-middle fw-light">$3.000</td>
            <td className="text-center align-middle">
                <img
                    src="https://images.pexels.com/photos/14767661/pexels-photo-14767661.png"
                    className="img-thumbnail"
                    alt="cancha"
                ></img>
            </td>
            <td className="text-center align-middle">
                <Link className="me-lg-2 btn btn-gold text-white" to={'/usuarios/editar/'}>
                <i className="bi bi-pencil-square"></i>
                </Link>
                <Button variant="danger" onClick={eliminarCancha}>
                <i className="bi bi-trash"></i>
                </Button>
            </td>
        </tr>
    );
};

export default ItemCancha;