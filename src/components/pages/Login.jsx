import { Row, Col, Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <section className='container my-3'>
      <h1 className='text-center my-5'>Inicio de Sesión</h1>
      <Row xs={1} md={2} className='mt-5'>
        <Col>
          <Form >
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
        <Col>
          <img src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg" alt="pelota" className="w-100 rounded d-none d-sm-block"></img>
        </Col>
      </Row>
    </section>
  );
}

export default Login;