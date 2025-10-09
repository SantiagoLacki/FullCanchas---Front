import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { login } from './helpers/queries';
import Swal from 'sweetalert2';

function Login() {
  const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
  const navegacion = useNavigate()

  
  return (
    <Container className='d-flex align-items-center justify-content-center my-5'>
      <Card className='card-login shadow-lg border-0'>
        <Row className='g-0'>
          <Col md={6}>
            <Image src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg" alt="Cancha de fútbol" fluid className="rounded-start object-fit-cover d-none d-md-block login-image" />
          </Col>
          <Col xs={12} md={6}>
            <Card.Body className='p-4 p-md-5'>
              <Card.Title as="h2" className='text-center mb-4'>
                Inicio de Sesión
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className='fw-semibold'>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="nombre@dominio.com" required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className='fw-semibold'>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" required />
                  <div className='text-end mt-1'>
                    <Link to={"*"} className="text-decoration-none text-primary small">¿Olvidaste tu contraseña?</Link>
                  </div>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3 fw-bold btn-fullcanchas-primary">Iniciar Sesión</Button>
                <hr className='my-4' />
                <p className='text-center mt-3 mb-0 small'>¿Aún no tienes cuenta?
                  <Link to={"/registro"} className="fw-bold ms-1 text-decoration-none link-fullcanchas-primary">Regístrate aquí</Link>
                </p>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Login;