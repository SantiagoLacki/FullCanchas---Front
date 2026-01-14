import { Button, Form } from "react-bootstrap";
import { Link } from "react-router";
import { borrarProductoPorId, editarProducto, leerProductos, leerProductosPaginados, obtenerProductoPorId } from "../helpers/queries";
import Swal from "sweetalert2";

const ItemProducto = ({ producto, fila, obtenerProductos, setListaProductos, pageProductos, limit, usuarioAdmin }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "Eliminar Producto",
      text: "No puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#024959",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarProductoPorId(producto._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto ${producto.nombre} fue eliminado correctamente`,
            icon: "success",
          });
          const respuestaProductos = await leerProductosPaginados(pageProductos, limit);
          const productosActualizados = await respuestaProductos.json();
          setListaProductos(productosActualizados.productos);
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El usuario ${producto.nombre} no pudo ser eliminado.`,
            icon: "error",
          });
        }
      }
    });
  };

  const cambiarEstadoProducto = async () => {
      const nuevoEstado = !producto.habilitado;
      Swal.fire({
        title: `Disponibilidad del Producto`,
        text: `¿Está seguro que quiere cambiar la disponibilidad del producto ${producto.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#024959",
        cancelButtonColor: "#d33",
        confirmButtonText: `${nuevoEstado ? "Disponible" : "No disponible"}`,
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const productoModificado = {
          ...producto,
          habilitado: nuevoEstado,
          };
          const respuesta = await editarProducto(productoModificado, producto._id);
          if (respuesta.status === 200) {
            Swal.fire({
                title: "Cambio de Estado",
                text: `El producto ${producto.nombre} cambió su estado correctamente.`,
                icon: "success",
              });
            await obtenerProductos();
          } else {
            Swal.fire({
              title: "Ocurrio un error",
              text: `No se pudo cambiar el estado del producto ${producto.nombre}.`,
              icon: "error",
            });
          }
        }
      });
    }

  return (
    <tr>
      <td className="text-center align-middle fw-light">{fila}</td>
      <td className="align-middle fw-light">{producto.nombre}</td>
      <td className="text-center align-middle fw-light">{producto.precio}</td>
      <td className="text-center align-middle fw-light">{producto.categoria}</td>
            <td className="text-center align-middle">
        <img src={producto.imagen} className="img-thumbnail" alt="cancha"></img>
      </td>
      <td className="text-center align-middle fw-light">
          <Form.Check 
            type="switch"
            id={`switch-producto-${producto._id}`}
            checked={producto.habilitado}
            onChange={cambiarEstadoProducto}
            label={producto.habilitado ? "Disponible" : "No disponible"}
            className="d-inline-block ms-2 align-middle"
          />
      </td>
      <td className="text-center align-middle">
        <Link className="me-lg-2 btn btn-gold text-white" to={"/productos/editarproducto/" + producto._id}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        {usuarioAdmin && usuarioAdmin.rol !== "empleado" && (
          <Button variant="danger" onClick={eliminarProducto}>
            <i className="bi bi-trash"></i>
          </Button>
        )}
      </td>
    </tr>
  );
};

export default ItemProducto;
