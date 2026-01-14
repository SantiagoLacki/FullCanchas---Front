import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { crearProducto, editarProducto, obtenerProductoPorId } from "../helpers/queries";
import "./FormularioProducto.css";

const FormularioProducto = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
    setValue,
  } = useForm();
  const navegacion = useNavigate();
  const { id } = useParams();
  const [imagenActual, setImagenActual] = useState("");
  const [preview, setPreview] = useState("");
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

  useEffect(() => {
    obtenerProducto();
  }, []);

  const obtenerProducto = async () => {
    if (titulo === "Modificar Producto") {
      const respuesta = await obtenerProductoPorId(id);
      console.log(respuesta.status)
      if (respuesta.status === 200) {
        const productoBuscado = await respuesta.json();
        if (productoBuscado === undefined) {
          navegacion("/productos");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario es inexistente",
          });
        } else {
          setValue("nombre", productoBuscado.nombre);
          setValue("precio", productoBuscado.precio);
          setValue("categoria", productoBuscado.categoria);
          setValue("descripcion", productoBuscado.descripcion);
          setImagenActual(productoBuscado.imagen);
        }
      }
    }
  };

  const onSubmit = async (producto) => {
    setMostrarSpinner(true);
    setDeshabilitarBoton(true);
    const productoMejorado = { ...producto, imagen: producto.imagen[0] };
    if (titulo === "Producto Nuevo") {
      const respuesta = await crearProducto(productoMejorado);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Producto creado",
          text: `El producto ${producto.nombre} fue creado correctamente`,
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No pudo crearse el producto",
        });
      }
    } else {
      const respuesta = await editarProducto(productoMejorado, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Producto editado",
          text: `El producto ${producto.nombre} fue editado correctamente`,
          icon: "success",
        });
      }
    }
    navegacion("/productos");
    setMostrarSpinner(false);
    setDeshabilitarBoton(false);
  };
  return (
    <>
      <div className="text-center pt-3">
        <img
          className="imagen-icono"
          src="https://res.cloudinary.com/duwi53e7z/image/upload/v1760824225/producto2_lk18vi.png"
          alt="icono elegí"
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
                  placeholder="Pelota Futbol 5"
                  {...register("nombre", {
                    required: "El nombre del usuario es un dato obligatorio",
                    minLength: {
                      value: 2,
                      message: "El nombre del producto debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 100,
                      message: "El nombre del producto debe tener como máximo 100 caracteres",
                    },
                  })}
                />
                <Form.Text className="text-danger">{errors.nombre?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPrecio">
                <Form.Label className="me-2">Precio: </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="$50"
                  {...register("precio", {
                    required: "El precio es un valor obligatorio",
                    min: {
                      value: 1,
                      message: "El precio minimo del producto debe ser de almenos $50",
                    },
                    max: {
                      value: 1000000,
                      message: "El precio maximo de un producto debe ser de hasta $1000000",
                    },
                  })}
                />
                <Form.Text className="text-danger">{errors.precio?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPrecio">
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
                <Form.Text className="text-danger">{errors.categoria?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImagen">
                <Form.Label>Imagen URL*</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  {...register("imagen", {
                    required: titulo === "Producto Nuevo" || !imagenActual ? "La imagen es obligatoria" : false,
                    validate: {
                      fileSize: (files) => !files[0] || files[0].size <= 3 * 1024 * 1024 || "La imagen no debe superar los 3MB.",
                    },
                  })}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    } else {
                      setPreview("");
                    }
                  }}
                />
                {(preview || imagenActual) && (
                  <div className="mb-2 position-relative d-inline-block mt-3">
                    <img className="rounded-3 img-preview" src={preview || imagenActual} alt="Imagen" />
                    <Button
                      variant="light"
                      size="sm"
                      className="p-0 d-flex align-items-center justify-content-center shadow btn-img-preview"
                      onClick={() => {
                        setPreview("");
                        setImagenActual("");
                        resetField("imagen");
                      }}
                    >
                      <i className="bi bi-x fs-5 text-danger"></i>
                    </Button>
                  </div>
                )}
                <Form.Text className="text-danger">{errors.imagen?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formDescripcion">
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
                      message: "La descrición debe tener como máximo 250 caracteres",
                    },
                  })}
                />
                <Form.Text className="text-danger">{errors.descripcion?.message}</Form.Text>
              </Form.Group>

              <Row className="mt-5">
                <Col xs={12} md={6} className="mb-2 mb-md-0 text-center text-md-end">
                  <Button 
                  disabled={deshabilitarBoton} type="submit" variant="warning" className="w-50 btn-gold text-white">
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
                  <Link to={"/productos"} className="btn btn-danger w-50">
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

export default FormularioProducto;
