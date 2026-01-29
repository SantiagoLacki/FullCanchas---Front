import { Col, Form, Row, Table, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { leerReservas, leerReservasPaginadas } from "./helpers/queries";
import ItemReservaAdmin from "./reserva/ItemReservaAdmin";
import Swal from "sweetalert2";

const AdminReservas = ({usuarioAdmin}) => {
  const [fechaBusqueda, setFechaBusqueda] = useState("");

  const [listaReservas, setListaReservas] = useState([]);

  const [limit] = useState(10);
  const [pageReservas, setPageReservas] = useState(1);
  const [totalPagesReservas, setTotalPagesReservas] = useState(1);

  const [mostrarSpinnerReservas, setMostrarSpinnerReservas] = useState(true);

  useEffect(() => {
    obtenerReservas();
  }, [pageReservas]);

  const obtenerReservas = async () => {
    setMostrarSpinnerReservas(true);
    const respuesta = await leerReservasPaginadas(pageReservas, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaReservas(datos);
      setTotalPagesReservas(datos.pages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
    setMostrarSpinnerReservas(false);
  };

  const handleFechaChange = async (e) => {
    setMostrarSpinnerReservas(true);
    const fechaSeleccionada = e.target.value;
    setFechaBusqueda(fechaSeleccionada);
    const respuesta = await leerReservas();
    if (respuesta.status === 200) {
      const todasLasReservas = await respuesta.json();
      const arrayReservas = todasLasReservas.reservas || todasLasReservas;

      if (!fechaSeleccionada) {
        setPageReservas(1);
        obtenerReservas();
      } else {
        const reservasFiltradas = arrayReservas.filter((reserva) => {
          const fechaReserva = new Date(reserva.dia).toISOString().split("T")[0];
          return fechaReserva === fechaSeleccionada;
        });

        setListaReservas({
          reservas: reservasFiltradas,
          totalPages: 1,
          page: 1,
        });
      }
    }
    setMostrarSpinnerReservas(false);
  };

  return (
    <section className="container mainSection">
      <>
        <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg bg-light">
          <div className="  align-items-center mt-2 mb-3">
            <Row className="d-flex justify-content-between align-items-center mb-3">
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <div className="d-flex align-items-center">
                  <h2 className="display-6 titulo-admin fw-bold me-4">Reservas</h2>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Form>
                  <Row className="justify-content-start justify-content-md-end">
                    <Col xs="auto" className="d-flex align-items-center">
                      <i className="bi bi-search fs-3 me-2 text-secondary"></i>
                      <Form.Control
                        type="date"
                        placeholder="Buscar por fecha"
                        className="mr-sm-2"
                        onChange={handleFechaChange}
                        value={fechaBusqueda}
                      />
                      <Button
                        variant={fechaBusqueda ? "outline-danger" : "outline-secondary"}
                        className="border-0"
                        disabled={!fechaBusqueda}
                        onClick={() => {
                          setFechaBusqueda("");
                          setPageReservas(1);
                          obtenerReservas();
                        }}
                        title={fechaBusqueda ? "Limpiar búsqueda" : "Selecciona una fecha para limpiar"}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          {mostrarSpinnerReservas ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="warning" role="status"></Spinner>
            </div>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th className="text-secondary">#</th>
                  <th className="text-secondary">Cancha</th>
                  <th className="text-secondary">Cliente</th>
                  <th className="text-secondary">Fecha</th>
                  <th className="text-secondary">Turno</th>
                  {(usuarioAdmin.rol === "superAdmin" || usuarioAdmin.rol === "admin") && <th className="text-secondary">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {listaReservas.reservas && listaReservas.reservas.length > 0 ? (
                  listaReservas.reservas.map((reserva, indice) => (
                    <ItemReservaAdmin
                      key={reserva._id}
                      reserva={reserva}
                      fila={(pageReservas - 1) * limit + indice + 1}
                      setListaReservas={setListaReservas}
                      usuarioAdmin={usuarioAdmin}
                    ></ItemReservaAdmin>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      {fechaBusqueda ? "No se encontraron reservas para la fecha seleccionada" : "No hay reservas disponibles"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
          {!fechaBusqueda && totalPagesReservas > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Button variant="warning" onClick={() => setPageReservas((prev) => Math.max(prev - 1, 1))} disabled={pageReservas === 1}>
                Anterior
              </Button>
              <span className="mx-3 text-dark px-2 py-2 rounded">
                Página {pageReservas} de {totalPagesReservas}
              </span>
              <Button
                variant="warning"
                onClick={() => setPageReservas((prev) => Math.min(prev + 1, totalPagesReservas))}
                disabled={pageReservas === totalPagesReservas}
              >
                Siguiente
              </Button>
            </div>
          )}
        </div>
      </>
    </section>
  );
};

export default AdminReservas;
