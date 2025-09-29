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
                    <div className="carousel-caption position-absolute end-50 bottom-0 text-start w-50 fadeInTexto">
                        <h3 className="titulo fs-1 mb-0">Viví el futbol</h3>
                        <h3 className="titulo shadow-sm">FULLCANCHAS</h3>
                        <p className="fs-5">
                            Aquí, la pasión por la pelota se enciende en cada partido. Tenemos el espacio perfecto para vos. Conéctate, elige tu horario y preparate para jugar.
                        </p>
                    </div>
                </div>
            </div>
            <Container className="mt-5">
                <h1>Nuestras Canchas</h1>
                <Row>
                    {

                    }
                </Row>
                <h2>Shopp</h2>
                <Row>
                    {

                    }
                </Row>
            </Container>
            <Row className="mt-4">
                <Col xs={12} md={4} lg={2} className="p-0">
                    <img
                        className="imagenGaleria w-100"
                        src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg"
                        alt="imagen jugadores"
                    />
                </Col>
                <Col xs={12} md={4} lg={2} className="p-0">
                    <img
                        className="imagenGaleria w-100"
                        src="https://images.pexels.com/photos/1378425/pexels-photo-1378425.jpeg"
                        alt="cancha 1"
                    />
                </Col>
                <Col xs={12} md={4} lg={2} className="p-0">
                    <img
                        className="imagenGaleria w-100"
                        src="https://images.pexels.com/photos/774321/pexels-photo-774321.jpeg"
                        alt="botin futbol"
                    />
                </Col>
                <Col xs={12} md={4} lg={2} className="p-0">
                    <img
                        className="imagenGaleria w-100"
                        src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg"
                        alt="cancha atardecer"
                    />
                </Col>
                <Col xs={12} md={4} lg={2} className="p-0">
                    <img
                        className="imagenGaleria w-100"
                        src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg"
                        alt="cesped futbol pelota"
                    />
                </Col>
                <Col xs={12} md={4} lg={2} className="p-0">
                    <img
                        className="imagenGaleria w-100"
                        src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg"
                        alt="dominio pelota futbol"
                    />
                </Col>
            </Row>
        </section>
    );
};

export default Inicio;