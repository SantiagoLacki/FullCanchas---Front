import { Button } from "react-bootstrap";
import { Link } from "react-router";

const ItemUsuario = ({usuario, fila, setListaUsuarios}) => {
    const eliminarUsuario=()=>{
    }
    return (
        <tr>
            <td className="text-center align-middle fw-light">{fila}</td>
            <td className="align-middle fw-light">{usuario.nombreUsuario}</td>
            <td className="text-center align-middle fw-light">{usuario.email}</td>
            <td className="text-center align-middle fw-light">
                <Link className="me-lg-2 btn btn-gold text-white fw-light" to={'/usuarios/editar/'+usuario._id}>
                <i className="bi bi-pencil-square"></i>
                </Link>
                <Button variant="danger" onClick={eliminarUsuario}>
                <i className="bi bi-trash"></i>
                </Button>
            </td>
        </tr>
    );
};

export default ItemUsuario;