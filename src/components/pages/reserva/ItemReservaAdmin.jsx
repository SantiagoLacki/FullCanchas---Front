import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { borrarReservaPorId } from "../helpers/queries";
import Swal from "sweetalert2";

const ItemReservaAdmin = ({ reserva, fila, setListaReservas, usuarioAdmin }) => {
  const eliminarReserva = () => {
    Swal.fire({
      title: "Eliminar Reserva",
      text: "No puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#024959",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarReservaPorId(reserva._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Reserva Eliminada",
            text: `La reserva fue eliminada correctamente`,
            icon: "success",
          });
          setListaReservas((prevState) => {
            const nuevasReservas = prevState.reservas.filter((r) => r._id !== reserva._id);
            return {
              ...prevState,
              reservas: nuevasReservas,
              total: prevState.total - 1,
            };
          });
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `La reserva no pudo ser eliminada.`,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <tr>
      <td className="text-center align-middle fw-light">{fila}</td>
      <td className="align-middle fw-light">{reserva.idCancha?.nombre}</td>
      <td className="text-center align-middle fw-light">{reserva.idUsuario?.email}</td>
      <td className="text-center align-middle fw-light"> {new Date(reserva.dia).toLocaleDateString("es-ES", { timeZone: "UTC" })}</td>
      <td className="text-center align-middle fw-light">{reserva.hora}</td>
      {(usuarioAdmin.rol === "superAdmin" || usuarioAdmin.rol === "admin") && (
        <td className="text-center align-middle">
          <Link className="me-lg-2 btn btn-gold text-white" to={"/reservas/editarreserva/" + reserva._id}>
            <i className="bi bi-pencil-square"></i>
          </Link>
          <Button variant="danger" onClick={eliminarReserva}>
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      )}
    </tr>
  );
};

export default ItemReservaAdmin;
