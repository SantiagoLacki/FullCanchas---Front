import { Button } from "react-bootstrap";
import { Link } from "react-router";

const ItemReserva = () => {
    return (
        <tr>
            <td className="text-center align-middle fw-light">18:00</td>
            <td className="align-middle fw-light text-center">
                <Link className="btn btn-reservar border-0 text-white w-100" to={'/reserva'}>
                    Reservar
                </Link>
            </td>
            <td className="align-middle fw-light text-center">
                <Link className="btn btn-reservar border-0 text-white w-100" to={'/reserva/'}>
                    Reservar
                </Link>
            </td>
            <td className="align-middle fw-light text-center">
                <Link className="btn btn-reservado border-0 text-white w-100" to={'/reserva/'}>
                    Reservado
                </Link>
            </td>
            <td className="align-middle fw-light text-center">
                <Link className="btn btn-reservar border-0 text-white w-100" to={'/reserva/'}>
                    Reservar
                </Link>
            </td>
            <td className="align-middle fw-light text-center">
                <Link className="btn btn-reservado border-0 text-white w-100" to={'/reserva/'}>
                    Reservado
                </Link>
            </td>
            <td className="align-middle fw-light text-center">
                <Link className="btn btn-reservar border-0 text-white w-100" to={'/reserva/'}>
                    Reservar
                </Link>
            </td>
        </tr>
    );
};

export default ItemReserva;