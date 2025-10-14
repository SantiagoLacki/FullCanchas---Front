import { Button } from "react-bootstrap";
import { Link } from "react-router";

const ItemReserva = ({ turno, dias, listaReservas, idCancha}) => {
    const estaReservado = (dia) => {
        const fechaDia = new Date(dia.fecha).toISOString().split('T')[0];
        const existeReserva = listaReservas.some(reserva => {
            const fechaReserva = new Date(reserva.dia).toISOString().split('T')[0];
            return fechaReserva === fechaDia && 
                   reserva.hora === turno.formatoAmPm && 
                   reserva.idCancha._id === idCancha;
        });
        return existeReserva
    };

    const convertirFormato12a24 = (hora12) => {
        const [horaMinuto, periodo] = hora12.split(' ');
        const [horas, minutos] = horaMinuto.split(':').map(Number);
        
        if (periodo.toLowerCase() === 'pm' && horas !== 12) {
            return horas + 12; // Convertir PM a 24h (excepto 12 pm)
        } else if (periodo.toLowerCase() === 'am' && horas === 12) {
            return 0; // 12 am = 0 horas
        }
        return horas; // AM permanece igual (excepto 12 am)
    };

    const esHorarioPasado = (dia) => {
        const hoy = new Date();
        const fechaDia = new Date(dia.fecha);
        
        // Solo verificar si es hoy
        if (fechaDia.toDateString() === hoy.toDateString()) {
            // Convertir formato "07:00 pm" a horas en formato 24h
            const horas24 = convertirFormato12a24(turno.formatoAmPm);
            
            // Obtener hora actual en formato 24h
            const horasActual = hoy.getHours();
            const minutosActual = hoy.getMinutes();
            
            // Convertir todo a minutos para comparación precisa
            const minutosTurnoTotal = horas24 * 60;
            const minutosActualTotal = horasActual * 60 + minutosActual;
            
            // Deshabilitar si el horario ya pasó (incluyendo el actual)
            return minutosTurnoTotal <= minutosActualTotal;
        }
        
        return false;
    };

    return (
        <tr>
            <td className="col-hora text-center align-middle fw-light">{turno.formato24}</td>
            {dias.map((dia, diaIndex) => {
                const reservado = estaReservado(dia);
                const horarioPasado = esHorarioPasado(dia);

                let claseCelda = 'align-middle fw-light text-center p-0 ';
                let contenido = null;
                
                if (reservado) {
                    claseCelda += 'btn-reservado'; // Ocupado
                } else if (horarioPasado) {
                    claseCelda += 'btn-no-disponible'; // Usar misma clase que ocupado (pero sin link)
                    contenido = null; // No mostrar link
                } else {
                    claseCelda += 'btn-reservar'; // Disponible
                    contenido = (
                        <Link 
                            className="d-block w-100 h-100 text-decoration-none text-white py-3" 
                            to={`/reserva/?dia=${dia.fechaISO}&hora=${turno}&cancha=${idCancha}`}
                        >   
                        </Link>
                    );
                }

                return (
                    <td key={diaIndex} className={claseCelda}>
                        {contenido}
                    </td>
                );
            })}
        </tr>
    );
};

export default ItemReserva;