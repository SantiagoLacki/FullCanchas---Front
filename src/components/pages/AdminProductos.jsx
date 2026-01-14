import { Col, Form, Row, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";

import { useEffect, useState } from "react";

import ItemProducto from "./producto/ItemProducto";
import {

  leerProductos,
  leerProductosPaginados,

} from "./helpers/queries";

import Swal from "sweetalert2";

const AdminProductos = ({usuarioAdmin}) => {

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
        if (productosOriginales.length > 0) {
            const datosFiltrados = filtrarProductos(productosOriginales);
            setListaProductos(datosFiltrados);
        }
    obtenerProductos();
  }, [pageProductos, filtroEstado]);

  const filtrarProductos = (productos) =>{
    let datosFiltrados = [... productos]
    if (filtroEstado === "disponibles"){
      datosFiltrados = datosFiltrados.filter(producto => producto.habilitado);
    } else if(filtroEstado === "nodisponibles"){
      datosFiltrados = datosFiltrados.filter(producto => !producto.habilitado)
    }

    return datosFiltrados
  }

  const obtenerProductos = async () => {
    setMostrarSpinnerProductos(true);
    const respuesta = await leerProductosPaginados(pageProductos, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      const productosRecibidos = datos.productos
      setProductosOriginales(productosRecibidos);
      const datosFiltrados = filtrarProductos(productosRecibidos);
      setListaProductos(datosFiltrados);
      setTotalPagesProductos(datos.totalPages || Math.ceil(productosFiltrados.length / limit));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerProductos(false);
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

  
  return (
    <section className="container mainSection">
      <>
        <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
          <div className="  align-items-center mt-2 mb-3">
            <Row className="d-flex justify-content-between align-items-center mb-3">
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <div className="d-flex align-items-center">
                  <h2 className="display-6 titulo-admin fw-bold  me-4">Productos</h2>
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
                            className=" mr-sm-2"
                            onChange={handleBuscarProducto}
                            value={terminoBusquedaProducto}
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
                            className={`btn ${filtroEstado === "disponibles" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => setFiltroEstado("disponibles")}
                            title="Mostrar los productos disponibles"
                        >
                            <i className="bi bi-person-check me-1"></i> Activos
                        </button>
                        <button
                            type="button"
                            className={`btn ${filtroEstado === "nodisponibles" ? "btn-danger" : "btn-outline-danger"}`}
                            onClick={() => setFiltroEstado("nodisponibles")}
                            title="Mostrar solo productos no disponibles"
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
                    <td colSpan="6" className="text-center text-muted py-4">
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
      </>
    </section>
  );
};

export default AdminProductos;
