import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { obtenerProductoPorId } from "./helpers/queries.js";

const DetalleProductos = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const cargarProducto = async () => {
      const productoBuscado = await obtenerProductoPorId(id);
      setProducto(productoBuscado);
    };
    cargarProducto();
  }, [id]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Row className="g-0">
              <Col md={6}>
                <Card.Img src={producto.imagen} alt={producto.nombre} className="img-fluid h-100 object-fit-cover" />
              </Col>
              <Col md={6}>
                <Card.Body className="p-4 d-flex flex-column justify-content-between h-100">
                  <div>
                    <Card.Title as="h2" className="mb-3 display-6 titulo-admin">
                      {producto.nombre}
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-3">Categoría: {producto.categoria}</Card.Subtitle>
                    <Card.Text className="mb-4">{producto.descripcion}</Card.Text>
                  </div>

                  <div>
                    <h3 className="fw-bold text-success mb-3">${producto.precio}</h3>
                    <div className="d-flex gap-2">
                      <Link to="/productos" className="btn btn-danger w-100 fw-semibold d-flex justify-content-center align-items-center">
                        Catalogo
                      </Link>
                      <Link to="/" className="btn btn-info w-100 fw-semibold d-flex justify-content-center align-items-center">
                        Inicio
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleProductos;
