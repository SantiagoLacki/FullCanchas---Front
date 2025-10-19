import { Form, Button, Col, Row} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm} from "react-hook-form";
import { crearCancha, editarCancha, obtenerCanchaPorId } from "../helpers/queries";

const FormularioCancha = ({titulo}) => {
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

    useEffect(()=>{
          obtenerCancha();
    },[])

    const obtenerCancha = async()=>{
        if(titulo === 'Modificar Cancha'){
            const respuesta = await obtenerCanchaPorId(id)
            if(respuesta.status === 200){
                const canchaBuscada = await respuesta.json()
            if(canchaBuscada === undefined){
                navegacion('/administrador')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El usuario es inexistente",
                    });
                }else{
                    setValue('nombre', canchaBuscada.nombre)
                    setValue('tipoDeSuperficie', canchaBuscada.tipoDeSuperficie)
                    setValue('precioPorHora', canchaBuscada.precioPorHora)
                    setValue('imagen', canchaBuscada.imagen)
                    setValue('disponibilidad', canchaBuscada.disponibilidad === "true")
                }
            }
        }
    }

    const onSubmit = async (cancha) =>{
        const canchaAEnviar = {
            ...cancha,
            disponibilidad: Boolean(cancha.disponibilidad)
        };
        if(titulo === 'Cancha Nueva'){
            const respuesta = await crearCancha(canchaAEnviar)
            if(respuesta.status === 201){
              Swal.fire({
              title: "Cancha creada",
              text: `La cancha ${cancha.nombre} fue creada correctamente`,
              icon: "success"
              });
            reset()
            }else{
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No pudo crearse la cancha",
            });
            }
        }else{
          const respuesta = await editarCancha(cancha, id)
            if(respuesta.status === 200){
                Swal.fire({
                title: "Cancha editada",
                text: `La cancha ${cancha.nombre} fue editada correctamente`,
                icon: "success"
            });
            }
        }
        navegacion('/administrador')
    }

    return (
        <div className="fono-gral">
            <div className="text-center pt-3">
                <img
                    className="imagen-icono"
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1760824225/cancha2_r5glah.png"
                    alt="icono cancha"
                />
            </div>
            <section className="container">
                <div className="border rounded-4 py-1 px-4 mb-4 shadow-lg bg-light">
                <h1 className="display-6 titulo-admin fw-bold text-center me-4 mt-2">{titulo}</h1>
                <div className="d-flex justify-content-center">
                    <Form className="my-4 w-75" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-4" controlId="formNombreCancha">
                            <Form.Label className="me-2">Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cancha N° 1"
                                {...register("nombre", {
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

                        <Form.Group className="mb-4" controlId="formPrecio">
                            <Form.Label className="me-2">Precio: </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="$50"
                                {...register("precioPorHora", {
                                required: "El precio es un valor obligatorio",
                                min: {
                                    value: 1,
                                    message:
                                    "El precio minimo del alquiler debe ser de almenos $50",
                                },
                                max: {
                                    value: 1000000,
                                    message:
                                    "El precio maximo del alquilero debe ser de hasta $1000000",
                                },
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.precio?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formImagen">
                            <Form.Label>Imagen URL:</Form.Label>
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

                        <Form.Group className="mb-4">
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
                            <Form.Text>
                                La cancha estará disponible para reservas cuando esté activada
                            </Form.Text>
                        </Form.Group>

                        <Row className="mt-5">
                            <Col xs={12} md={6} className="mb-2 mb-md-0 text-center text-md-end">
                                <Button type="submit" variant="warning" className="w-50 btn-gold text-white">
                                    Guardar
                                </Button>
                            </Col>
                            <Col xs={12} md={6} className="text-center text-md-start">
                                <Link to={"/administrador"} className="btn btn-danger w-50">
                                    Cancelar
                                </Link>
                            </Col>
                        </Row>   
                    </Form>
                </div>
                </div>
            </section>
        </div>
    );
};

export default FormularioCancha;