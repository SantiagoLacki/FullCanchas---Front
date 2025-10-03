import { Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router";
import ItemUsuario from "./usuario/ItemUsuario";
import { useState } from "react";

const Administrador = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('')

    const handleBuscarChange=(e)=>{
        setTerminoBusqueda(e.target.value)
    }

    return (
        <section className="container mainSection">

            <div className="d-flex justify-content-between align-items-center mt-5">
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
                                        placeholder="Buscar usuario"
                                        className=" mr-sm-2"
                                        onChange={handleBuscarChange}
                                        value={terminoBusqueda}
                                    />
                                    </Col>
                                </Row>
                            </Form>
                    </div>

            </div>
            <hr />
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
        </section> 
    );
};

export default Administrador;