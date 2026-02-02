import { Spinner, Table } from "react-bootstrap";
import ItemReserva from "./ItemReserva";
import { useNavigate, useParams } from "react-router";
import { leerReservas, obtenerCanchaPorId } from "../helpers/queries";
import { useEffect, useState } from "react";

const ReservaCancha = ({ usuarioAdmin }) => {
  const [cancha, setCancha] = useState("");
  const [proximosDias, setProximosDias] = useState([]);
  const [listaReservas, setListaReservas] = useState([]);
  const turnos = [
    { formatoAmPm: "04:00 pm", formato24: "16:00" },
    { formatoAmPm: "05:00 pm", formato24: "17:00" },
    { formatoAmPm: "06:00 pm", formato24: "18:00" },
    { formatoAmPm: "07:00 pm", formato24: "19:00" },
    { formatoAmPm: "08:00 pm", formato24: "20:00" },
    { formatoAmPm: "09:00 pm", formato24: "21:00" },
    { formatoAmPm: "10:00 pm", formato24: "22:00" },
    { formatoAmPm: "11:00 pm", formato24: "23:00" },
  ];
  const [mostrarSpinner, setMostrarSpinner] = useState(true);
  const navegacion = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    obtenerCancha();
    generarProximosDiasHabiles();
    obtenerReservas();
  }, []);

  const obtenerCancha = async () => {
    const respuesta = await obtenerCanchaPorId(id);
    if (respuesta.status === 200) {
      const canchaBuscada = await respuesta.json();
      setCancha(canchaBuscada);
      if (canchaBuscada === undefined) {
        navegacion("/reservas");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La cancha es inexistente",
        });
      }
    }
  };

  const obtenerReservas = async () => {
    const respuesta = await leerReservas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaReservas(datos);
    } else {
      console.info("Ocurrio un error al buscar los usuarios");
    }
    setMostrarSpinner(false);
  };

  const generarProximosDiasHabiles = () => {
    const dias = [];
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let fecha = new Date();
    let diasEncontrados = 0;

    while (diasEncontrados < 6) {
      if (fecha.getDay() !== 0) {
        dias.push({
          nombre: diasSemana[fecha.getDay()],
          fecha: new Date(fecha),
          dia: fecha.getDate(),
          mes: fecha.getMonth() + 1,
          fechaISO: fecha.toISOString().split("T")[0],
        });
        diasEncontrados++;
      }
      fecha.setDate(fecha.getDate() + 1);
    }
    setProximosDias(dias);
  };

  return (
    <>
      <div className="position-relative">
        <img className="banner-titulo w-100" src="https://images.pexels.com/photos/1302514/pexels-photo-1302514.jpeg" alt="fondo cancha" />
        <div className="container position-absolute top-50 start-50 w-100 h-100 translate-middle">
          <h2 className="display-6 titulo-banner fw-bold text-white me-4 mt-5">Elije tu turno</h2>
        </div>
      </div>
      <section className="container mainSection">
        <div className="border rounded-2 py-1 px-4 mb-4 shadow-lg bg bg-light">
          <h4 className="mt-4 fw-bolder">{cancha.nombre}</h4>
          <p className="fw-light ">Cancha de futbol 5 / {cancha.tipoDeSuperficie} / Con iluminación</p>
          <Table responsive bordered hover>
            <colgroup>
              <col style={{ width: "10%" }} />
              {proximosDias.map((_, index) => (
                <col key={index} style={{ width: "15%" }} />
              ))}
            </colgroup>
            <thead>
              <tr className="text-center">
                <th className="text-secondary align-middle">Turno</th>
                {proximosDias.map((dia, index) => (
                  <th key={index} className="text-secondary">
                    {dia.nombre} <br />
                    {dia.dia}/{dia.mes}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mostrarSpinner ? (
                <tr>
                  <td colSpan={proximosDias.length + 1} className="text-center py-5">
                    <Spinner animation="border" variant="warning" role="status" />
                    <p className="mt-2 text-muted">Cargando disponibilidad...</p>
                  </td>
                </tr>
              ) : (
                turnos.map((turno, index) => (
                  <ItemReserva
                    key={index}
                    turno={turno}
                    dias={proximosDias}
                    listaReservas={listaReservas}
                    setListaReservas={setListaReservas}
                    cancha={cancha}
                    usuarioAdmin={usuarioAdmin}
                  />
                ))
              )}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end">
            <div className="border rounded-1 btn-reservar box-referencia me-1">.</div>
            <p className="me-5 ">Turno Disponible</p>
            <div className="border rounded-1 btn-reservado box-referencia me-1">.</div>
            <p>Ocupado</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReservaCancha;
