import { Col, Dropdown, Form, Row, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import ItemCancha from "./cancha/ItemCancha";
import {
  leerCanchas,
} from "./helpers/queries";

import Swal from "sweetalert2";

const AdminCanchas = () => {

  const [listaCanchas, setListaCanchas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [canchasOriginales, setCanchasOriginales] = useState([]);
  const [mostrarSpinnerCanchas, setMostrarSpinnerCanchas] = useState(true);


  useEffect(() => {
    obtenerCanchas();
    if (canchasOriginales.length > 0) {
            const datosFiltrados = filtrarCanchas(canchasOriginales);
            setListaCanchas(datosFiltrados);
        }
  }, [filtroEstado]);

  const filtrarCanchas = (canchas) =>{
    let datosFiltrados = [... canchas]
    if (filtroEstado === "disponibles"){
      datosFiltrados = datosFiltrados.filter(cancha => cancha.habilitado);
    } else if(filtroEstado === "nodisponibles"){
      datosFiltrados = datosFiltrados.filter(cancha => !cancha.habilitado)
    }

    return datosFiltrados
  }

  const obtenerCanchas = async () => {
    setMostrarSpinnerCanchas(true);
    const respuesta = await leerCanchas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      const canchasRecibidas = datos;
      setCanchasOriginales(canchasRecibidas);
      const datosFiltrados = filtrarCanchas(canchasRecibidas)
      setListaCanchas(datosFiltrados);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerCanchas(false);
  };

  return (
    <section className="container mainSection">
      <>
         <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
          <div className="  align-items-center mt-2 mb-3">
            <Row className="d-flex justify-content-between align-items-center mb-3">
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <div className="d-flex align-items-center">
                  <h2 className="display-6 titulo-admin fw-bold  me-4">Canchas</h2>
                  <div>
                    <Link className="btn btn-gold text-white" to={"/canchas/crearcancha"}>
                      <i className="bi bi-plus-circle"></i> Agregar
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Form>
                    <Row className="justify-content-start justify-content-md-end">
                    <Col xs="12" md="auto">
                        <div>
                        <button 
                            type="button" 
                            className={`btn ${filtroEstado === "todos" ? "btn-warning" : "btn-outline-warning"}`}
                            onClick={() => setFiltroEstado("todos")}
                            title="Mostrar todos los usuarios"
                        >
                            Todos
                            </button>
                        <button 
                            type="button" 
                            className={`btn ${filtroEstado === "disponibles" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => setFiltroEstado("disponibles")}
                            title="Mostrar los productos disponibles"
                        >
                            <i className="bi bi-check-circle me-1"></i> Disponible
                        </button>
                        <button
                            type="button"
                            className={`btn ${filtroEstado === "nodisponibles" ? "btn-danger" : "btn-outline-danger"}`}
                            onClick={() => setFiltroEstado("nodisponibles")}
                            title="Mostrar solo productos no disponibles"
                        >
                            <i className="bi bi-x-circle me-1"></i> No Disponible
                        </button>
                        </div>
                    </Col>
                    </Row>
                </Form>
              </Col>
            </Row>
          </div>
          {mostrarSpinnerCanchas ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="warning" role="status"></Spinner>
            </div>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th className="text-secondary">#</th>
                  <th className="text-secondary">Cancha</th>
                  <th className="text-secondary">Precio por Hora</th>
                <th className="text-secondary">Imagen</th>
                  <th className="text-secondary">Disponibilidad</th>
                  <th className="text-secondary">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaCanchas.map((cancha, indice) => (
                  <ItemCancha key={cancha._id} cancha={cancha} fila={indice + 1} setListaCanchas={setListaCanchas} obtenerCanchas={obtenerCanchas}></ItemCancha>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </>
    </section>
  );
};

export default AdminCanchas;
