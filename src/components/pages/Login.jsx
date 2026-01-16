import { Container, Row, Col, Form, Button, Card, Image, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { login } from "./helpers/queries";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Login({ setUsuarioAdmin, setCarrito }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

  const iniciarSesion = async (usuario) => {
    setMostrarSpinner(true);
    setDeshabilitarBoton(true);
    
    try {
      const respuesta = await login(usuario);
      if (respuesta.status === 200) {
        const datosUsuario = await respuesta.json();
        setUsuarioAdmin(datosUsuario);
        setCarrito([]);
        sessionStorage.removeItem("carrito");
        Swal.fire({
          title: "Inicio de sesión correcto",
          text: `Bienvenido ${datosUsuario.nombreUsuario}`,
          icon: "success",
        });
        if (datosUsuario.rol === "empleado" || datosUsuario.rol === "admin" || datosUsuario.rol === "superAdmin") {
          navegacion("/usuarios");
        } else {
          navegacion("/");
        }
      } else {
        Swal.fire({
          title: "Error al iniciar sesión",
          text: `Credenciales incorrectas`,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error de conexión",
        text: `No se pudo conectar con el servidor`,
        icon: "error",
      });
    } finally {
      setMostrarSpinner(false);
      setDeshabilitarBoton(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center py-5">
      <Card className="card-login shadow-lg border-0">
        <Row className="g-0">
          <Col md={6}>
            <Image
              src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg"
              alt="Cancha de fútbol"
              fluid
              className="rounded-start object-fit-cover d-none d-md-block login-image"
            />
          </Col>
          <Col xs={12} md={6}>
            <Card.Body className="p-4 p-md-5">
              <Card.Title as="h2" className="text-center mb-4">
                Inicio de Sesión
              </Card.Title>
              <Form onSubmit={handleSubmit(iniciarSesion)}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="nombre@dominio.com"
                    required
                    {...register("email", {
                      required: "El email es un dato obligatorio",
                      pattern: {
                        value:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message: "El email debe tener un formato valido, por ej: juanperez@mail.com",
                      },
                    })}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="fw-semibold">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    required
                    {...register("password", {
                      required: "La contraseña es un dato obligatorio",
                      pattern: {
                        value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                        message:
                          "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.",
                      },
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password.message}
                    </Form.Text>
                  )}
                  <div className="text-end mt-1">
                    <Link to={"*"} className="text-decoration-none text-primary small">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3 fw-bold btn-fullcanchas-primary"
                  disabled={deshabilitarBoton}
                >
                  {mostrarSpinner ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
                
                <hr className="my-4" />
                <p className="text-center mt-3 mb-0 small">
                  ¿Aún no tienes cuenta?
                  <Link to={"/registro"} className="fw-bold ms-1 text-decoration-none link-fullcanchas-primary">
                    Regístrate aquí
                  </Link>
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