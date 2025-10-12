import { Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router";
import ItemUsuario from "./usuario/ItemUsuario";
import { useEffect, useState } from "react";
import ItemCancha from "./cancha/ItemCancha";
import ItemProducto from "./producto/ItemProducto";
import { leerProductos, leerUsuarios } from "./helpers/queries";

const Administrador = ({usuarioAdmin}) => {
    const [activeSection, setActiveSection] = useState("usuarios");
    const [terminoBusqueda, setTerminoBusqueda] = useState('')

    const [listaUsuarios, setListaUsuarios]= useState([]);
    const [listaProductos, setListaProductos]= useState([]);

    useEffect(()=>{
      obtenerUsuarios();
      obtenerProductos();
    }, [])

    const obtenerUsuarios = async ()=>{
      const respuesta = await leerUsuarios()
      if(respuesta.status === 200){
        const datos = await respuesta.json()
        console.log(usuarioAdmin.rol)
        if(usuarioAdmin.rol === "staff"){
            const datosFiltrados = datos.filter(usuario => usuario.rol === "user")
            setListaUsuarios(datosFiltrados)
        }else{
            const datosFiltrados = datos.filter(usuario => usuario.rol === "staff")
            setListaUsuarios(datosFiltrados)
        }

      }else{
        console.info('Ocurrio un error al buscar un producto')
      }
      //setMostrarSpinner(false)
    }

    const obtenerProductos = async ()=>{
      const respuesta = await leerProductos()
      if(respuesta.status === 200){
        const datos = await respuesta.json()
        setListaProductos(datos)
      }else{
        console.info('Ocurrio un error al buscar un producto')
      }
      //setMostrarSpinner(false)
    }

    const handleBuscarChange=(e)=>{
        setTerminoBusqueda(e.target.value)
    }

    return (
        <section className="container mainSection">
            <Dropdown className="mt-5">
                <Dropdown.Toggle variant="gold" className="text-white btn-gold">
                    {activeSection === 'usuarios' && 'Usuarios'}
                    {activeSection === 'canchas' && 'Canchas'}
                    {activeSection === 'productos' && 'Productos'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item 
                        onClick={() => setActiveSection('usuarios')}
                        active={activeSection === 'usuarios'}
                        className={activeSection === 'usuarios' ? 'btn-gold' : ''}
                    >
                        Usuarios
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => setActiveSection('canchas')}
                        active={activeSection === 'canchas'}
                        className={activeSection === 'canchas' ? 'btn-gold' : ''}
                    >
                        Canchas
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => setActiveSection('productos')}
                        active={activeSection === 'productos'}
                        className={activeSection === 'productos' ? 'btn-gold' : ''}
                    >
                        Productos
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
           {activeSection === 'usuarios' && ( 
            <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg">
                <div className="  align-items-center mt-2 mb-3">
                    <Row className="d-flex justify-content-between align-items-center mb-3">
                        <Col xs={12} md={6} className="mb-2 mb-md-0">
                            <div className="d-flex align-items-center">
                                <h2 className="display-6 titulo-banner fw-bold text-white me-4">Usuarios</h2>
                                <div>
                                <Link className="btn btn-gold text-white" to={'/administrador/crearusuario'} ><i className="bi bi-plus-circle"></i> Agregar     
                                </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form>
                                <Row className="justify-content-start justify-content-md-end">
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
                        </Col>
                    </Row>
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
                        listaUsuarios.map((usuario, indice)=> <ItemUsuario key={usuario._id} usuario={usuario} fila={indice+1} setListaUsuarios={setListaUsuarios} obtenerUsuarios={obtenerUsuarios}></ItemUsuario>)
                    }
                    </tbody>
                </Table>
            </div>
            )}
            {activeSection === 'canchas' && ( 
            <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg">
                <div className="d-flex align-items-center mt-2 mb-3">
                    <h2 className="display-6 titulo-banner fw-bold text-white me-4">Canchas</h2>
                    <div>
                    <Link className="btn btn-gold text-white" to={'/administrador/crearcancha'} >
                        <i class="bi bi-plus-circle"></i> Agregar
                    </Link>
                    </div>
                </div>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr className="text-center">
                        <th className="text-secondary">#</th>
                        <th className="text-secondary">Cancha</th>
                        <th className="text-secondary">Precio por Hora</th>
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
            )}
            {activeSection === 'productos' && ( 
            <div className="border text-white rounded-2 py-3 px-4 my-4 shadow-lg">
                <div className="  align-items-center mt-2 mb-3">
                    <Row className="d-flex justify-content-between align-items-center mb-3">
                        <Col xs={12} md={6} className="mb-2 mb-md-0">
                            <div className="d-flex align-items-center">
                                <h2 className="display-6 titulo-banner fw-bold text-white me-4">Productos</h2>
                                <div>
                                <Link className="btn btn-gold text-white" to={'/administrador/crearproducto'} ><i class="bi bi-plus-circle"></i> Agregar     
                                </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form>
                                <Row className="justify-content-start justify-content-md-end">
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
                        </Col>
                    </Row>
                </div>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr className="text-center">
                        <th className="text-secondary">#</th>
                        <th className="text-secondary">Nombre del producto</th>
                        <th className="text-secondary">Precio</th>
                        <th className="text-secondary">Categoria</th>
                        <th className="text-secondary">Imagen</th>
                        <th className="text-secondary">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        listaProductos.map((producto, indice)=> <ItemProducto key={producto._id} producto={producto} fila={indice+1} setListaProductos={setListaProductos}></ItemProducto>)
                    }
                    </tbody>
                </Table>
            </div>
            )}
        </section> 
    );
};

export default Administrador;