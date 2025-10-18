import { Form, Button, Row, Col} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import { crearReserva, editarReserva, leerCanchas, leerUsuarios, obtenerReservaPorId } from "../helpers/queries";

const FormularioReserva = ({titulo}) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue
    } = useForm();
    const navegacion = useNavigate()
    const {id} = useParams()

    const [usuarios, setUsuarios] = useState([]);
    const [canchas, setCanchas] = useState([]);

    useEffect(()=>{
          cargarFormulario();
    },[])

    const cargarFormulario = async () => {
        const [respuestaUsuarios, respuestaCanchas] = await Promise.all([
                leerUsuarios(),
                leerCanchas(),
            ]);
        if (respuestaUsuarios.status === 200) {
            const usuariosBuscados = await respuestaUsuarios.json();
            const usuariosFiltrados = usuariosBuscados.filter(usuario => usuario.rol === 'user');
            setUsuarios(usuariosFiltrados);
        }
        if (respuestaCanchas.status === 200) {
            const canchasBuscadas = await respuestaCanchas.json();
            setCanchas(canchasBuscadas);
        }
        obtenerReserva()
    }

    const obtenerReserva = async()=>{
        if(titulo === 'Modificar Reserva'){
            const respuesta = await obtenerReservaPorId(id)
            if(respuesta.status === 200){
                const reservaBuscada = await respuesta.json()
                if(reservaBuscada === undefined){
                    navegacion('/administrador')
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "La reserva es inexistente",
                        });
                }else{ 
                    const fechaFormateada = new Date(reservaBuscada.dia)
                    .toISOString()
                    .split('T')[0];
                
                    setValue('idUsuario', reservaBuscada.idUsuario?._id)
                    setValue('idCancha', reservaBuscada.idCancha?._id)
                    setValue('dia', fechaFormateada)
                    setValue('hora', reservaBuscada.hora)
                    console.log(reservaBuscada.hora)
                }
            }
        }
    }

    const onSubmit = async (reserva) =>{
        const fechaUTC = new Date(reserva.dia + 'T00:00:00.000Z');
        const reservaFechaUTC = {
            ...reserva,
            dia: fechaUTC.toISOString()
        };
        
        if(titulo === 'Reserva Nueva'){
            const respuesta = await crearReserva(reservaFechaUTC)
            if(respuesta.status === 201){
                Swal.fire({
                title: "Reserva creada",
                text: `La reserva fue creada correctamente`,
                icon: "success"
                });
            reset()
            }else{
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No pudo crearse la reserva",
            });
            }
        }else{
            console.log(reservaFechaUTC)
            const respuesta = await editarReserva(reservaFechaUTC, id)
            console.log(respuesta.status)
            if(respuesta.status === 200){
                Swal.fire({
                title: "Reserva editada",
                text: `La reserva fue editada correctamente`,
                icon: "success"
            });
            }
        }
        navegacion('/administrador')
    }


    return (
        <>
            <div className="text-center mt-3">
                <img
                    className="imagen-icono"
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759706584/producto_lnjcpd.png"
                    alt="icono elegí"
                />
            </div> 
            <section className="container mainSection border text-white rounded-2 py-1 px-4 my-4 shadow-lg">
                <h1 className="display-6 titulo-banner fw-bold text-center me-4 mt-2">{titulo}</h1>
                <div className="d-flex justify-content-center">
                    <Form className="my-4 w-75" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formCliente">
                            <Form.Label className="me-2">Cliente:</Form.Label>
                            <Form.Select
                            disabled
                                {...register("idUsuario", {
                                    required: "Debe seleccionar un cliente",
                                })}
                            >
                                <option value="">Seleccione un cliente</option>
                                {usuarios.map(usuario => ( <option key={usuario._id} value={usuario._id}>
                                        {usuario.email}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-danger">
                                {errors.idUsuario?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formCancha">
                            <Form.Label className="me-2">Cancha: </Form.Label>
                            <Form.Select
                                {...register("idCancha", {
                                    required: "Debe seleccionar una cancha",
                                })}
                            >
                                <option value="">Seleccione una cancha</option>
                                {canchas.map(cancha => (<option key={cancha._id} value={cancha._id}>
                                        {cancha.nombre} - ${cancha.precioPorHora} - {cancha.tipoDeSuperficie}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-danger">
                                {errors.idCancha?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formDia">
                            <Form.Label className="me-2">Dia: </Form.Label>
                            <Form.Control
                                type="date"
                                {...register("dia", {
                                required: "El día es un valor obligatorio",
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.dia?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formPrecio">
                            <Form.Label className="me-3">Turno:</Form.Label>
                            <Form.Select
                                {...register("hora", {
                                required: "Debe seleccionar una categoria",
                                })}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                                <option value="21:00">21:00</option>
                                <option value="22:00">22:00</option>
                                <option value="23:00">23:00</option>
                            </Form.Select>
                            <Form.Text className="text-danger">
                                {errors.hora?.message}
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
            </section>
        </>
    );
};

export default FormularioReserva;