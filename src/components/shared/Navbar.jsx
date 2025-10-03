import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
import FullCanchaLogo from '../../assets/logo-canchasfull-nav.png'

function Menu() {
  return (
    <Navbar expand="lg" className="navbar ps-4 pe-5">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"} className='fw-bold text-white'><img src={FullCanchaLogo} alt="full cancha logo" className='logo-nav img-fluid'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/catalogo"} className='nav-link fw-bold text-white rounded px-2'><i 
              className="bi bi-bag-fill fs-4 me-1"></i>Catalogo</Nav.Link>
            <Nav.Link as={Link} to={"/carrito"} className='nav-link fw-bold text-white rounded px-2'><i 
                className="bi bi-cart-plus-fill fs-4 me-1"></i>Carrito</Nav.Link>
            <Nav.Link as={Link} to={"/login"} className='nav-link fw-bold text-white rounded px-2'><i className="bi bi-person-circle fs-4 me-2"></i>Iniciar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
