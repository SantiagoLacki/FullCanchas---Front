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
                        <h3 className="titulo fs-1 mb-0 fw-light">Viví el futbol</h3>
                        <h3 className="titulo shadow-sm fw-bold">FULLCANCHAS</h3>
                        <p className="fs-5 fw-light">
                            Aquí, la pasión por la pelota se enciende en cada partido. Tenemos el espacio perfecto para vos. Conéctate, elige tu horario y preparate para jugar.
                        </p>
                    </div>
                </div>
            </div>
            <Container className="mt-5">
                <h1 className="text-center">Nuestras Canchas</h1>
                <Row>
                    {

                    }
                </Row>
                <h2 className="text-center">Shopp</h2>
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
            <div className="container mt-5 ">
                <h2>Donde estamos</h2>
                <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt fs-2"></i>
                    <p className="fs-6 mx-2 mb-0 fw-light">Gral. José María Paz 1544, San Miguel de Tucumán, Tucumán</p>
                </div>
            </div>
            <div >
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13836.007794024403!2d-65.23461743173766!3d-26.82855015704578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c6e58a8deab%3A0x889e3702172a7141!2sEl%20Abasto%20Futbol%205!5e0!3m2!1ses-419!2sar!4v1759030578317!5m2!1ses-419!2sar" 
                    width="100%" 
                    height="200" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de las canchas"
                ></iframe>
            </div>
        </section>
    );
};

export default Inicio;