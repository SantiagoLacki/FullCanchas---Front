import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router";

const Carrito = ({ carrito, eliminarDelCarrito }) => {
  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Carrito de Compras</h1>
      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((prod) => (
                    <tr key={prod._id}>
                      <td className="d-flex align-items-center gap-3">
                        <img src={prod.imagen} alt={prod.nombre} width="60" className="rounded" />
                        <span>{prod.nombre}</span>
                      </td>
                      <td>${prod.precio.toLocaleString("es-AR")}</td>
                      <td>{prod.cantidad}</td>
                      <td>${(prod.precio * prod.cantidad).toLocaleString("es-AR")}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(prod._id)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4>Resumen del Pedido</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Total Productos:</span>
                <span>{carrito.reduce((acc, p) => acc + p.cantidad, 0)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total a Pagar:</span>
                <span>${carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toLocaleString("es-AR")}</span>
              </div>
              <Button variant="success" className="w-100 mt-3">
                Finalizar Compra
              </Button>
              <Link to="/productos" className="btn btn-outline-secondary w-100 mt-2">
                Seguir Comprando
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
