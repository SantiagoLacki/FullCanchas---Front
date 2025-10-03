import { Button, Card, Col} from "react-bootstrap";
import { Link } from "react-router";

const CardProducto = () => {
    return (
        <Col md={6} lg={4} className="mb-5">
            <Card style={{ width: '16rem' }} border="0" className="shadow-sm">
            <Card.Img variant="top" className="imagenGaleria" src="https://images.pexels.com/photos/32675206/pexels-photo-32675206.jpeg" />
            <Card.Body className="border-0">
                <Card.Title className="fw-ligth">Pelota Futbol 5</Card.Title>
                <Card.Text className="fw-bold fs-4 ">
                $150.000
                </Card.Text>
                <div className="text-center ">
                    <Button variant="primary" className="btn-gold w-100">Comprar</Button>
                </div>
            </Card.Body>
            </Card>
        </Col>
    );
};

export default CardProducto;