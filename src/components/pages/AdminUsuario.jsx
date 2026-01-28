import { Col, Form, Row, Table, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import ItemUsuario from "./usuario/ItemUsuario";
import { useEffect, useState } from "react";
import { leerUsuarios, leerUsuariosPaginados } from "./helpers/queries";
import Swal from "sweetalert2";

const AdminUsuario = ({ usuarioAdmin }) => {
  const [terminoBusquedaUsuario, setTerminoBusquedaUsuario] = useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [usuariosOriginales, setUsuariosOriginales] = useState([]);
  const [limit] = useState(10);
  const [pageUsuarios, setPageUsuarios] = useState(1);
  const [totalPagesUsuarios, setTotalPagesUsuarios] = useState(1);
  const [mostrarSpinnerUsuarios, setMostrarSpinnerUsuarios] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    if (usuariosOriginales.length > 0) {
      const datosFiltrados = filtrarUsuarios(usuariosOriginales);
      setListaUsuarios(datosFiltrados);
    }
  }, [pageUsuarios, filtroEstado, filtroRol, usuariosOriginales]);

  const filtrarUsuarios = (usuarios) => {
    let datosFiltrados = [];

    switch (usuarioAdmin.rol) {
      case "empleado":
        datosFiltrados = usuarios.filter((usuario) => usuario.rol === "user");
        break;
      case "admin":
        datosFiltrados = usuarios.filter((usuario) => usuario.rol === "empleado" || usuario.rol === "user");
        break;
      case "superAdmin":
        datosFiltrados = usuarios.filter((usuario) => usuario._id !== usuarioAdmin._id);
        break;
      default:
        datosFiltrados = usuarios;
    }

    if (filtroEstado === "activos") {
      datosFiltrados = datosFiltrados.filter((usuario) => usuario.habilitado);
    } else if (filtroEstado === "inactivos") {
      datosFiltrados = datosFiltrados.filter((usuario) => !usuario.habilitado);
    }

    if (filtroRol !== "todos") {
      console.log(filtroRol)
      datosFiltrados = datosFiltrados.filter((usuario) => usuario.rol === filtroRol);
    }

    return datosFiltrados;
  };

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
      setUsuariosOriginales(todosLosUsuarios);

      const datosFiltrados = filtrarUsuarios(todosLosUsuarios);
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

  const handleBuscarUsuario = async (e) => {
    setMostrarSpinnerUsuarios(true);
    const termino = e.target.value;
    setTerminoBusquedaUsuario(termino);
    if (!termino) {
      const datosFiltrados = filtrarUsuarios(usuariosOriginales);
      setListaUsuarios(datosFiltrados);
    } else {
      const respuesta = await leerUsuarios();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        const usuariosResultado = datos || [];
        let usuariosFiltradosBusqueda = usuariosResultado.filter((usuario) => usuario.email.toLowerCase().includes(termino.toLowerCase()));

        const usuariosFiltrados = filtrarUsuarios(usuariosFiltradosBusqueda);
        setListaUsuarios(usuariosFiltrados);
      }
    }
    setMostrarSpinnerUsuarios(false);
  };

  const resetearFiltros = () => {
    setFiltroEstado("todos");
    setFiltroRol("todos");
    setTerminoBusquedaUsuario("");
  };

  return (
    <section className="container mainSection">
      <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
        <div className="align-items-center mt-2">
          <Row className="d-flex justify-content-between align-items-center mb-3">
            <Col xs={12} md={6} className="mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h2 className="display-6 titulo-admin fw-bold me-4">Usuarios</h2>
                <div>
                  <Link className="btn btn-gold text-white" to={"/usuarios/crearusuario"}>
                    <i className="bi bi-plus-circle"></i> Agregar
                  </Link>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Form>
                <Row className="justify-content-start justify-content-md-end">
                  <Col xs="auto d-flex">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-search fs-3 me-2 text-secondary"></i>
                      <Form.Control
                        type="text"
                        placeholder="Buscar"
                        className="mr-sm-2"
                        onChange={handleBuscarUsuario}
                        value={terminoBusquedaUsuario}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row className="border-top pt-2">
            <Col xs={12} md={6}>
              <div className="d-flex flex-wrap gap-2">
                <span className="text-secondary fw-bold align-self-center me-2">Filtrar por estado:</span>
                <button
                  type="button"
                  className={`btn ${filtroEstado === "todos" ? "btn-warning" : "btn-outline-warning"}`}
                  onClick={() => setFiltroEstado("todos")}
                  title="Mostrar todos los usuarios"
                >
                  Todos
                </button>
                <button
                  type="button"
                  className={`btn ${filtroEstado === "activos" ? "btn-success" : "btn-outline-success"}`}
                  onClick={() => setFiltroEstado("activos")}
                  title="Mostrar los usuarios activos"
                >
                  <i className="bi bi-person-check me-1"></i> Activos
                </button>
                <button
                  type="button"
                  className={`btn ${filtroEstado === "inactivos" ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={() => setFiltroEstado("inactivos")}
                  title="Mostrar solo usuarios inactivos"
                >
                  <i className="bi bi-person-x me-1"></i> Inactivos
                </button>
              </div>
            </Col>
            {(usuarioAdmin.rol === "superAdmin" || usuarioAdmin.rol === "admin") && (
              <Col xs={12} md={6} className="mt-2 mt-md-0">
                <div className="d-flex flex-wrap gap-2 justify-content-end">
                  <span className="text-secondary fw-bold align-self-center me-2">Filtrar por rol:</span>
                  <button
                    type="button"
                    className={`btn ${filtroRol === "todos" ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => setFiltroRol("todos")}
                    title="Mostrar todos los roles"
                  >
                    Todos
                  </button>
                  {usuarioAdmin.rol === "superAdmin" && (
                    <button
                      type="button"
                      className={`btn ${filtroRol === "superAdmin" ? "btn-dark" : "btn-outline-dark"}`}
                      onClick={() => setFiltroRol("superAdmin")}
                      title="Mostrar solo superadmins"
                    >
                      <i className="bi bi-shield-shaded me-1"></i> SuperAd
                    </button>
                  )}
                  {usuarioAdmin.rol === "superAdmin" && (
                    <button
                      type="button"
                      className={`btn ${filtroRol === "admin" ? "btn-success" : "btn-outline-success"}`}
                      onClick={() => setFiltroRol("admin")}
                      title="Mostrar solo admins"
                    >
                      <i className="bi bi-shield me-1"></i> Adm
                    </button>
                  )}
                  {(usuarioAdmin.rol === "superAdmin" || usuarioAdmin.rol === "admin") && (
                    <button
                      type="button"
                      className={`btn ${filtroRol === "empleado" ? "btn-secondary" : "btn-outline-secondary"}`}
                      onClick={() => setFiltroRol("empleado")}
                      title="Mostrar solo empleados"
                    >
                      <i className="bi bi-person-badge me-1"></i> Empl
                    </button>
                  )}
                  <button
                    type="button"
                    className={`btn ${filtroRol === "user" ? "btn-info" : "btn-outline-info"}`}
                    onClick={() => setFiltroRol("user")}
                    title="Mostrar solo usuarios"
                  >
                    <i className="bi bi-person me-1"></i> Client
                  </button>
                </div>
              </Col>
            )}
          </Row>
          <Row className="mt-2 mb-2">
            <Col xs={12}>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={resetearFiltros}
                  title="Resetear todos los filtros"
                >
                  <i className="bi bi-arrow-clockwise me-1"></i> Resetear Filtros
                </button>
              </div>
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
                {(usuarioAdmin.rol === "superAdmin" || usuarioAdmin.rol === "admin") && <th className="text-secondary">Rol</th>}
                <th className="text-secondary">Estado</th>
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
                    obtenerUsuarios={obtenerUsuarios}
                    usuarioAdmin={usuarioAdmin}
                  ></ItemUsuario>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
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
