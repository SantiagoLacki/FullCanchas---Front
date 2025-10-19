import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DetalleProductos = () => {
  // 🔹 Datos de ejemplo (solo para visualizar el diseño)
  const producto = {
    nombre: "Pelota Adidas Tango",
    categoria: "Pelotas",
    descripcion: "Pelota profesional de fútbol tamaño 5, con diseño clásico y materiales de alta durabilidad.",
    precio: 24999,
    imagen: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Row className="g-0">
              {/* Imagen del producto */}
              <Col md={6}>
                <Card.Img src={producto.imagen} alt={producto.nombre} className="img-fluid h-100 object-fit-cover" />
              </Col>

              {/* Detalles del producto */}
              <Col md={6}>
                <Card.Body className="p-4 d-flex flex-column justify-content-between h-100">
                  <div>
                    <Card.Title as="h2" className="fw-bold mb-3 text-primary">
                      {producto.nombre}
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-3">Categoría: {producto.categoria}</Card.Subtitle>
                    <Card.Text className="mb-4">{producto.descripcion}</Card.Text>
                  </div>

                  <div>
                    <h3 className="fw-bold text-success mb-3">${producto.precio.toLocaleString("es-AR")}</h3>
                    <div className="d-flex gap-2">
                      <Button variant="success" className="fw-semibold w-100">
                        Agregar al carrito
                      </Button>
                      <Link to="/productos" className="btn btn-outline-secondary w-100 fw-semibold">
                        Volver
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
