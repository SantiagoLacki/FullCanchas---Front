import { Button } from "react-bootstrap";
import { Link } from "react-router";

const ItemProducto = () => {
    const eliminarProducto = ()=>{

    }
    return (
        <tr>
            <td className="text-center align-middle fw-light">1</td>
            <td className="align-middle fw-light">Pelota de Futbol 5 Adidas</td>
            <td className="text-center align-middle fw-light">$150.000</td>
            <td className="text-center align-middle fw-light">Pelotas</td>
            <td className="text-center align-middle">
                <img
                    src="https://images.pexels.com/photos/32675206/pexels-photo-32675206.jpeg"
                    className="img-thumbnail"
                    alt="cancha"
                ></img>
            </td>
            <td className="text-center align-middle">
                <Link className="me-lg-2 btn btn-gold text-white" to={'/usuarios/editar/'}>
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