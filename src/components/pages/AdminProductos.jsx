import { Col, Form, Row, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";

import { useEffect, useState } from "react";

import ItemProducto from "./producto/ItemProducto";
import {

  leerProductos,
  leerProductosPaginados,

} from "./helpers/queries";

import Swal from "sweetalert2";

const AdminProductos = () => {

  const [terminoBusquedaProducto, setTerminoBusquedaProducto] = useState("");
 
  const [listaProductos, setListaProductos] = useState([]);


  const [limit] = useState(10);

  const [pageProductos, setPageProductos] = useState(1);
  const [totalPagesProductos, setTotalPagesProductos] = useState(1);
    const [mostrarSpinnerProductos, setMostrarSpinnerProductos] = useState(true);


  useEffect(() => {

    obtenerProductos();
  }, [ pageProductos]);


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
