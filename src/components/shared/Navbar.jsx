import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu() {
  return (
    <Navbar expand="lg" className="navbar ps-4 pe-5">
      <Container fluid>
        <Navbar.Brand to={"/"} className='nav-link fw-bold text-white'>FullCanchas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link to={"/"} className='nav-link fw-bold text-white'>Inicio</Nav.Link>
            <Nav.Link to={"/reservas"} className='nav-link fw-bold text-white'>Reservas</Nav.Link>
            <Nav.Link to={"/catalogo"} className='nav-link fw-bold text-white'>Catalogo</Nav.Link>
            <Nav.Link to={"/login"} className='nav-link fw-bold text-white'>Iniciar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;