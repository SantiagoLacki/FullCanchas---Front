import { Button, Card } from "react-bootstrap";

const CardProducto = ({ producto }) => {
  return (
    <Card className="shadow-sm h-100 border border-1 border-black">
      <div className="overflow-hidden">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="imagenGaleria" />
      </div>

      <Card.Body className="border-0 d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-bold fs-5 mb-2 text-dark">{producto.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{producto.categoria}</Card.Subtitle>
          <Card.Text className="text-secondary small">
            {producto.descripcion.length > 30 ? producto.descripcion.slice(0, 30) + "..." : producto.descripcion}
          </Card.Text>
        </div>

        <div>
          <Card.Text className="fw-bold fs-4 text-dark mt-2">${producto.precio.toLocaleString("es-AR")}</Card.Text>
          <Button className="w-100">Sumar al carrito</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProducto;
