import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

const Inicio = () => {
    return (
        <section className="mainSection">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        className="banner"
                        src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg"
                        alt="fondo cancha"
                    />
                    <div
                    className="carousel-caption position-absolute end-50 bottom-0 text-start w-50 fadeInTexto"
                    >
                    <h3 className="titulo fs-1 mb-0">Viví el futbol</h3>
                    <h3 className="titulo shadow-sm">FULLCANCHAS</h3>
                    <p className="fs-5">
                        Aquí, la pasión por la pelota se enciende en cada partido. Tenemos el espacio perfecto para vos. Conéctate, elige tu horario y preparate para jugar.
                    </p>
                </div>
            </div>
        </div>
        </section>
    );
};

export default Inicio;