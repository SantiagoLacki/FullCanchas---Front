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

const Administrador = ({ usuarioAdmin }) => {
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
  const [mostrarSpinner, setMostrarSpinner] = useState(true)

  useEffect(() => {
    obtenerUsuarios();
    obtenerProductos();
    obtenerCanchas();
    obtenerReservas();
  }, [pageUsuarios, pageProductos, pageReservas]);

  const obtenerUsuarios = async () => {
    try {
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
      if (usuarioAdmin.rol === "admin") {
        datosFiltrados = todosLosUsuarios.filter((usuario) => usuario.rol === "user");
      } else {
        datosFiltrados = todosLosUsuarios.filter((usuario) => usuario.rol === "admin");
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
    setMostrarSpinner(false)
  };

  const obtenerProductos = async () => {
    setMostrarSpinner(true)
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
    setMostrarSpinner(false)
  };

  const obtenerCanchas = async () => {
    setMostrarSpinner(true)
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
    setMostrarSpinner(false)
  };

  const obtenerReservas = async () => {
    setMostrarSpinner(true)
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
    setMostrarSpinner(false)
  };

  const handleBuscarUsuario = async (e) => {
    setMostrarSpinner(true)
    const termino = e.target.value;
    setTerminoBusquedaUsuario(termino);
    if (!termino) {
      obtenerUsuarios();
    } else {
      const respuesta = await leerUsuarios();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        const usuariosResultado = datos || [];
        const usuariosFiltrados = usuariosResultado.filter((usuario) => usuario.email.toLowerCase().includes(termino.toLowerCase()));
        setListaUsuarios(usuariosFiltrados);
      }
    }
    setMostrarSpinner(false)
  };

  const handleBuscarUsuarioAdmin = async (e) => {
    setMostrarSpinner(true)
    const termino = e.target.value;
    setTerminoBusquedaUsuario(termino);
    if (!termino) {
      obtenerUsuarios();
    } else {
      const respuesta = await leerUsuarios();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        const usuariosResultado = datos || [];
        const usuariosFiltrados = usuariosResultado.filter((usuario) => usuario.email.toLowerCase().includes(termino.toLowerCase()) && usuario.rol === "admin");
        setListaUsuarios(usuariosFiltrados);
      }
    }
    setMostrarSpinner(false)
  };

  const handleBuscarProducto = async (e) => {
    setMostrarSpinner(true)
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
    setMostrarSpinner(false)
  };

  const handleFechaChange = async (e) => {
    setMostrarSpinner(true)
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
    setMostrarSpinner(false)
  };

  return (
    <div className="fono-gral">
      <section className="container mainSection">
        {usuarioAdmin.rol === "staff" ? (
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
                          onChange={handleBuscarUsuarioAdmin}
                          value={terminoBusquedaUsuario}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
            {mostrarSpinner ?                     
              <div className="text-center mt-5">
                <Spinner animation="border" variant="warning" role="status" ></Spinner>
              </div> 
              :
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
                {listaUsuarios.map((usuario, indice) => (
                  <ItemUsuario
                    key={usuario._id}
                    usuario={usuario}
                    fila={indice + 1}
                    setListaUsuarios={setListaUsuarios}
                    obtenerUsuarios={obtenerUsuarios}
                  ></ItemUsuario>
                ))}
                ) : (
                    <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                        No hay Usuarios disponibles
                    </td>
                    </tr>
                )
              </tbody>
            </Table>
            }
          </div>
        ) : (
          <>
            <Dropdown className="mt-2">
              <Dropdown.Toggle variant="gold" className="text-white btn-gold">
                {activeSection === "usuarios" && "Usuarios"}
                {activeSection === "canchas" && "Canchas"}
                {activeSection === "productos" && "Productos"}
                {activeSection === "reservas" && "Reservas"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setActiveSection("usuarios")}
                  active={activeSection === "usuarios"}
                  className={activeSection === "usuarios" ? "btn-gold" : ""}
                >
                  Usuarios
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setActiveSection("canchas")}
                  active={activeSection === "canchas"}
                  className={activeSection === "canchas" ? "btn-gold" : ""}
                >
                  Canchas
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setActiveSection("productos")}
                  active={activeSection === "productos"}
                  className={activeSection === "productos" ? "btn-gold" : ""}
                >
                  Productos
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setActiveSection("reservas")}
                  active={activeSection === "reservas"}
                  className={activeSection === "reservas" ? "btn-gold" : ""}
                >
                  Reservas
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {activeSection === "usuarios" && (
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
                {mostrarSpinner ?                     
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="warning" role="status" ></Spinner>
                </div> 
                :
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
                    listaUsuarios.slice((pageUsuarios - 1) * limit, pageUsuarios * limit).map((usuario, indice) => (
                      <ItemUsuario
                        key={usuario._id}
                        usuario={usuario}
                        fila={(pageUsuarios - 1) * limit + indice + 1}
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
                }
                {totalPagesUsuarios > 1 && (
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Button
                      variant="warning"
                      onClick={() => setPageUsuarios((prev) => Math.max(prev - 1, 1))}
                      disabled={pageUsuarios === 1}
                    >
                      Anterior
                    </Button>
                    <span className="mx-3 text-dark px-2 py-2 rounded">
                      Página {pageUsuarios} de {totalPagesUsuarios}
                    </span>
                    <Button
                      variant="warning"
                      onClick={() => setPageUsuarios((prev) => Math.min(prev + 1, totalPagesUsuarios))}
                      disabled={pageUsuarios === totalPagesUsuarios}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </div>
            )}
            {activeSection === "canchas" && (
              <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
                <div className="d-flex align-items-center mt-2 mb-3">
                  <h2 className="display-6 titulo-admin fw-bold me-4">Canchas</h2>
                  <div>
                    <Link className="btn btn-gold text-white" to={"/administrador/crearcancha"}>
                      <i className="bi bi-plus-circle"></i> Agregar
                    </Link>
                  </div>
                </div>
                {mostrarSpinner ?                     
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="warning" role="status" ></Spinner>
                </div> 
                :
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th className="text-secondary">#</th>
                      <th className="text-secondary">Cancha</th>
                      <th className="text-secondary">Precio por Hora</th>
                      <th className="text-secondary">Disponibilidad</th>
                      <th className="text-secondary">Imagen</th>
                      <th className="text-secondary">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaCanchas.map((cancha, indice) => (
                      <ItemCancha key={cancha._id} cancha={cancha} fila={indice + 1} setListaCanchas={setListaCanchas}></ItemCancha>
                    ))}
                  </tbody>
                </Table>
                }
              </div>
            )}
            {activeSection === "productos" && (
              <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
                <div className="  align-items-center mt-2 mb-3">
                  <Row className="d-flex justify-content-between align-items-center mb-3">
                    <Col xs={12} md={6} className="mb-2 mb-md-0">
                      <div className="d-flex align-items-center">
                        <h2 className="display-6 titulo-admin fw-bold  me-4">Productos</h2>
                        <div>
                          <Link className="btn btn-gold text-white" to={"/administrador/crearproducto"}>
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
                              onChange={handleBuscarProducto}
                              value={terminoBusquedaProducto}
                            />
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </div>
                {mostrarSpinner ?                     
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="warning" role="status" ></Spinner>
                </div> 
                :
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th className="text-secondary">#</th>
                      <th className="text-secondary">Nombre del producto</th>
                      <th className="text-secondary">Precio</th>
                      <th className="text-secondary">Categoria</th>
                      <th className="text-secondary">Imagen</th>
                      <th className="text-secondary">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaProductos && listaProductos.length > 0 ? (
                    listaProductos.map((producto, indice) => (
                      <ItemProducto
                        key={producto._id}
                        producto={producto}
                        fila={(pageProductos - 1) * limit + indice + 1}
                        setListaProductos={setListaProductos}
                        pageProductos={pageProductos}
                        limit={limit}
                      ></ItemProducto>
                    ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          No hay productos disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                }
                {totalPagesProductos > 1 && (
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Button
                      variant="warning"
                      onClick={() => setPageProductos((prev) => Math.max(prev - 1, 1))}
                      disabled={pageProductos === 1}
                    >
                      Anterior
                    </Button>
                    <span className="mx-3 text-dark  px-2 py-2 rounded">
                      Página {pageProductos} de {totalPagesProductos}
                    </span>
                    <Button
                      variant="warning"
                      onClick={() => setPageProductos((prev) => Math.min(prev + 1, totalPagesProductos))}
                      disabled={pageProductos === totalPagesProductos}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </div>
            )}
            {activeSection === "reservas" && (
              <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
                <div className="  align-items-center mt-2 mb-3">
                  <Row className="d-flex justify-content-between align-items-center mb-3">
                    <Col xs={12} md={6} className="mb-2 mb-md-0">
                      <div className="d-flex align-items-center">
                        <h2 className="display-6 titulo-admin fw-bold me-4">Reservas</h2>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form>
                        <Row className="justify-content-start justify-content-md-end">
                          <Col xs="auto" className="d-flex align-items-center">
                            <i className="bi bi-search fs-3 me-2 text-secondary"></i>
                            <Form.Control
                              type="date"
                              placeholder="Buscar por fecha"
                              className="mr-sm-2"
                              onChange={handleFechaChange}
                              value={fechaBusqueda}
                            />
                            <Button
                              variant={fechaBusqueda ? "outline-danger" : "outline-secondary"}
                              className="border-0"
                              disabled={!fechaBusqueda}
                              onClick={() => {
                                setFechaBusqueda("");
                                setPageReservas(1);
                                obtenerReservas();
                              }}
                              title={fechaBusqueda ? "Limpiar búsqueda" : "Selecciona una fecha para limpiar"}
                            >
                              <i className="bi bi-x-circle"></i>
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </div>
                {mostrarSpinner ?                     
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="warning" role="status" ></Spinner>
                </div> 
                :
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th className="text-secondary">#</th>
                      <th className="text-secondary">Cancha</th>
                      <th className="text-secondary">Cliente</th>
                      <th className="text-secondary">Fecha</th>
                      <th className="text-secondary">Turno</th>
                      <th className="text-secondary">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaReservas.reservas && listaReservas.reservas.length > 0 ? (
                      listaReservas.reservas.map((reserva, indice) => (
                        <ItemReservaAdmin
                          key={reserva._id}
                          reserva={reserva}
                          fila={(pageReservas - 1) * limit + indice + 1}
                          setListaReservas={setListaReservas}
                          pageReservas={pageReservas}
                          limit={limit}
                        ></ItemReservaAdmin>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          {fechaBusqueda ? "No se encontraron reservas para la fecha seleccionada" : "No hay reservas disponibles"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                }
                {!fechaBusqueda && totalPagesReservas > 1 && (
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Button
                      variant="warning"
                      onClick={() => setPageReservas((prev) => Math.max(prev - 1, 1))}
                      disabled={pageReservas === 1}
                    >
                      Anterior
                    </Button>
                    <span className="mx-3 text-dark px-2 py-2 rounded">
                      Página {pageReservas} de {totalPagesReservas}
                    </span>
                    <Button
                      variant="warning"
                      onClick={() => setPageReservas((prev) => Math.min(prev + 1, totalPagesReservas))}
                      disabled={pageReservas === totalPagesReservas}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Administrador;
