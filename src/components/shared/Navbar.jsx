import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link, useNavigate } from "react-router";
import FullCanchaLogo from "../../assets/logo-canchasfull-nav.png";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

function Menu({ usuarioAdmin, setUsuarioAdmin, setCarrito }) {
  const navegacion = useNavigate();
  const logout = () => {
    Swal.fire({
      title: "Cerrar Sesión",
      html: `
        <div class="text-center">
          <p>¿Estás seguro de que quieres cerrar tu sesión?</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ca5118ff",
      cancelButtonColor: "#dfb134ff",
      confirmButtonText: '<i class="bi bi-box-arrow-right"></i> Cerrar Sesión',
      cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        sessionStorage.removeItem("carrito");
        sessionStorage.removeItem("userKey");
        setUsuarioAdmin({});
        navegacion("/");
      }
    });
  };
  return (
    <Navbar expand="lg" className="navbar ps-4 pe-5">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"} className="fw-bold text-warning">
          <img src={FullCanchaLogo} alt="full cancha logo" className="logo-nav img-fluid" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav gap-4">
          <Nav className="ms-auto gap-2">
            <NavLink as={Link} to={"/"} className="nav-link fw-bold navbar-links rounded px-2">
              <i className="bi bi-house-fill fs-4 me-1"></i>Inicio
            </NavLink>
            <NavLink as={Link} to={"/productos"} className="nav-link fw-bold navbar-links rounded px-2">
              <i className="bi bi-bag-fill fs-4 me-1"></i>Catalogo
            </NavLink>
            <NavLink as={Link} to={"/carrito"} className="nav-link fw-bold navbar-links rounded px-2">
              <i className="bi bi-cart-plus-fill fs-4 me-1"></i>Carrito
            </NavLink>
            {usuarioAdmin.token && (usuarioAdmin.rol === "admin" || usuarioAdmin.rol === "staff") ? (
              <>
                <NavLink className="nav-link fw-bold navbar-links rounded px-2" to={"/administrador"}>
                  <i className="bi bi-person-vcard fs-4 me-1"></i>
                  Administrador
                </NavLink>
                <Button className="nav-link fw-bold navbar-links rounded px-2 btn-gold" onClick={logout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : usuarioAdmin.token && usuarioAdmin.rol === "user" ? (
              <>
                <Button className="nav-link fw-bold navbar-links rounded px-2 btn-gold" onClick={logout}>
                  Cerrar Sesión
                </Button>
                <div className="d-flex align-items-center text-warning">
                  <i className="bi bi-person-check fs-4 me-2 "></i>
                  <p className="mb-0 ">{usuarioAdmin.nombreUsuario}</p>
                </div>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to={"/login"} className="nav-link fw-bold text-white rounded px-2">
                  <i className="bi bi-person-circle fs-4 me-2"></i>Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to={"/registro"} className="nav-link fw-bold text-white rounded px-2 border">
                  <i className="bi bi-person-plus-fill fs-4 me-2"></i>Registro
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
