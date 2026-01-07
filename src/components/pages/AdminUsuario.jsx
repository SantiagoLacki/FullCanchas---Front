import { Col, Dropdown, Form, Row, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import ItemUsuario from "./usuario/ItemUsuario";
import { useEffect, useState } from "react";
import ItemCancha from "./cancha/ItemCancha";
import ItemProducto from "./producto/ItemProducto";
import {
  leerCanchas,
  leerProductos,
  leerProductosPaginados,
  leerReservas,
  leerReservasPaginadas,
  leerUsuarios,
  leerUsuariosPaginados,
} from "./helpers/queries";
import ItemReservaAdmin from "./reserva/ItemReservaAdmin";
import Swal from "sweetalert2";

const AdminUsuario = ({ usuarioAdmin }) => {
  const [activeSection, setActiveSection] = useState("usuarios");
  const [terminoBusquedaUsuario, setTerminoBusquedaUsuario] = useState("");
  const [terminoBusquedaProducto, setTerminoBusquedaProducto] = useState("");
  const [fechaBusqueda, setFechaBusqueda] = useState("");

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [listaCanchas, setListaCanchas] = useState([]);
  const [listaReservas, setListaReservas] = useState([]);

  const [limit] = useState(10);
  const [pageUsuarios, setPageUsuarios] = useState(1);
  const [totalPagesUsuarios, setTotalPagesUsuarios] = useState(1);
  const [pageProductos, setPageProductos] = useState(1);
  const [totalPagesProductos, setTotalPagesProductos] = useState(1);
  const [pageReservas, setPageReservas] = useState(1);
  const [totalPagesReservas, setTotalPagesReservas] = useState(1);

  const [mostrarSpinnerUsuarios, setMostrarSpinnerUsuarios] = useState(true);
  const [mostrarSpinnerProductos, setMostrarSpinnerProductos] = useState(true);
  const [mostrarSpinnerCanchas, setMostrarSpinnerCanchas] = useState(true);
  const [mostrarSpinnerReservas, setMostrarSpinnerReservas] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
    obtenerProductos();
    obtenerCanchas();
    obtenerReservas();
  }, [pageUsuarios, pageProductos, pageReservas]);

  const obtenerUsuarios = async () => {
    try {
      setMostrarSpinnerUsuarios(true);
      const primeraRespuesta = await leerUsuariosPaginados(1, limit);
      if (primeraRespuesta.status !== 200) throw new Error();

      const primeraPagina = await primeraRespuesta.json();
      let todosLosUsuarios = [...primeraPagina.usuario];
      const totalPaginas = primeraPagina.totalPages;

      for (let i = 2; i <= totalPaginas; i++) {
        const resp = await leerUsuariosPaginados(i, limit);
        if (resp.status === 200) {
          const datos = await resp.json();
          todosLosUsuarios = [...todosLosUsuarios, ...datos.usuario];
        }
      }
      let datosFiltrados = [];
      switch (usuarioAdmin.rol) {
        case "empleado":
          datosFiltrados = todosLosUsuarios.filter((usuario) => usuario.rol === "user");
          break;
        case "admin":
          datosFiltrados = todosLosUsuarios.filter((usuario) => usuario.rol === "empleado" || usuario.rol === "user");
          break;
        case "superadmin":
          datosFiltrados = todosLosUsuarios.filter((usuario) => usuario._id !== usuarioAdmin._id);
          break;
        default:
          datosFiltrados = todosLosUsuarios;
      }

      setListaUsuarios(datosFiltrados);
      setTotalPagesUsuarios(Math.ceil(datosFiltrados.length / limit));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerUsuarios(false);
  };

  const obtenerProductos = async () => {
    setMostrarSpinnerProductos(true);
    const respuesta = await leerProductosPaginados(pageProductos, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaProductos(datos.productos);
      setTotalPagesProductos(datos.totalPages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerProductos(false);
  };

  const obtenerCanchas = async () => {
    setMostrarSpinnerCanchas(true);
    const respuesta = await leerCanchas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaCanchas(datos);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerCanchas(false);
  };

  const obtenerReservas = async () => {
    setMostrarSpinnerReservas(true);
    const respuesta = await leerReservasPaginadas(pageReservas, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaReservas(datos);
      setTotalPagesReservas(datos.pages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerReservas(false);
  };

  const handleBuscarUsuario = async (e) => {
    setMostrarSpinnerUsuarios(true);
    const termino = e.target.value;
    setTerminoBusquedaUsuario(termino);
    if (!termino) {
      obtenerUsuarios();
    } else {
      const respuesta = await leerUsuarios();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        const usuariosResultado = datos || [];
        let usuariosFiltrados = [];
        if (usuarioAdmin.rol === "empleado") {
          usuariosFiltrados = usuariosResultado.filter(
            (usuario) => usuario.email.toLowerCase().includes(termino.toLowerCase()) && usuario.rol === "user"
          );
        } else if (usuarioAdmin.rol === "admin") {
          usuariosFiltrados = usuariosResultado.filter(
            (usuario) =>
              usuario.email.toLowerCase().includes(termino.toLowerCase()) && (usuario.rol === "empleado" || usuario.rol === "user")
          );
        } else if (usuarioAdmin.rol === "superadmin") {
          usuariosFiltrados = usuariosResultado.filter(
            (usuario) => usuario.email.toLowerCase().includes(termino.toLowerCase()) && usuario._id !== usuarioAdmin._id
          );
        }

        setListaUsuarios(usuariosFiltrados);
      }
    }
    setMostrarSpinnerUsuarios(false);
  };

  const handleBuscarSuperAdmin = async (e) => {
    setMostrarSpinnerUsuarios(true);
    const termino = e.target.value;
    setTerminoBusquedaUsuario(termino);
    if (!termino) {
      obtenerUsuarios();
    } else {
      const respuesta = await leerUsuarios();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        const usuariosResultado = datos || [];
        const usuariosFiltrados = usuariosResultado.filter(
          (usuario) => usuario.email.toLowerCase().includes(termino.toLowerCase()) && usuario._id !== usuarioAdmin._id
        );
        setListaUsuarios(usuariosFiltrados);
      }
    }
    setMostrarSpinnerUsuarios(false);
  };

  const handleBuscarProducto = async (e) => {
    setMostrarSpinnerProductos(true);
    const termino = e.target.value;
    setTerminoBusquedaProducto(termino);
    if (!termino) {
      obtenerProductos();
    } else {
      const respuesta = await leerProductos();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        const productosResultado = datos || [];

        const productosFiltrados = productosResultado.filter((producto) => producto.nombre.toLowerCase().includes(termino.toLowerCase()));
        setListaProductos(productosFiltrados);
      }
    }
    setMostrarSpinnerProductos(false);
  };

  const handleFechaChange = async (e) => {
    setMostrarSpinnerReservas(true);
    const fechaSeleccionada = e.target.value;
    setFechaBusqueda(fechaSeleccionada);
    const respuesta = await leerReservas();
    if (respuesta.status === 200) {
      const todasLasReservas = await respuesta.json();
      const arrayReservas = todasLasReservas.reservas || todasLasReservas;

      if (!fechaSeleccionada) {
        setPageReservas(1);
        obtenerReservas();
      } else {
        const reservasFiltradas = arrayReservas.filter((reserva) => {
          const fechaReserva = new Date(reserva.dia).toISOString().split("T")[0];
          return fechaReserva === fechaSeleccionada;
        });

        setListaReservas({
          reservas: reservasFiltradas,
          totalPages: 1,
          page: 1,
        });
      }
    }
    setMostrarSpinnerReservas(false);
  };

  return (
    <section className="container mainSection">
      <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
        <div className="  align-items-center mt-2 mb-3">
          <Row className="d-flex justify-content-between align-items-center mb-3">
            <Col xs={12} md={6} className="mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h2 className="display-6 titulo-admin fw-bold me-4">Usuarios</h2>
                <div>
                  <Link className="btn btn-gold text-white" to={"/administrador/crearusuario"}>
                    <i className="bi bi-plus-circle"></i> Agregar
                  </Link>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Form>
                <Row className="justify-content-start justify-content-md-end">
                  <Col xs="auto d-flex">
                    <i className="bi bi-search fs-3 me-2 text-secondary"></i>
                    <Form.Control
                      type="text"
                      placeholder="Buscar"
                      className=" mr-sm-2"
                      onChange={handleBuscarUsuario}
                      value={terminoBusquedaUsuario}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
        {mostrarSpinnerUsuarios ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" role="status"></Spinner>
          </div>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr className="text-center">
                <th className="text-secondary">#</th>
                <th className="text-secondary">Nombre de Usuario</th>
                <th className="text-secondary">Email</th>
                <th className="text-secondary">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaUsuarios && listaUsuarios.length > 0 ? (
                listaUsuarios.map((usuario, indice) => (
                  <ItemUsuario
                    key={usuario._id}
                    usuario={usuario}
                    fila={indice + 1}
                    setListaUsuarios={setListaUsuarios}
                    obtenerUsuarios={obtenerUsuarios}
                  ></ItemUsuario>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No hay Usuarios disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </section>
  );
};

export default AdminUsuario;
