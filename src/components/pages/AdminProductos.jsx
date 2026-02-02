import { Col, Form, Row, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import ItemProducto from "./producto/ItemProducto";
import { leerProductosPaginados } from "./helpers/queries";
import Swal from "sweetalert2";

const AdminProductos = ({ usuarioAdmin }) => {
  const [terminoBusquedaProducto, setTerminoBusquedaProducto] = useState("");
  const [listaProductos, setListaProductos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [limit] = useState(10);
  const [pageProductos, setPageProductos] = useState(1);
  const [totalPagesProductos, setTotalPagesProductos] = useState(1);
  const [mostrarSpinnerProductos, setMostrarSpinnerProductos] = useState(true);

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (productosOriginales.length > 0) {
      const datosFiltrados = filtrarProductos(productosOriginales);
      setListaProductos(datosFiltrados);
    }
  }, [pageProductos, filtroEstado, productosOriginales, terminoBusquedaProducto]);

  const filtrarProductos = (productos) => {
    let datosFiltrados = [...productos];

    if (filtroEstado === "disponibles") {
      datosFiltrados = datosFiltrados.filter((producto) => producto.habilitado);
    } else if (filtroEstado === "nodisponibles") {
      datosFiltrados = datosFiltrados.filter((producto) => !producto.habilitado);
    }

    if (terminoBusquedaProducto) {
      datosFiltrados = datosFiltrados.filter((producto) => producto.nombre.toLowerCase().includes(terminoBusquedaProducto.toLowerCase()));
    }

    return datosFiltrados;
  };

  const obtenerProductos = async () => {
    try {
      setMostrarSpinnerProductos(true);
      const primeraRespuesta = await leerProductosPaginados(1, limit);
      if (primeraRespuesta.status !== 200) throw new Error();

      const primeraPagina = await primeraRespuesta.json();
      let todosLosProductos = [...primeraPagina.productos];
      const totalPaginas = primeraPagina.totalPages;

      for (let i = 2; i <= totalPaginas; i++) {
        const resp = await leerProductosPaginados(i, limit);
        if (resp.status === 200) {
          const datos = await resp.json();
          todosLosProductos = [...todosLosProductos, ...datos.productos];
        }
      }
      setProductosOriginales(todosLosProductos);

      const datosFiltrados = filtrarProductos(todosLosProductos);
      setListaProductos(datosFiltrados);
      setTotalPagesProductos(Math.ceil(datosFiltrados.length / limit));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerProductos(false);
  };

  const handleBuscarProducto = (e) => {
    const termino = e.target.value;
    setTerminoBusquedaProducto(termino);
  };

  const resetearFiltros = () => {
    setFiltroEstado("todos");
    setTerminoBusquedaProducto("");
    const datosFiltrados = filtrarProductos(productosOriginales);
    setListaProductos(datosFiltrados);
  };

  return (
    <section className="container mainSection">
      <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
        <div className="align-items-center mt-2 mb-3">
          <Row className="d-flex justify-content-between align-items-center mb-3">
            <Col xs={12} md={6} className="mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <h2 className="display-6 titulo-admin fw-bold me-4">Productos</h2>
                <div>
                  <Link className="btn btn-gold text-white" to={"/productos/crearproducto"}>
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
                        onChange={handleBuscarProducto}
                        value={terminoBusquedaProducto}
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
                  title="Mostrar todos los productos"
                >
                  Todos
                </button>
                <button
                  type="button"
                  className={`btn ${filtroEstado === "disponibles" ? "btn-success" : "btn-outline-success"}`}
                  onClick={() => setFiltroEstado("disponibles")}
                  title="Mostrar los productos disponibles"
                >
                  <i className="bi bi-check-circle me-1"></i> Disponible
                </button>
                <button
                  type="button"
                  className={`btn ${filtroEstado === "nodisponibles" ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={() => setFiltroEstado("nodisponibles")}
                  title="Mostrar solo productos no disponibles"
                >
                  <i className="bi bi-x-circle me-1"></i> No Disponible
                </button>
              </div>
            </Col>
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
        {mostrarSpinnerProductos ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" role="status"></Spinner>
          </div>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr className="text-center">
                <th className="text-secondary">#</th>
                <th className="text-secondary">Nombre del producto</th>
                <th className="text-secondary">Precio</th>
                <th className="text-secondary">Categoria</th>
                <th className="text-secondary">Imagen</th>
                <th className="text-secondary">Disponibilidad</th>
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
                    obtenerProductos={obtenerProductos}
                    setListaProductos={setListaProductos}
                    pageProductos={pageProductos}
                    limit={limit}
                    usuarioAdmin={usuarioAdmin}
                  ></ItemProducto>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No hay productos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
        {totalPagesProductos > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Button variant="warning" onClick={() => setPageProductos((prev) => Math.max(prev - 1, 1))} disabled={pageProductos === 1}>
              Anterior
            </Button>
            <span className="mx-3 text-dark px-2 py-2 rounded">
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
    </section>
  );
};

export default AdminProductos;
