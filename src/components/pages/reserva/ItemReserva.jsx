import { Button } from "react-bootstrap";
import { Link } from "react-router";

const ItemReserva = () => {
    return (
        <tr>
            <td className="col-hora text-center align-middle fw-light">18:00</td>
            <td className="align-middle fw-light text-center btn-reservar p-0">
                <Link className="d-block w-100 h-100 text-decoration-none text-white py-3" to={'/reserva/'}>   
                </Link>
            </td>
            <td className="align-middle fw-light text-center btn-reservar p-0">
                <Link className="d-block w-100 h-100 text-decoration-none text-white py-3" to={'/reserva/'}>   
                </Link>
            </td>
            <td className="align-middle fw-light text-center btn-reservado p-0">
                
            </td>
            <td className="align-middle fw-light text-center btn-reservar p-0">
                <Link className="d-block w-100 h-100 text-decoration-none text-white py-3" to={'/reserva/'}>   
                </Link>
            </td>
            <td className="align-middle fw-light text-center btn-reservado p-0">
                
            </td>
            <td className="align-middle fw-light text-center btn-reservar p-0">
                <Link className="d-block w-100 h-100 text-decoration-none text-white py-3" to={'/reserva/'}>   
                </Link>
            </td>
        </tr>
    );
};

export default ItemReserva;