import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { borrarProductoPorId, leerProductos } from "../helpers/queries";
import Swal from "sweetalert2";

const ItemReservaAdmin = ({reserva, fila, setListaReserva}) => {
    
    const eliminarReserva=()=>{
                Swal.fire({
                title: "Eliminar Producto",
                text: "No puedes revertir este paso",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#024959",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar"
                }).then(async(result) => {
                if (result.isConfirmed) {
                    const respuesta = await borrarProductoPorId(producto._id)
                    if(respuesta.status === 200){
                    Swal.fire({
                        title: "Usuario eliminado",
                        text: `El usuario ${producto.nombre} fue eliminado correctamente`,
                        icon: "success",
                    });
                    const respuestaProductos = await leerProductos();
                    const productosActualizados = await respuestaProductos.json()
                    setListaProductos(productosActualizados)
                    }else{
                        Swal.fire({
                        title: "Ocurrio un error",
                        text: `El usuario ${producto.nombre} no pudo ser eliminado.`,
                        icon: "error",
                    });
                    }
                }
                });
            }
        return (
        <tr>
            <td className="text-center align-middle fw-light">{fila}</td>
            <td className="align-middle fw-light">{reserva.idCancha}</td>
            <td className="text-center align-middle fw-light">{reserva.idUsuario}</td>
            <td className="text-center align-middle fw-light">{reserva.dia}</td>
            <td className="text-center align-middle fw-light">{reserva.hora}</td>
            <td className="text-center align-middle">
                <Link className="me-lg-2 btn btn-gold text-white" to={'/administrador/editarreserva/'+reserva._id}>
                <i className="bi bi-pencil-square"></i>
                </Link>
                <Button variant="danger" onClick={eliminarReserva}>
                <i className="bi bi-trash"></i>
                </Button>
            </td>
        </tr>
    );
};

export default ItemReservaAdmin;