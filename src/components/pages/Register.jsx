import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { crearUsuario } from "./helpers/queries";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const navegacion = useNavigate();

  const password = watch("password");

  const onSubmit = async (usuario) => {
    const respuesta = await crearUsuario(usuario);
    if (respuesta.status === 201) {
      Swal.fire({
        title: "Usuario creado",
        text: `El usuario ${usuario.nombreUsuario} fue creado correctamente`,
        icon: "success",
      });
      reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudo crearse el usuario",
      });
    }
    navegacion("/login");
  };

  return (
    <div className="fono-gral">
      <Container className="d-flex align-items-center justify-content-center py-5">
        <Card className="card-register shadow-lg border-0">
          <Row className="g-0">
            <Col xs={12} md={6}>
              <Card.Body className="p-4 p-md-5">
                <Card.Title as="h2" className="text-center mb-4">
                  Crear Cuenta
                </Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label className="fw-semibold">Nombre de Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Usuario"
                      isInvalid={!!errors.nombreUsuario}
                      {...register("nombreUsuario", {
                        required: "El nombre del usuario es un dato obligatorio",
                        minLength: {
                          value: 2,
                          message: "El nombre del usuario debe tener al menos 2 caracteres",
                        },
                        maxLength: {
                          value: 100,
                          message: "El nombre del usuario debe tener como máximo 100 caracteres",
                        },
                      })}
                    />
                    <Form.Text className="text-danger">{errors.nombreUsuario?.message}</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="nombre@dominio.com"
                      isInvalid={!!errors.email}
                      {...register("email", {
                        required: "El Email es un valor obligatorio",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Por favor ingresa un email válido",
                        },
                      })}
                    />
                    <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className="fw-semibold">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      isInvalid={!!errors.password}
                      {...register("password", {
                        required: "La contraseña es un dato obligatorio",
                        pattern: {
                          value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                          message:
                            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
                        },
                      })}
                    />
                    <Form.Text className="text-danger">{errors.password?.message}</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Label className="fw-semibold">Repetir Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repetir Contraseña"
                      isInvalid={!!errors.confirmPassword}
                      {...register("confirmPassword", {
                        required: "Debes confirmar la contraseña",
                        validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message || "Debes confirmar la contraseña."}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="tipoUsuario">
                    <Form.Label className="fw-semibold">Tipo de Usuario</Form.Label>
                    <Form.Select
                      {...register("rol", {
                        required: "Debes seleccionar un tipo de usuario",
                      })}
                      isInvalid={!!errors.rol}
                    >
                      <option value="">Seleccione un tipo de usuario</option>
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                      <option value="staff">Desarrollador</option>
                    </Form.Select>
                    <Form.Text className="text-danger">{errors.rol?.message}</Form.Text>
                  </Form.Group>

                  {["admin", "staff"].includes(watch("rol")) && (
                    <Form.Group className="mb-4" controlId="formClave">
                      <Form.Label className="fw-semibold">Clave</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Clave de acceso para roles especiales"
                        isInvalid={!!errors.secretKey}
                        {...register("secretKey", {
                          required: "La clave es obligatoria para roles especiales",
                        })}
                      />
                      <Form.Text className="text-danger">{errors.secretKey?.message}</Form.Text>
                    </Form.Group>
                  )}

                  <Button variant="primary" type="submit" className="w-100 mb-3 fw-bold">
                    Registrarse
                  </Button>
                  <hr className="my-4" />
                  <p className="text-center mt-3 mb-0 small">
                    ¿Ya tienes cuenta?
                    <Link to={"/login"} className="fw-bold ms-1 text-decoration-none link-fullcanchas-primary">
                      Iniciar Sesión
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Col>
            <Col md={6}>
              <Image
                src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg"
                alt="Cancha de fútbol"
                fluid
                className="rounded-end object-fit-cover d-none d-md-block login-image"
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
