import { Form, Button} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm} from "react-hook-form";

const FormularioProducto = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue
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
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759706584/producto_lnjcpd.png"
                    alt="icono elegí"
                />
            </div> 
            <section className="container mainSection border text-white rounded-2 py-1 px-4 mt-4 shadow-lg">
                <h1 className="display-6 titulo-banner fw-bold text-center me-4 mt-2">Nuevo Producto</h1>
                <div className="d-flex justify-content-center">
                    <Form className="my-4 w-75" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formNombreCancha">
                            <Form.Label className="me-2">Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Pelota Futbol 5"
                                {...register("nombre", {
                                required: "El nombre del usuario es un dato obligatorio",
                                minLength: {
                                    value: 10,
                                    message:
                                    "El nombre del producto debe tener al menos 2 caracteres",
                                },
                                maxLength: {
                                    value: 100,
                                    message:
                                    "El nombre del producto debe tener como máximo 100 caracteres",
                                },
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.nombre?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formPrecio">
                            <Form.Label className="me-2">Precio: </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="$50"
                                {...register("precio", {
                                required: "El precio es un valor obligatorio",
                                min: {
                                    value: 1,
                                    message:
                                    "El precio minimo del producto debe ser de almenos $50",
                                },
                                max: {
                                    value: 1000000,
                                    message:
                                    "El precio maximo de un producto debe ser de hasta $1000000",
                                },
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.precio?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formPrecio">
                            <Form.Label className="me-3">Categoría*</Form.Label>
                            <Form.Select
                                {...register("categoria", {
                                required: "Debe seleccionar una categoria",
                                })}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Remeras">Remeras</option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Pelotas">Pelotas</option>
                            </Form.Select>
                            <Form.Text className="text-danger">
                                {errors.categoria?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formImagen">
                            <Form.Label className="me-3">Imagen URL*</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="https://www.pexels.com/imagen"
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

                            <Form.Group className="mb-4 d-flex align-items-center" controlId="formDescripcion">
                                <Form.Label className="me-3">Descripción: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Pelota de Futbol 5 Adidas. Con detalles en amarillo, el logo de Messi y el logo de las 3 Barras resaltan sobre la base azul y plateada de su suave cubierta de TPU."
                                    as="textarea"
                                    {...register("descripcion", {
                                    required: "La descripción es un dato obligatorio",
                                    minLength: {
                                        value: 10,
                                        message: "La descrición debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 500,
                                        message:
                                        "La descrición debe tener como máximo 250 caracteres",
                                    },
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.descripcion?.message}
                                </Form.Text>
                            </Form.Group>     

                            <div className="d-flex justify-content-around mt-5">
                                <Button type="submit" variant="warning" className="w-25 btn-gold text-white">
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

export default FormularioProducto;