import { Form, Button} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm} from "react-hook-form";

const FormularioUsuario = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue
    } = useForm();
    const navegacion = useNavigate()
    const {id} = useParams()

    const onSubmit = async (usuario) =>{

    }
    return (
        <>
            <div className="text-center mt-3">
                <img
                    className="imagen-icono"
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759706583/usuario_gmhgg9.png"
                    alt="icono elegí"
                />
            </div>
            <section className="container mainSection border text-white rounded-2 py-1 px-4 mt-4 shadow-lg">
                <h1 className="display-6 titulo-banner fw-bold text-center me-4 mt-2">Nuevo Usuario</h1>
                <div className="d-flex justify-content-center">
                    <Form className="my-4 w-75" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 d-flex align-items-center" controlId="formNombreCancha">
                            <Form.Label className="me-2">Nombre Usuario:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="usuario"
                                {...register("nombreUsuario", {
                                required: "El nombre del usuario es un dato obligatorio",
                                minLength: {
                                    value: 2,
                                    message:
                                    "El nombre del usuario debe tener al menos 2 caracteres",
                                },
                                maxLength: {
                                    value: 100,
                                    message:
                                    "El nombre del usuario debe tener como máximo 100 caracteres",
                                },
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.nombreCancha?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center" controlId="formEmail">
                            <Form.Label className="me-2">Email:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="admin@admin.com"
                                {...register("email", {
                                required: "El Email es un valor obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Por favor ingresa un email válido"
                                    }
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.email?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center" controlId="formPassword">
                            <Form.Label className="me-2">Contraseña:</Form.Label>
                            <Form.Control
                                type="password"
                                {...register("password", {
                                required: "La contraseña es un dato obligatorio",
                                pattern: {
                                    value:
                                    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                                    message:
                                    "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
                                },
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.password?.message}
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex justify-content-around mt-5">
                            <Button type="submit" variant="warning" className="w-25">
                                Guardar
                            </Button>
                            <Link to={"/administrador"} className="btn btn-danger ms-5 w-25">
                                Cancelar
                            </Link>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default FormularioUsuario;