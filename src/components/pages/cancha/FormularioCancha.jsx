import { Form, Button} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm} from "react-hook-form";

const FormularioCancha = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue
    } = useForm();
    const navegacion = useNavigate()
    const {id} = useParams()

    const onSubmit = async (receta) =>{

    }
    return (
        <>
            <div className="text-center mt-3">
                <img
                    className="imagen-icono"
                    src="https://res.cloudinary.com/duwi53e7z/image/upload/v1759706583/cancha_itfl2j.png"
                    alt="icono cancha"
                />
            </div>
            <section className="container mainSection border text-white rounded-2 py-1 px-4 mt-4 shadow-lg">
                <h1 className="display-6 titulo-banner fw-bold text-center me-4 mt-2">Nueva Cancha</h1>
                <div className="d-flex justify-content-center">
                    <Form className="my-4 w-75" onSubmit={handleSubmit(onSubmit)}>

                    </Form>
                </div>
            </section>
        </>
    );
};

export default FormularioCancha;