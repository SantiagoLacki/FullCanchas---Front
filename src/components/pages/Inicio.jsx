import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import CardCancha from "./cancha/CardCancha";
import CardProducto from "./producto/CardProducto";

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
            <section>
                <Container className="mt-2">
                    <Row className="bg-shopp pt-3 rounded-2 mb-4">
                        <Col className="d-flex flex-column align-items-center mx-4">
                            <img
                                className="imagen-icono"
                                src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759154741/Elegir2_t2ykcl.png"
                                alt="icono elegí"
                            />
                            <p className="fw-bolder fs-5 text-white">Elegí tu cancha</p>
                        </Col>
                        <Col className="d-flex flex-column align-items-center mx-4">
                            <img
                                className="imagen-icono"
                                src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759154741/Horario2_satb47.png"
                                alt="icono elegí"
                            />
                            <p className="fw-bolder fs-5 text-white">Elegí el día y la hora</p>
                        </Col>
                        <Col className="d-flex flex-column align-items-center mx-4">
                            <img
                                className="imagen-icono"
                                src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759154741/Juga2_xw0qnm.png"
                                alt="icono elegí"
                            />
                            <p className="fw-bolder fs-5 text-white">Vení a Jugar!!!</p>
                        </Col>
                    </Row>
                    <h1 className="text-center">Nuestras Canchas</h1>
                    <Row className="justify-content-center">
                        <CardCancha></CardCancha>
                        <CardCancha></CardCancha>
                        <CardCancha></CardCancha>
                        <CardCancha></CardCancha>
                        <CardCancha></CardCancha>
                    </Row>
                    <div className="bg-shopp px-5 rounded-4 mb-1">
                        <h2 className="text-center text-white">Productos</h2>
                        <Row>
                        <CardProducto></CardProducto>
                        </Row>
                    </div>

                </Container>
            </section>

            <Row className="mt-2">
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
                <h3 >Donde estamos</h3>
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