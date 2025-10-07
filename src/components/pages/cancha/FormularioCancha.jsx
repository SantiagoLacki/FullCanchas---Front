import { Form, Button} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm} from "react-hook-form";

const FormularioCancha = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue,
      watch
    } = useForm();
    const navegacion = useNavigate()
    const {id} = useParams()

    const onSubmit = async (receta) =>{

    }
    return (
        <>
            <div className="text-center mt-3">
                <img
                    className="imagen-icono"
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759706583/cancha_itfl2j.png"
                    alt="icono cancha"
                />
            </div>
            <section className="container mainSection border text-white rounded-2 py-1 px-4 mt-4 shadow-lg">
                <h1 className="display-6 titulo-banner fw-bold text-center me-4 mt-2">Nueva Cancha</h1>
                <div className="d-flex justify-content-center">
                    <Form className="my-4 w-75" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 d-flex align-items-center" controlId="formNombreCancha">
                            <Form.Label className="me-2">Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cancha N° 1"
                                {...register("nombreCancha", {
                                required: "El nombre de la cancha es un dato obligatorio",
                                minLength: {
                                    value: 2,
                                    message:
                                    "El nombre de la cancha debe tener al menos 2 caracteres",
                                },
                                maxLength: {
                                    value: 100,
                                    message:
                                    "El nombre de la cancha debe tener como máximo 100 caracteres",
                                },
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.nombreCancha?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center" controlId="formImagen">
                            <Form.Label>Imagen URL*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://www.pexels.com/es-es/imagen1"
                                {...register("imagen", {
                                required: "La url de la imagen es un dato obligatorio",
                                pattern: {
                                    value:
                                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/,
                                    message:
                                    "La imagen debe ser una url de imagen valida terminada en (jpg|jpeg|png|webp)",
                                },
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.imagen?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label>Tipo de Superficie: </Form.Label>
                            <Form.Select 
                            {...register('tipoDeSuperficie', {
                                required: 'El tipo de superficie es un dato obligatorio.',
                            })}
                            >
                            <option value="" disabled>Seleccione el tipo de superficie</option>
                            <option value="Césped">Césped</option>
                            <option value="Césped artificial">Césped artificial</option>
                            <option value="Tierra">Tierra</option>
                            <option value="Pista dura">Pista dura</option>
                            
                            </Form.Select>
                            <Form.Text className="text-danger">
                            {errors.tipoDeSuperficie?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDisponibilidad">
                            <Form.Label>Disponibilidad:</Form.Label>
                                <div>
                                    <Form.Switch 
                                        type="switch"
                                        label={watch('disponibilidad') ? "Disponible" : "No disponible"}
                                        {...register("disponibilidad")}
                                        className="fs-5"
                                    />
                                </div>
                                <Form.Text className="text-muted">
                                    La cancha estará disponible para reservas cuando esté activada
                                </Form.Text>
                            </Form.Group>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default FormularioCancha;