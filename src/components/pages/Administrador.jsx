import { Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router";
import ItemUsuario from "./usuario/ItemUsuario";
import { useState } from "react";
import ItemCancha from "./cancha/ItemCancha";

const Administrador = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('')

    const handleBuscarChange=(e)=>{
        setTerminoBusqueda(e.target.value)
    }

    return (
        <section className="container mainSection">

            <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="display-6 titulo-banner fw-bold text-white me-4">Usuarios</h2>
                    <div>
                    <Link className="btn btn-gold text-white" to={'/administrador/crear'} ><i class="bi bi-plus-circle"></i> Agregar     
                    </Link>
                    </div>
                </div>
                <div>
                    <Form>
                        <Row className="d-flex justify-content-start">
                            <Col xs="auto d-flex">
                                <i className="bi bi-search fs-3 me-2 text-secondary"></i>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar"
                                    className=" mr-sm-2"
                                    onChange={handleBuscarChange}
                                    value={terminoBusqueda}
                                />
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <Table responsive striped bordered hover>
                <thead>
                <tr className="text-center">
                    <th className="text-secondary">#</th>
                    <th className="text-secondary">Nombre de Usuario</th>
                    <th className="text-secondary">Email</th>
                    <th className="text-secondary">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    <>
                        <ItemUsuario></ItemUsuario>
                        <ItemUsuario></ItemUsuario>
                        <ItemUsuario></ItemUsuario>
                        <ItemUsuario></ItemUsuario>
                        <ItemUsuario></ItemUsuario>
                    </>
                }
                </tbody>
            </Table>

            <div>
                <div className="d-flex align-items-center mt-5 mb-3">
                    <h2 className="display-6 titulo-banner fw-bold text-white me-4">Canchas</h2>
                    <div>
                    <Link className="btn btn-gold text-white" to={'/administrador/crear'} >
                        <i class="bi bi-plus-circle"></i> Agregar
                    </Link>
                    </div>
                </div>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr className="text-center">
                        <th className="text-secondary">#</th>
                        <th className="text-secondary">Cancha</th>
                        <th className="text-secondary">Precio</th>
                        <th className="text-secondary">Imagen</th>
                        <th className="text-secondary">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        <>
                            <ItemCancha></ItemCancha>
                            <ItemCancha></ItemCancha>
                            <ItemCancha></ItemCancha>
                            <ItemCancha></ItemCancha>
                            <ItemCancha></ItemCancha>
                        </>
                    }
                    </tbody>
                </Table>
            </div>
        </section> 
    );
};

export default Administrador;