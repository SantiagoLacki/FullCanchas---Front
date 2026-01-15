import { Button, Form } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { borrarCanchaPorId, leerCanchas, editarCancha } from "../helpers/queries";

const ItemCancha = ({cancha, fila, setListaCanchas, obtenerCanchas}) => {
    const eliminarCancha=()=>{
         Swal.fire({
            title: "Eliminar Cancha",
            text: "No puedes revertir este paso",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#024959",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
            }).then(async(result) => {
            if (result.isConfirmed) {
                const respuesta = await borrarCanchaPorId(cancha._id)
                if(respuesta.status === 200){
                Swal.fire({
                    title: "Cancha eliminada",
                    text: `La cancha ${cancha.nombre} fue eliminada correctamente`,
                    icon: "success",
                });
                const respuestaCanchas = await leerCanchas();
                const canchasActualizadas = await respuestaCanchas.json()
                setListaCanchas(canchasActualizadas)
                }else{
                    Swal.fire({
                    title: "Ocurrio un error",
                    text: `La canchas ${cancha.nombre} no pudo ser eliminada.`,
                    icon: "error",
                });
                }
            }
            });
    }
      const cambiarEstadoCancha = async () => {
          const nuevoEstado = !cancha.habilitado;
          Swal.fire({
            title: `Disponibilidad de la Cancha`,
            text: `¿Está seguro que quiere cambiar la disponibilidad de la cancha ${cancha.nombre}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#024959",
            cancelButtonColor: "#d33",
            confirmButtonText: `${nuevoEstado ? "Disponible" : "No disponible"}`,
            cancelButtonText: "Cancelar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const canchaModificada = {
              ...cancha,
              habilitado: nuevoEstado,
              };
              const respuesta = await editarCancha(canchaModificada, cancha._id);
              if (respuesta.status === 200) {
                Swal.fire({
                    title: "Cambio de disponibilidad",
                    text: `La cancha ${cancha.nombre} cambió su disponibilidad correctamente.`,
                    icon: "success",
                  });
                await obtenerCanchas();
              } else {
                Swal.fire({
                  title: "Ocurrio un error",
                  text: `No se pudo cambiar la disponibilidad de la cancha ${cancha.nombre}.`,
                  icon: "error",
                });
              }
            }
          });
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
            <td className="text-center align-middle fw-light">
                <Form.Check 
                    type="switch"
                    id={`switch-cancha-${cancha._id}`}
                    checked={cancha.habilitado}
                    onChange={cambiarEstadoCancha}
                    label={cancha.habilitado ? "Disponible" : "No disponible"}
                    className="d-inline-block ms-2 align-middle"
                />
            </td>
            <td className="text-center align-middle">
                <Link className="me-lg-2 btn btn-gold text-white" to={'/canchas/editarcancha/'+cancha._id}>
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