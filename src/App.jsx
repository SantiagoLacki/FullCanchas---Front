import { BrowserRouter, Route, Routes } from "react-router";
import Menu from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Administrador from "./components/pages/Administrador";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import QuienesSomos from "./components/pages/QuienesSomos";
import Register from "./components/pages/Register";
import FormularioUsuario from "./components/pages/usuario/FormularioUsuario";
import FormularioCancha from "./components/pages/cancha/FormularioCancha";
import ReservaCancha from "./components/pages/reserva/ReservaCancha";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import FormularioReserva from "./components/pages/reserva/FormularioReserva";
import PopupAd from "./components/shared/Publicidad/Publicidad.jsx"; // Importar el componente
import Productos from "./components/pages/Productos.jsx";
import Swal from "sweetalert2";
import { leerProductosPaginados } from "./components/pages/helpers/queries.js";

function App() {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);
  const [listaProductos, setListaProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioAdmin));
    obtenerProductos();
  }, [usuarioAdmin, page]);

  const obtenerProductos = async () => {
    const respuesta = await leerProductosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaProductos(datos.productos);
      setTotalPages(datos.totalPages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intenta esta operación en unos minutos",
      });
    }
  };

  return (
    <>
      <BrowserRouter>
        <Menu usuarioAdmin={usuarioAdmin} setUsuarioAdmin={setUsuarioAdmin}></Menu>
        <main>
          <PopupAd />
          <Routes>
            <Route path="/" element={<Inicio listaProductos={listaProductos} page={page} totalPages={totalPages}></Inicio>}></Route>
            <Route path="/productos" element={<Productos listaProductos={listaProductos}></Productos>}></Route>
            <Route path="/login" element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}></Route>
            <Route path="/quienesSomos" element={<QuienesSomos></QuienesSomos>}></Route>
            <Route path="/registro" element={<Register></Register>}></Route>
            <Route path="/administrador" element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}>
              <Route index element={<Administrador usuarioAdmin={usuarioAdmin}></Administrador>}></Route>
              <Route path="crearusuario" element={<FormularioUsuario titulo={"Usuario Nuevo"} usuarioAdmin={usuarioAdmin}></FormularioUsuario>}></Route>
              <Route path="editarusuario/:id" element={<FormularioUsuario titulo={"Modificar Usuario"}></FormularioUsuario>}></Route>
              <Route path="crearcancha" element={<FormularioCancha titulo={"Cancha Nueva"}></FormularioCancha>}></Route>
              <Route path="editarcancha/:id" element={<FormularioCancha titulo={"Modificar Cancha"}></FormularioCancha>}></Route>
              <Route path="crearproducto" element={<FormularioProducto titulo={"Producto Nuevo"}></FormularioProducto>}></Route>
              <Route path="editarproducto/:id" element={<FormularioProducto titulo={"Modificar Producto"}></FormularioProducto>}></Route>
              <Route path="editarreserva/:id" element={<FormularioReserva titulo={"Modificar Reserva"}></FormularioReserva>}></Route>
            </Route>
            <Route path="/reserva/:id" element={<ReservaCancha usuarioAdmin={usuarioAdmin}></ReservaCancha>}></Route>
            <Route path="*" element={<Inicio></Inicio>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
