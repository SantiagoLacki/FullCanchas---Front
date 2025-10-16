import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link, useNavigate } from "react-router";
import FullCanchaLogo from "../../assets/logo-canchasfull-nav.png";
import { Button } from "react-bootstrap";

function Menu({ usuarioAdmin, setUsuarioAdmin }) {
  const navegacion = useNavigate();
  const logout = () => {
    setUsuarioAdmin({});
    navegacion("/");
  };
  return (
    <Navbar expand="lg" className="navbar ps-4 pe-5">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"} className="fw-bold text-white">
          <img src={FullCanchaLogo} alt="full cancha logo" className="logo-nav img-fluid" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/"} className="nav-link fw-bold text-white rounded px-2">
              <i class="bi bi-house-fill fs-4 me-1"></i>Inicio
            </Nav.Link>
            <Nav.Link as={Link} to={"/productos"} className="nav-link fw-bold text-white rounded px-2">
              <i className="bi bi-bag-fill fs-4 me-1"></i>Catalogo
            </Nav.Link>
            <Nav.Link as={Link} to={"/carrito"} className="nav-link fw-bold text-white rounded px-2">
              <i className="bi bi-cart-plus-fill fs-4 me-1"></i>Carrito
            </Nav.Link>
            {usuarioAdmin.token && usuarioAdmin.rol === "staff" ? (
              <>
                <NavLink className="nav-link fw-bold text-white rounded px-2" to={"/administrador"}>
                  <i className="bi bi-person-vcard fs-4 me-1"></i>
                  Administrador
                </NavLink>
                <Button className="nav-link fw-bold text-white rounded px-2 btn-gold" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : usuarioAdmin.token && usuarioAdmin.rol === "user" ? (
              <Button className="nav-link fw-bold text-white rounded px-2 btn-gold" onClick={logout}>
                Cerrar Sesión
              </Button>
            ) : (
              <Nav.Link as={Link} to={"/login"} className="nav-link fw-bold text-white rounded px-2">
                <i className="bi bi-person-circle fs-4 me-2"></i>Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
