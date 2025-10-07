import { Form, Button} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm} from "react-hook-form";

const FormularioProducto = () => {
    return (
        <>
            <div className="text-center mt-3">
                <img
                    className="imagen-icono"
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759706584/producto_lnjcpd.png"
                    alt="icono elegí"
                />
            </div> 
            <section className="container mainSection border text-white rounded-2 py-1 px-4 mt-4 shadow-lg">
                <h1 className="display-6 titulo-banner fw-bold text-center me-4 mt-2">Nuevo Producto</h1>

            </section>
        </>
    );
};

export default FormularioProducto;