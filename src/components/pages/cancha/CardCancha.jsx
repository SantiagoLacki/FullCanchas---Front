import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardCancha = ({ cancha }) => {
  const estaDisponible = cancha.disponibilidad === "true";
  return (
    <Card className="shadow-sm h-100 border border-1 border-black mb-3">
      <div className="overflow-hidden">
        <Card.Img variant="top" src={cancha.imagen} alt={cancha.nombre} className="imagenGaleria" />
      </div>
      <Card.Body className="border-0 d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-bold fs-5 mb-2 text-dark text-center">{cancha.nombre}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted text-center">{cancha.tipoDeSuperficie}</Card.Subtitle>

          <Card.Text className="text-secondary small text-center">
            {estaDisponible ? "Disponible para reserva" : "No disponible actualmente"}
          </Card.Text>
        </div>
        <div className="text-center mt-3">
          <Card.Text className="fw-bold fs-4 text-dark mb-3">${cancha.precioPorHora.toLocaleString("es-AR")}/hora</Card.Text>
          {estaDisponible ? (
            <Button as={Link} to={`/reserva/${cancha._id}`} className="w-100 btn-gold text-white">
              Reservar
            </Button>
          ) : (
            <Button variant="secondary" className="w-100" disabled>
              No disponible
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardCancha;
