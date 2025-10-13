import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { borrarCanchaPorId, leerCanchas } from "../helpers/queries";

const ItemCancha = ({cancha, fila, setListaCanchas}) => {
    const eliminarCancha=()=>{
    }
    return (
        <tr>
            <td className="text-center align-middle fw-light">{fila}</td>
            <td className="align-middle fw-light">{cancha.nombre}</td>
            <td className="text-center align-middle fw-light">{cancha.precioPorHora}</td>
            <td className="text-center align-middle">
                <img
                    src={cancha.imagen}
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