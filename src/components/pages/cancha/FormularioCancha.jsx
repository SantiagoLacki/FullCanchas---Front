import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { crearCancha, editarCancha, obtenerCanchaPorId } from "../helpers/queries";
import "../producto/FormularioProducto.css";

const FormularioCancha = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navegacion = useNavigate();
  const { id } = useParams();
  const [imagenActual, setImagenActual] = useState("");
  const [preview, setPreview] = useState("");
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

  useEffect(() => {
    obtenerCancha();
  }, []);

  const obtenerCancha = async () => {
    if (titulo === "Modificar Cancha") {
      const respuesta = await obtenerCanchaPorId(id);
      if (respuesta.status === 200) {
        const canchaBuscada = await respuesta.json();
        if (canchaBuscada === undefined) {
          navegacion("/canchas");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario es inexistente",
          });
        } else {
          setValue("nombre", canchaBuscada.nombre);
          setValue("tipoDeSuperficie", canchaBuscada.tipoDeSuperficie);
          setValue("precioPorHora", canchaBuscada.precioPorHora);
          setImagenActual(canchaBuscada.imagen)
          setValue("disponibilidad", canchaBuscada.habilitado === "true");
        }
      }
    }
  };

  const onSubmit = async (cancha) => {
    setMostrarSpinner(true);
    setDeshabilitarBoton(true);
    const canchasMejoradas = {
      ...cancha,
      imagen: cancha.imagen ? cancha.imagen[0] : imagenActual,
      habilitado: Boolean(cancha.habilitado),
    };

    if (titulo === "Cancha Nueva") {
      const respuesta = await crearCancha(canchasMejoradas);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Cancha creada",
          text: `La cancha ${cancha.nombre} fue creada correctamente`,
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No pudo crearse la cancha",
        });
      }
    } else {
      const respuesta = await editarCancha(canchasMejoradas, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Cancha editada",
          text: `La cancha ${cancha.nombre} fue editada correctamente`,
          icon: "success",
        });
      }
    }
    navegacion("/canchas");
    setMostrarSpinner(false);
    setDeshabilitarBoton(false);
  };

  return (
    <>
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
                      message: "El nombre de la cancha debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 100,
                      message: "El nombre de la cancha debe tener como máximo 100 caracteres",
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
                  {...register("precioPorHora", {
                    required: "El precio es un valor obligatorio",
                    min: {
                      value: 1,
                      message: "El precio minimo del alquiler debe ser de almenos $50",
                    },
                    max: {
                      value: 1000000,
                      message: "El precio maximo del alquilero debe ser de hasta $1000000",
                    },
                  })}
                />
                <Form.Text className="text-danger">{errors.precioPorHora?.message}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formImagen">
                <Form.Label>Imagen*</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  {...register("imagen", {
                    required: titulo === "Cancha Nueva" || !imagenActual ? "La imagen es obligatoria" : false,
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
                    <img className="rounded-3 img-preview" src={preview || imagenActual} alt="Imagen Cancha" />
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

              <Form.Group className="mb-4">
                <Form.Label>Tipo de Superficie: </Form.Label>
                <Form.Select
                  {...register("tipoDeSuperficie", {
                    required: "El tipo de superficie es un dato obligatorio.",
                  })}
                >
                  <option value="">Seleccione el tipo de superficie</option>
                  <option value="Césped">Césped</option>
                  <option value="Césped artificial">Césped artificial</option>
                  <option value="Tierra">Tierra</option>
                  <option value="Pista dura">Pista dura</option>
                </Form.Select>
                <Form.Text className="text-danger">{errors.tipoDeSuperficie?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDisponibilidad">
                <Form.Label>Disponibilidad:</Form.Label>
                <div>
                  <Form.Switch
                    type="switch"
                    label={watch("habilitado") ? "Disponible" : "No disponible"}
                    {...register("habilitado")}
                    className="fs-5"
                  />
                </div>
                <Form.Text>La cancha estará disponible para reservas cuando esté activada</Form.Text>
              </Form.Group>

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
                  <Link to={"/canchas"} className="btn btn-danger w-50">
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

export default FormularioCancha;
