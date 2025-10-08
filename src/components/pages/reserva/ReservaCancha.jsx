import { Table } from "react-bootstrap";
import ItemReserva from "./ItemReserva";

const ReservaCancha = () => {
    return (
        <section className='container mainSection'>
            <h2 className="display-6 titulo-banner fw-bold text-white me-4 mt-5">Elije tu turno</h2>
            <div className="border rounded-2 py-1 px-4 my-4 shadow-lg">
                <h4 className="mt-4">Cancha N° 1</h4>
                <p className="fw-light">Cancha de Futbol 5 | Césped sintético | Con iluminación</p>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th className="text-secondary align-middle">Turno</th>
                            <th className="text-secondary">Lunes <br/> 6/10</th>
                            <th className="text-secondary">Martes<br/> 7/10</th>
                            <th className="text-secondary">Miercoes<br/> 8/10</th>
                            <th className="text-secondary">Jueves<br/> 9/10</th>
                            <th className="text-secondary">Viernes <br/>10/10</th>
                            <th className="text-secondary">Sábado<br/> 11/10</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <>
                                <ItemReserva></ItemReserva>
                                <ItemReserva></ItemReserva>
                                <ItemReserva></ItemReserva>
                                <ItemReserva></ItemReserva>
                                <ItemReserva></ItemReserva>
                            </>
                        }
                    </tbody>
                </Table>

            </div>
        </section>
    );
};

export default ReservaCancha;