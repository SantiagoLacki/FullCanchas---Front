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

  const [mostrarSpinnerCanchas, setMostrarSpinnerCanchas] = useState(true);


  useEffect(() => {
    obtenerCanchas();
  }, []);

  const obtenerCanchas = async () => {
    setMostrarSpinnerCanchas(true);
    const respuesta = await leerCanchas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaCanchas(datos);
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
          <div className="d-flex align-items-center mt-2 mb-3">
            <h2 className="display-6 titulo-admin fw-bold me-4">Canchas</h2>
            <div>
              <Link className="btn btn-gold text-white" to={"/canchas/crearcancha"}>
                <i className="bi bi-plus-circle"></i> Agregar
              </Link>
            </div>
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
                  <th className="text-secondary">Disponibilidad</th>
                  <th className="text-secondary">Imagen</th>
                  <th className="text-secondary">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaCanchas.map((cancha, indice) => (
                  <ItemCancha key={cancha._id} cancha={cancha} fila={indice + 1} setListaCanchas={setListaCanchas}></ItemCancha>
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
