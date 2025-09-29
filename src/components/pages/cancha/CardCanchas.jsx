import { Button, Card, Col} from "react-bootstrap";
import { Link } from "react-router";

const CardCanchas = () => {
    return (
        <Col md={6} lg={4} className="mb-5">
            <Card style={{ width: '20rem' }} border="0" className="shadow-sm">
            <Card.Img variant="top" className="imagenGaleria" src="https://images.pexels.com/photos/14767661/pexels-photo-14767661.png" />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100 p-3 bg-dark bg-opacity-75">
                <h5 className="text-white fw-bold mb-0 text-shadow">CANCHA N° 1</h5>
            </div>
            <Card.Body className="border-0">
                <Card.Text className="fw-light text-center">
                Cancha de Futbol 5 | Césped sintético | Con iluminación
                </Card.Text>
                <div className="text-center">
                    <Button variant="primary" className="btn-gold">Reservar</Button>
                </div>
            </Card.Body>
            </Card>
        </Col>
    );
};

export default CardCanchas;