import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { obtenerUsuarioPorId, editarUsuario, crearUsuario } from "../helpers/queries";

const FormularioUsuario = ({ titulo, usuarioAdmin }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const navegacion = useNavigate();
  const { id } = useParams();
  const [usuarioActual, setUsuarioActual] = useState();
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    if (titulo === "Modificar Usuario") {
      const respuesta = await obtenerUsuarioPorId(id);
      if (respuesta.status === 200) {
        const usuarioBuscado = await respuesta.json();
        if (usuarioBuscado === undefined) {
          navegacion("/usuarios");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario es inexistente",
          });
        } else {
          setValue("nombreUsuario", usuarioBuscado.nombreUsuario);
          setValue("email", usuarioBuscado.email);
          setUsuarioActual(usuarioBuscado)
        }
      }
    }
  };

  const onSubmit = async (usuario) => {
    setMostrarSpinner(true);
    setDeshabilitarBoton(true);
    if (titulo === "Usuario Nuevo") {
      const rol = (usuarioAdmin.rol === "superAdmin" || usuarioAdmin.rol === "admin" ) ? usuario.rol : "user";
      const usuarioNuevo = { nombreUsuario: usuario.nombreUsuario, email: usuario.email, password: usuario.password, rol: rol };
      const respuesta = await crearUsuario(usuarioNuevo);
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
    } else {
      const usuarioEditado = { 
        nombreUsuario: usuario.nombreUsuario, 
        email: usuario.email, 
        rol: usuarioActual.rol
      };
      console.log(usuarioEditado)
      const respuesta = await editarUsuario(usuarioEditado, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Usuario editado",
          text: `El usuario ${usuario.nombreUsuario} fue editado correctamente`,
          icon: "success",
        });
      }
    }
    navegacion("/usuarios");
    setMostrarSpinner(false);
    setDeshabilitarBoton(false);
  };
  return (
    <>
      <div className="text-center pt-3">
        <img
          className="imagen-icono"
          src="https://res.cloudinary.com/duwi53e7z/image/upload/v1760824225/usuario2_xel9ui.png"
          alt="icono elegí"
        />
      </div>
      <section className="container">
        <div className="border rounded-4 py-1  mb-4 shadow-lg bg-light">
          <h1 className="display-6 titulo-admin fw-bold text-center me-4 mt-2">{titulo}</h1>
          <div className="d-flex justify-content-center">
            <Form className="my-4 w-75" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 " controlId="formNombreCancha">
                <Form.Label className="me-2">Nombre de usuario:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: usuario1"
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
                <Form.Text className="text-danger">{errors.nombreCancha?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="me-2">Email:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: usuario@admin.com"
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

              {titulo === "Usuario Nuevo" && (
                <>
                <Form.Group className="mb-3 " controlId="formPassword">
                  <Form.Label className="me-2">Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="contraseña"
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
                {(usuarioAdmin.rol === "superAdmin" || usuarioAdmin.rol === "admin" ) && (
                <Form.Group className="mb-3" controlId="tipoUsuario">
                    <Form.Label className="me-2">
                      Tipo de Usuario:
                    </Form.Label>
                    <Form.Select
                      {...register("rol", {
                        required: "Debes seleccionar un tipo de usuario",
                      })}
                      isInvalid={!!errors.rol}
                    >
                      <option value="">Seleccione un tipo de usuario</option>
                      <option value="user">Cliente</option>
                      <option value="empleado">Empleado</option>
                    </Form.Select>
                    <Form.Text className="text-danger">{errors.rol?.message}</Form.Text>
                  </Form.Group>
              
                )
                }
                  </>
              )}

              <Row className="mt-5">
                <Col xs={12} md={6} className="mb-2 mb-md-0 text-center text-md-end">
                  <Button disabled={deshabilitarBoton} type="submit" variant="warning" className="w-50 btn-gold text-white">
                    {mostrarSpinner ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <Spinner animation="border" size="sm" className="me-2" />
                        Guardando...
                      </div>
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </Col>
                <Col xs={12} md={6} className="text-center text-md-start">
                  <Link to={"/usuarios"} className="btn btn-danger w-50">
                    Cancelar
                  </Link>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormularioUsuario;
