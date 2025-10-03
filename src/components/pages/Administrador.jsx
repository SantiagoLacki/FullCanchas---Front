import { Table } from "react-bootstrap";
import { Link } from "react-router";
import ItemUsuario from "./usuario/ItemUsuario";

const Administrador = () => {
    return (
        <section className="container mainSection">
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <h2 className="display-6 titulo-banner fw-bold text-white">Usuarios</h2>
                        <div>
                        <Link className="btn btn-gold text-white" to={'/administrador/crear'} ><i class="bi bi-plus-circle"></i> Agregar Usuario
                            
                        </Link>
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