import { Container, Row, Col, Card } from "react-bootstrap";
import "./QuienesSomos.css";

const QuienesSomos = () => {
  return (
    <section className="quienes-somos-section py-5">
      <Container>
        <h2 className="text-center mb-4">¿Quiénes Somos?</h2>
        <p className="text-center mb-5">
          Nacimos con el objetivo de unir a las personas a través del fútbol. Lo que comenzó como un pequeño grupo de amigos jugando los
          fines de semana se transformó en un espacio donde la pasión, el deporte y la amistad se mezclan.
        </p>

        <Row className="mb-5">
          <Col md={4}>
            <Card className="info-card">
              <Card.Img variant="top" src="primera_cancha.png" alt="Nuestra Historia" />
              <Card.Body>
                <Card.Title>Nuestro Comienzo</Card.Title>
                <Card.Text>
                  Iniciamos con una sola cancha y muchas ganas de compartir la pasión por el fútbol. Hoy contamos con más de 10 canchas en
                  excelente estado y una comunidad que sigue creciendo.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="info-card">
              <Card.Img variant="top" src="Colage_instalaciones.jpg" alt="Instalaciones" />
              <Card.Body>
                <Card.Title>Instalaciones</Card.Title>
                <Card.Text>
                  Contamos con canchas de césped sintético de última generación, vestuarios con duchas, estacionamiento privado y un buffet
                  con opciones para todos los gustos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="info-card">
              <Card.Img variant="top" src="boceto_proyecto_futuro.png" alt="Nuestra Meta" />
              <Card.Body>
                <Card.Title>Nuestra Meta</Card.Title>
                <Card.Text>
                  Queremos seguir creciendo y ofreciendo el mejor lugar para disfrutar del deporte, fomentando los valores del respeto, la
                  amistad y la sana competencia.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <h4>📍 Actualmente</h4>
          <p>
            Estamos en constante expansión, con una alta demanda y nuevas propuestas que buscan conectar a la gente a través del fútbol, el
            entretenimiento y el compañerismo.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default QuienesSomos;
