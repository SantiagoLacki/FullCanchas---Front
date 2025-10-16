import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from 'sweetalert2'
import { borrarUsuarioPorId, leerUsuarios } from "../helpers/queries";


const ItemUsuario = ({usuario, fila, setListaUsuarios, obtenerUsuarios}) => {
    const eliminarUsuario=()=>{
        Swal.fire({
        title: "Eliminar Usuario",
        text: "No puedes revertir este paso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#024959",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
        }).then(async(result) => {
        if (result.isConfirmed) {
            const respuesta = await borrarUsuarioPorId(usuario._id)
            if(respuesta.status === 200){
            Swal.fire({
                title: "Usuario eliminado",
                text: `El usuario ${usuario.nombreUsuario} fue eliminado correctamente`,
                icon: "success",
            });
            const respuestaUsuarios = await leerUsuarios();
            const usuariosActualizados = await respuestaUsuarios.json()
            setListaProductos(usuariosActualizados)
            setListaUsuarios(usuariosActualizados)
            }else{
                Swal.fire({
                title: "Ocurrio un error",
                text: `El usuario ${usuario.nombreUsuario} no pudo ser eliminado.`,
                icon: "error",
            });
            }
        }
        });
    }
    return (
        <tr>
            <td className="text-center align-middle fw-light">{fila}</td>
            <td className="align-middle fw-light">{usuario.nombreUsuario}</td>
            <td className="text-center align-middle fw-light">{usuario.email}</td>
            <td className="text-center align-middle fw-light">
                <Link className="me-lg-2 btn btn-gold text-white fw-light" to={'/administrador/editarusuario/'+usuario._id}>
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