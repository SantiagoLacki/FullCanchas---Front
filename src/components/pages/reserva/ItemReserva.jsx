import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { crearReserva, leerReservas } from "../helpers/queries";

const ItemReserva = ({ turno, dias, listaReservas, setListaReservas, cancha, usuarioAdmin, pageReservas, limit }) => {
  const [show, setShow] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const handleClose = async () => {
    setShow(false);
    setReservaSeleccionada(null);
  };

  const handleReservar = async () => {
    if (!reservaSeleccionada) return;
    const ultimaReservaStr = localStorage.getItem("ultimaReserva");
    if (ultimaReservaStr) {
      const ultimaReserva = JSON.parse(ultimaReservaStr);
      if(ultimaReserva.cliente === usuarioAdmin._id){
          const tiempoTranscurrido = Date.now() - ultimaReserva.timestamp;
          const minutos = Math.floor(tiempoTranscurrido / 60000);
          const segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);

          if (tiempoTranscurrido < 300000) {
            const result = await Swal.fire({
              title: "¿Otra reserva?",
              html: `
                            <div class="text-center">
                                <p>Hiciste una reserva hace <strong>${minutos}:${segundos.toString().padStart(2, "0")}</strong> minutos</p>
                                <p class="small text-muted"><strong>${ultimaReserva.cancha} - ${ultimaReserva.fecha} ${
                ultimaReserva.hora
              }</strong></p>
                                <p>¿Quieres reservar otro turno?</p>
                            </div>
                        `,
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#28a745",
              cancelButtonColor: "#ca5118ff",
              confirmButtonText: "Sí, reservar",
              cancelButtonText: "Cancelar",
              footer:
                "<small>💡 <strong>Recordá:</strong> Cada reserva debe ser abonada. Si acumulás reservas sin pago, podrías perder el acceso para hacer nuevas reservas.</small>",
            });

            if (!result.isConfirmed) {
              handleClose();
              return;
            }
          }
      }
      
    }

    const fechaUTC = new Date(reservaSeleccionada.fechaISO + "T00:00:00.000Z");
    const reserva = { idUsuario: usuarioAdmin.id, idCancha: cancha._id, dia: fechaUTC.toISOString(), hora: reservaSeleccionada.horario };
    const respuesta = await crearReserva(reserva);
    if (respuesta.status === 201) {
      localStorage.setItem(
        "ultimaReserva",
        JSON.stringify({
          timestamp: Date.now(),
          cancha: reservaSeleccionada.nombreCancha,
          fecha: reservaSeleccionada.fecha,
          hora: reservaSeleccionada.horario,
          cliente: usuarioAdmin.id,
        })
      );
      Swal.fire({
        title: "Reserva creada",
        text: `Tu reserva para el ${reservaSeleccionada.fecha} a las ${reservaSeleccionada.horario} fue creada correctamente`,
        icon: "success",
      });
    }
    const respuestaReservas = await leerReservas();
    const reservasActualizadas = await respuestaReservas.json();
    setListaReservas(reservasActualizadas);
    handleClose();
  };

  const handleShow = (dia) => {
    if (usuarioAdmin.rol === "user") {
      setReservaSeleccionada({
        fecha: new Date(dia.fecha).toLocaleDateString("es-ES"),
        fechaISO: dia.fechaISO,
        horario: turno.formato24,
        horarioAmPm: turno.formatoAmPm,
        nombreDia: dia.nombre,
        nombreCancha: cancha?.nombre || "Cancha",
        precio: cancha?.precioPorHora || 0,
        cliente: usuarioAdmin.email,
      });
      setShow(true);
    } else {
      Swal.fire({
        title: "Iniciar Sesión",
        text: "Debes iniciar sesión para poder reservar un turno",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ir a Iniciar Sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  };
  const estaReservado = (dia) => {
    const fechaDia = new Date(dia.fecha).toISOString().split("T")[0];
    const existeReserva = listaReservas.some((reserva) => {
      const fechaReserva = new Date(reserva.dia).toISOString().split("T")[0];
      const [horaMinuto, periodo] = turno.formatoAmPm.split(" ");
      const [horas, minutos] = horaMinuto.split(":").map(Number);
      let horas24 = horas;
      if (periodo.toLowerCase() === "pm" && horas !== 12) {
        horas24 = horas + 12;
      }
      const turno24h = `${horas24.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
      return fechaReserva === fechaDia && reserva.hora === turno24h && reserva.idCancha._id === cancha._id;
    });
    return existeReserva;
  };

  const convertirFormato12a24 = (hora12) => {
    const [horaMinuto, periodo] = hora12.split(" ");
    const [horas, minutos] = horaMinuto.split(":").map(Number);

    if (periodo.toLowerCase() === "pm" && horas !== 12) {
      return horas + 12;
    } else if (periodo.toLowerCase() === "am" && horas === 12) {
      return 0;
    }
    return horas;
  };

  const esHorarioPasado = (dia) => {
    const hoy = new Date();
    const fechaDia = new Date(dia.fecha);
    if (fechaDia.toDateString() === hoy.toDateString()) {
      const horas24 = convertirFormato12a24(turno.formatoAmPm);
      const horasActual = hoy.getHours();
      const minutosActual = hoy.getMinutes();
      const minutosTurnoTotal = horas24 * 60;
      const minutosActualTotal = horasActual * 60 + minutosActual;
      return minutosTurnoTotal <= minutosActualTotal;
    }

    return false;
  };

  return (
    <>
      <tr>
        <td className="col-hora text-center align-middle fw-light">{turno.formato24}</td>
        {dias.map((dia, diaIndex) => {
          const reservado = estaReservado(dia);
          const horarioPasado = esHorarioPasado(dia);

          let claseCelda = "align-middle fw-light text-center p-0 ";
          let contenido = null;

          if (reservado) {
            claseCelda += "btn-reservado";
          } else if (horarioPasado) {
            claseCelda += "btn-no-disponible";
            contenido = null;
          } else {
            claseCelda += "";
            contenido = (
              <Button
                variant="outline-success"
                className="d-block border-0 w-100 h-100 text-decoration-none text-white py-3 custom-hover"
                onClick={() => handleShow(dia)}
              ></Button>
            );
          }
          return (
            <td key={diaIndex} className={claseCelda}>
              {contenido}
            </td>
          );
        })}
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="border-0 bg-shopp">
          <Modal.Title>
            <p className="modal-titulo shadow-none fw-bold fs-3 mb-0">Reservar</p>
            <p className="fw-lighter fs-6 mb-0 text-light">
              Para completar tu reserva en FullCanchas, por favor chequeá tus datos y luego confirmá.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          {reservaSeleccionada && (
            <>
              <div>
                <p className="text-end me-4 modal-text fs-6 mb-1 mt-2">
                  <i className="bi bi-person-circle fw-bold modal-icon me-1"></i>Cliente: <strong>{reservaSeleccionada.cliente}</strong>{" "}
                </p>
                <div className="border p-4 rounded-2 shadow mx-3 mt-3 modal-text">
                  <p className="fw-bold modal-icon fs-5">{reservaSeleccionada.nombreCancha}</p>
                  <hr />
                  <div className="d-flex  justify-content-between">
                    <p>
                      <i className="bi bi-calendar-event me-2 fw-bold modal-icon"></i>Día:
                    </p>
                    <p className="fw-bolder">
                      {reservaSeleccionada.nombreDia} {reservaSeleccionada.fecha}
                    </p>
                  </div>
                  <hr className="mt-0" />
                  <div className="d-flex justify-content-between">
                    <p>
                      <i className="bi bi-clock me-2 fw-bold modal-icon"></i>Turno:
                    </p>
                    <p className="fw-bolder">{reservaSeleccionada.horario}</p>
                  </div>
                  <hr className="mt-0" />
                  <div className="d-flex  justify-content-between">
                    <p>
                      <i className="bi bi-cash-coin me-2 modal-icon"></i>Precio:
                    </p>
                    <p className="fw-bolder">${reservaSeleccionada.precio}</p>
                  </div>
                </div>
              </div>
            </>
          )}
          <p className="ms-4 mt-3 fw-light fs-6">
            Al hacer click en reservar declaras haber leido y aceptado los <Link>Terminos y Condiciones</Link>{" "}
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-between mb-3">
          <Button variant="danger" onClick={handleClose} className="w-25">
            Cancelar
          </Button>
          <Button variant="warning" onClick={handleReservar} className="w-25">
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemReserva;
