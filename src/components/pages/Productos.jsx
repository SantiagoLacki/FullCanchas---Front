import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import CardProducto from "./producto/CardProducto.jsx";
import "./Productos.css";

function Productos({ listaProductos }) {
  const productosPorPagina = 3;

  // estados independientes por categoría
  const [pageRemeras, setPageRemeras] = useState(1);
  const [pageBebidas, setPageBebidas] = useState(1);
  const [pageSnacks, setPageSnacks] = useState(1);
  const [pagePelotas, setPagePelotas] = useState(1);

  const mostrarProductos = (categoria, page) => {
    const filtrados = listaProductos.filter((p) => p.categoria === categoria);
    const totalPages = Math.ceil(filtrados.length / productosPorPagina);
    const inicio = (page - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = filtrados.slice(inicio, fin);

    return {
      productos: productosPagina,
      totalPages,
    };
  };

  const Categoria = ({ nombre, page, setPage }) => {
    const { productos, totalPages } = mostrarProductos(nombre, page);
    return (
      <div className="categoria">
        <h2 className="text-black text-center">{nombre}</h2>
        <Row className="g-4 bg-white rounded">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <Col key={producto._id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center pb-3">
                <CardProducto producto={producto} />
              </Col>
            ))
          ) : (
            <p className="text-black text-center">No hay productos disponibles en esta categoría.</p>
          )}
        </Row>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Button variant="primary" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Anterior
            </Button>
            <span className="mx-3 text-light bg-primary px-2 py-2 rounded">
              Página {page} de {totalPages}
            </span>
            <Button variant="primary" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
              Siguiente
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="container">
      <h1 className="text-center text-primary">Productos por categoría</h1>
      <Categoria nombre="Remeras" page={pageRemeras} setPage={setPageRemeras} />
      <Categoria nombre="Bebidas" page={pageBebidas} setPage={setPageBebidas} />
      <Categoria nombre="Snacks" page={pageSnacks} setPage={setPageSnacks} />
      <Categoria nombre="Pelotas" page={pagePelotas} setPage={setPagePelotas} />
    </section>
  );
}

export default Productos;
