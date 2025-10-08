import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router';

const Register = () => {
  
  return (
    <Container className='d-flex align-items-center justify-content-center my-5'>
      <Card className='card-register shadow-lg border-0'>
        <Row className='g-0'>
          
          <Col xs={12} md={6}>
            <Card.Body className='p-4 p-md-5'>
              <Card.Title as="h2" className='text-center mb-4'>Crear Cuenta</Card.Title>
              <Form> 
                <Form.Group className="mb-3" controlId="formUserName">
                  <Form.Label className='fw-semibold'>Nombre de Usuario</Form.Label>
                  <Form.Control type="text" placeholder="Ej: JugadorCrack" required minLength="3" maxLength="50"/>
                  <Form.Control.Feedback type="invalid">
                    Ingresa un nombre de usuario válido (mínimo 3 caracteres).
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className='fw-semibold'>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="nombre@dominio.com" required/>
                  <Form.Control.Feedback type="invalid">
                    Ingresa un formato de correo electrónico válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label className='fw-semibold'>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" required minLength="8"/>
                  <Form.Control.Feedback type="invalid">
                    La contraseña es obligatoria (mínimo 8 caracteres).
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label className='fw-semibold'>Repetir Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Repetir Contraseña" required/>
                  <Form.Control.Feedback type="invalid">
                    Debes confirmar la contraseña.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3 fw-bold" >Registrarse</Button>
                <hr className='my-4' />
                <p className='text-center mt-3 mb-0 small'>¿Ya tienes cuenta?<Link to={"/login"} className="fw-bold ms-1 text-decoration-none link-fullcanchas-primary">Iniciar Sesión</Link></p>
              </Form>
            </Card.Body>
          </Col>
          <Col md={6}>
            <Image src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg" alt="Cancha de fútbol" fluid className="rounded-end object-fit-cover d-none d-md-block login-image"/>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Register;