import { Table } from "react-bootstrap";
import { Link } from "react-router";

const Administrador = () => {
    return (
        <div>
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <h2 className="display-6 titulo-banner fw-bold text-white">Usuarios registrados</h2>
                        <div>
                        <Link className="btn btn-gold text-white" to={'/administrador/crear'} >
                            <i className="bi bi-file-earmark-plus fs-3"></i>
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
                            <ItemUsuario></ItemUsuario>
                        }
                        </tbody>
                    </Table>
                </div> 
    );
};

export default Administrador;