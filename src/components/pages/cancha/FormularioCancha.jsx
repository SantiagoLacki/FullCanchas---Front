import { Form, Button} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm} from "react-hook-form";

const FormularioCancha = () => {
    return (
        <>
            <div className="text-center mt-3">
                <img
                    className="imagen-icono"
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759706583/cancha_itfl2j.png"
                    alt="icono cancha"
                />
            </div>
            
        </>
    );
};

export default FormularioCancha;