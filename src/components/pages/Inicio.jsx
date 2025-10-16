import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import CardCancha from "./cancha/CardCancha";
import CardProducto from "./producto/CardProducto";
import AOS from "aos";
import "aos/dist/aos.css";
import { leerCanchas } from "./helpers/queries";


const Inicio = ({ listaProductos, page, totalPages }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [listaCanchas, setListaCanchas] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      offset: 100,
    });
    obtenerCanchas();
  }, []);

  const galleryImages = [
    "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
    "https://images.pexels.com/photos/1378425/pexels-photo-1378425.jpeg",
    "https://images.pexels.com/photos/774321/pexels-photo-774321.jpeg",
    "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
    "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
  ];

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  const obtenerCanchas = async () => {
    const respuesta = await leerCanchas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaCanchas(datos);
    } else {
      console.info("Ocurrio un error al buscar las canchas");
    }
    //setMostrarSpinner(false)
  };

  return (
    <section className="mainSection">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="banner" src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg" alt="fondo cancha" />
          <div className="carousel-caption position-absolute end-50 bottom-0 text-start w-50 fadeInTexto">
            <h3 className="titulo-banner fs-1 mb-0 fw-light">Viví el futbol</h3>
            <h3 className="titulo-banner shadow-sm fw-bold">FULLCANCHAS</h3>
            <p className="fs-5 fw-light">
              Aquí, la pasión por la pelota se enciende en cada partido. Tenemos el espacio perfecto para vos. Conéctate, elige tu horario y
              preparate para jugar.
            </p>
          </div>
        </div>
      </div>
      <section>
        <div className="bg-shopp">
          <h3 className="container text-white text-center fs-5 pt-3 mb-0">Reservá tu cancha en 3 simples pasos</h3>
          <Container>
            <Row className=" pt-3 rounded-2 mb-4">
              <Col className="d-flex flex-column align-items-center mx-4">
                <p className="fw-bold fs-5 text-white">PASO 1</p>
                <img
                  className="imagen-icono"
                  src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759154741/Elegir2_t2ykcl.png"
                  alt="icono elegí"
                />
                <p className="fw-bolder fs-5 text-white">Elegí tu cancha</p>
              </Col>
              <Col className="d-flex flex-column align-items-center mx-4">
                <p className="fw-bold fs-5 text-white">PASO 2</p>
                <img
                  className="imagen-icono"
                  src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759154741/Horario2_satb47.png"
                  alt="icono elegí"
                />
                <p className="fw-bolder fs-5 text-white">Elegí el día y la hora</p>
              </Col>
              <Col className="d-flex flex-column align-items-center mx-4">
                <p className="fw-bold fs-5 text-white">PASO 3</p>
                <img
                  className="imagen-icono"
                  src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759154741/Juga2_xw0qnm.png"
                  alt="icono elegí"
                />
                <p className="fw-bolder fs-5 text-white">Vení a Jugar!!!</p>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="mt-2">
          <h1 className="titulo-seccion text-center mt-5 mb-4 text-white">Nuestras Canchas</h1>
          <Row className="justify-content-center">
            {listaCanchas.map((cancha) => (
              <Col key={cancha._id} xl={3} lg={4} md={6}>
                <div>
                  <CardCancha cancha={cancha}></CardCancha>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        <div className="bg-shopp px-5 py-3">
          <h2 className="titulo-seccion text-center mt-3 mb-4 text-white fs-1">Productos</h2>
          <Container>
            <Row className="justify-content-center">
              {listaProductos.length > 0 ? (
                listaProductos.map((producto) => (
                  <Col key={producto._id} xl={3} lg={4} md={6} className="mb-4">
                    <CardProducto producto={producto} />
                  </Col>
                ))
              ) : (
                <p className="text-center text-light">No hay productos disponibles</p>
              )}
            </Row>
          </Container>
          <div className="d-flex justify-content-center align-items-center">
            <Button variant="secondary" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Anterior
            </Button>
            <span className="mx-3 text-light">
              Pagina {page} a {totalPages}
            </span>
            <Button variant="secondary" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
              Siguiente
            </Button>
          </div>
        </div>
      </section>

      <Row className="mt-0">
        {galleryImages.map((imageUrl, index) => (
          <Col key={index} xs={12} md={4} lg={2} className="p-0">
            <img
              className="contenedor-imagen imagenGaleria w-100"
              src={imageUrl}
              alt={`imagen galería ${index + 1}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleImageClick(imageUrl)}
            />
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered className="image-modal">
        <Modal.Body className="text-center p-0">
          <img src={selectedImage} alt="Vista ampliada" className="modal-imagen-ampliada" />
        </Modal.Body>
      </Modal>

      <div className="container mt-5 ">
        <h3 className="titulo-seccion text-white">Donde estamos</h3>
        <div className="d-flex align-items-center">
          <i className="bi bi-geo-alt fs-2 text-white"></i>
          <p className="fs-6 mx-2 mb-0 fw-light text-white">Gral. José María Paz 1544, San Miguel de Tucumán, Tucumán</p>
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13836.007794024403!2d-65.23461743173766!3d-26.82855015704578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c6e58a8deab%3A0x889e3702172a7141!2sEl%20Abasto%20Futbol%205!5e0!3m2!1ses-419!2sar!4v1759030578317!5m2!1ses-419!2sar"
          width="100%"
          height="200"
          style={{ border: 0 }}
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
