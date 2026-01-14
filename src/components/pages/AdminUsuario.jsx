import { Col, Dropdown, Form, Row, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import ItemUsuario from "./usuario/ItemUsuario";
import { useEffect, useState } from "react";
import {
  leerUsuarios,
  leerUsuariosPaginados,
} from "./helpers/queries";
import Swal from "sweetalert2";

const AdminUsuario = ({ usuarioAdmin }) => {
  const [terminoBusquedaUsuario, setTerminoBusquedaUsuario] = useState("");

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [usuariosOriginales, setUsuariosOriginales] = useState([]);
  const [limit] = useState(10);
  const [pageUsuarios, setPageUsuarios] = useState(1);
  const [totalPagesUsuarios, setTotalPagesUsuarios] = useState(1);

  const [mostrarSpinnerUsuarios, setMostrarSpinnerUsuarios] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
        if (usuariosOriginales.length > 0) {
      const datosFiltrados = filtrarUsuarios(usuariosOriginales);
      setListaUsuarios(datosFiltrados);
    }
  }, [pageUsuarios, filtroEstado]);

  const filtrarUsuarios = (usuarios) =>{
    let datosFiltrados = []
    switch (usuarioAdmin.rol) {
        case "empleado":
          datosFiltrados = usuarios.filter((usuario) => usuario.rol === "user");
          break;
        case "admin":
          datosFiltrados = usuarios.filter((usuario) => usuario.rol === "empleado" || usuario.rol === "user");
          break;
        case "superadmin":
          datosFiltrados = usuarios.filter((usuario) => usuario._id !== usuarioAdmin._id);
          break;
        default:
          datosFiltrados = usuarios;
      }
    if (filtroEstado === "activos"){
      datosFiltrados = datosFiltrados.filter(usuario => usuario.habilitado);
    } else if(filtroEstado === "inactivos"){
      datosFiltrados = datosFiltrados.filter(usuario => !usuario.habilitado)
    }

    return datosFiltrados
  }


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
      setUsuariosOriginales(todosLosUsuarios)
      
      const datosFiltrados = filtrarUsuarios(todosLosUsuarios)

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
        let usuariosFiltradosBusqueda = usuariosResultado.filter(
          (usuario) => usuario.email.toLowerCase().includes(termino.toLowerCase())
        );

         const usuariosFiltrados = filtrarUsuarios(usuariosFiltradosBusqueda);

        setListaUsuarios(usuariosFiltrados);
      }
    }
    setMostrarSpinnerUsuarios(false);
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
                        className=" mr-sm-2"
                        onChange={handleBuscarUsuario}
                        value={terminoBusquedaUsuario}
                      />
                    </div>
                  </Col>
                  <Col xs="12" md="auto">
                    <div>
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
