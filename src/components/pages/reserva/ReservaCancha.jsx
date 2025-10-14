import { Table } from "react-bootstrap";
import ItemReserva from "./ItemReserva";

const ReservaCancha = ({cancha}) => {
    return (
        <>
        <div className="position-relative">
            <img
                className="banner-titulo w-100"
                src="https://images.pexels.com/photos/1302514/pexels-photo-1302514.jpeg"
                alt="fondo cancha"
            />
            <div className="container position-absolute top-50 start-50 w-100 h-100 translate-middle">
                <h2 className="display-6 titulo-banner fw-bold text-white me-4 mt-5">Elije tu turno</h2>
            </div>
        </div>

        <section className='container mainSection'>
            
            <div className="border rounded-2 py-1 px-4 my-4 shadow-lg bg">
                <h4 className="mt-4 text-white fw-bolder">Cancha N° 1</h4>
                <p className="fw-light text-white">Cancha de Futbol 5 | Césped sintético | Con iluminación</p>
                <Table responsive striped bordered hover >
                      <colgroup>
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                    </colgroup>
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
                    <div className="d-flex justify-content-end">
                        <div className="border rounded-1 btn-reservar box-referencia me-1">.</div>
                        <p className="me-5">Reservar</p>
                        <div className="border rounded-1 btn-reservado box-referencia me-1">.</div>
                        <p >Ocupado</p>
                    </div>
            </div>
        </section>
        </>
    );
};

export default ReservaCancha;