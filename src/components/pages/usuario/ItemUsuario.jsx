import { Button } from "react-bootstrap";
import { Link } from "react-router";

const ItemUsuario = () => {
    const eliminarUsuario=()=>{
    }
    return (
        <tr>
            <td className="text-center align-middle">1</td>
            <td className="align-middle">usuario1</td>
            <td className="text-center align-middle">usuario1@mail.com</td>
            <td className="text-center align-middle">
                <Link className="me-lg-2 btn btn-gold text-white" to={'/usuarios/editar/'}>
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