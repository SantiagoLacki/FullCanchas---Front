import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

const MODAL_SHOWN_KEY = "canches_popup_shown";

const PopupAd = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const wasShown = sessionStorage.getItem(MODAL_SHOWN_KEY);

    if (!wasShown) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(MODAL_SHOWN_KEY, "true");
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} dialogClassName="custom-responsive-popup" size="md">
      <Modal.Header closeButton className="popup-header py-2 px-3">
        <Modal.Title>¡Oferta Especial de Octubre! ⚽</Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-body p-0">
        <div className="ad-content p-2">
          <img
            src="https://ucarecdn.com/73caa4b7-dd30-47bd-b3dc-4d2e6c045172/imagenPublicidad20desc.png"
            alt="Descuento en Cancha"
            className="img-fluid w-100 d-block"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupAd;
