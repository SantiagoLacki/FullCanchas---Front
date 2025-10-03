import { Row, Col, Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <section className='container my-3'>
      <h1>Inicio de Sesión</h1>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electronico: </Form.Label>
              <Form.Control type="email" placeholder="nombre@dominio.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña: </Form.Label>
              <Form.Control type="pasword" placeholder="Contraseña" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </section>
  );
}

export default Login;