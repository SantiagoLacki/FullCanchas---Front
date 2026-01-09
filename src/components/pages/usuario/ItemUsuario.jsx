import { Button, Form } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { borrarUsuarioPorId } from "../helpers/queries";

const ItemUsuario = ({ usuario, fila, obtenerUsuarios, usuarioAdmin }) => {
  const eliminarUsuario = () => {
    Swal.fire({
      title: "Eliminar Usuario",
      text: "No puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#024959",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarUsuarioPorId(usuario._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Usuario eliminado",
            text: `El usuario ${usuario.nombreUsuario} fue eliminado correctamente`,
            icon: "success",
          });
          await obtenerUsuarios();
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El usuario ${usuario.nombreUsuario} no pudo ser eliminado.`,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <tr>
      <td className="text-center align-middle fw-light">{fila}</td>
      <td className="align-middle fw-light">{usuario.nombreUsuario}</td>
      <td className="text-center align-middle fw-light">{usuario.email}</td>
      <td className="text-center align-middle fw-light">
          <Form.Check 
            type="switch"
            id={`switch-usuario-${usuario._id}`}
            checked={usuario.estado}
            onChange={eliminarUsuario}
            label={usuario.estado ? "Activo" : "Inactivo"}
            className="d-inline-block ms-2 align-middle"
          />
      </td>
      <td className="text-center align-middle fw-light">
        <Link className="me-lg-2 btn btn-gold text-white fw-light" to={"/usuarios/editarusuario/" + usuario._id}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        {usuarioAdmin && usuarioAdmin.rol !== "empleado" && (
          <Button variant="danger" onClick={eliminarUsuario}>
            <i className="bi bi-trash"></i>
          </Button>
        )}
      </td>
    </tr>
  );
};

export default ItemUsuario;
