import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { borrarProductoPorId, leerProductos } from "../helpers/queries";
import Swal from "sweetalert2";

const ItemProducto = ({producto, fila, setListaProductos}) => {
    const eliminarProducto=()=>{

        }
    return (
        <tr>
            <td className="text-center align-middle fw-light">{fila}</td>
            <td className="align-middle fw-light">{producto.nombre}</td>
            <td className="text-center align-middle fw-light">{producto.precio}</td>
            <td className="text-center align-middle fw-light">{producto.categoria}</td>
            <td className="text-center align-middle">
                <img
                    src={producto.imagen}
                    className="img-thumbnail"
                    alt="cancha"
                ></img>
            </td>
            <td className="text-center align-middle">
                <Link className="me-lg-2 btn btn-gold text-white" to={'/administrador/editarproducto/'+producto._id}>
                <i className="bi bi-pencil-square"></i>
                </Link>
                <Button variant="danger" onClick={eliminarProducto}>
                <i className="bi bi-trash"></i>
                </Button>
            </td>
        </tr>
    );
};

export default ItemProducto;