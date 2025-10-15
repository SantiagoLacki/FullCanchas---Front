import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ItemReserva = ({ turno, dias, listaReservas, cancha}) => {
    const [show, setShow] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

     const handleClose = () => setShow(false);
    const handleShow = (dia) => {
        setReservaSeleccionada({
            fecha: new Date(dia.fecha).toLocaleDateString('es-ES'),
            fechaISO: dia.fechaISO,
            horario: turno.formato24,
            horarioAmPm: turno.formatoAmPm,
            nombreDia: dia.nombre,
            nombreCancha: cancha?.nombre || 'Cancha',
            precio: cancha?.precioPorHora || 0
        });
        setShow(true);
    };
    const estaReservado = (dia) => {
        const fechaDia = new Date(dia.fecha).toISOString().split('T')[0];
        const existeReserva = listaReservas.some(reserva => {
            const fechaReserva = new Date(reserva.dia).toISOString().split('T')[0];
            return fechaReserva === fechaDia && 
                   reserva.hora === turno.formatoAmPm && 
                   reserva.idCancha._id === cancha._id;
        });
        return existeReserva
    };

    const convertirFormato12a24 = (hora12) => {
        const [horaMinuto, periodo] = hora12.split(' ');
        const [horas, minutos] = horaMinuto.split(':').map(Number);
        
        if (periodo.toLowerCase() === 'pm' && horas !== 12) {
            return horas + 12;
        } else if (periodo.toLowerCase() === 'am' && horas === 12) {
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

                    let claseCelda = 'align-middle fw-light text-center p-0 ';
                    let contenido = null;
                    
                    if (reservado) {
                        claseCelda += 'btn-reservado';
                    } else if (horarioPasado) {
                        claseCelda += 'btn-no-disponible';
                        contenido = null;
                    } else {
                        claseCelda += 'btn-reservar';
                        contenido = (
                            <Button variant="outline-success"
                                className="d-block border-0 w-100 h-100 text-decoration-none text-white py-3" 
                                onClick={() => handleShow(dia)}
                                style={{ cursor: 'pointer' }}
                            >   
                            </Button>
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
                <Modal.Header closeButton>
                <Modal.Title>Reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {reservaSeleccionada && (
                    <div>
                        <p><strong>Cancha:</strong> {reservaSeleccionada.nombreCancha}</p>
                        <p><strong>Día:</strong> {reservaSeleccionada.nombreDia} {reservaSeleccionada.fecha}</p>
                        <p><strong>Horario:</strong> {reservaSeleccionada.horario}</p>
                        <p><strong>Precio:</strong> ${reservaSeleccionada.precio}</p>
                    </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ItemReserva;