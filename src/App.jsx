import { BrowserRouter, Route, Routes } from "react-router";
import Menu from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Administrador from "./components/pages/Administrador";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import QuienesSomos from "./components/pages/QuienesSomos";
import PoliticasDePrivacidad from "./components/pages/PoliticasdePrivacidad.jsx";
import Register from "./components/pages/Register";
import FormularioUsuario from "./components/pages/usuario/FormularioUsuario";
import FormularioCancha from "./components/pages/cancha/FormularioCancha";
import ReservaCancha from "./components/pages/reserva/ReservaCancha";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import TerminosYCondiciones from "./components/pages/TerminosYCondiciones.jsx";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import FormularioReserva from "./components/pages/reserva/FormularioReserva";
import PopupAd from "./components/shared/Publicidad/Publicidad.jsx";
import Productos from "./components/pages/Productos.jsx";
import Swal from "sweetalert2";
import { leerProductosPaginados } from "./components/pages/helpers/queries.js";
import DetalleProductos from "./components/pages/DetalleProductos.jsx";
import Carrito from "./components/pages/Carrito.jsx";

function App() {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);
  const [listaProductos, setListaProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioAdmin));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    obtenerProductos();
  }, [usuarioAdmin, page, carrito]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

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

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((p) => p._id === producto._id);

      if (existe) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Se agregó otra unidad de "${producto.nombre}"`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        return prevCarrito.map((p) => (p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p));
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `"${producto.nombre}" agregado al carrito`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) => {
          if (p._id === id) {
            return { ...p, cantidad: p.cantidad - 1 };
          }
          return p;
        })
        .filter((p) => p.cantidad > 0)
    );

    const productoEliminado = carrito.find((p) => p._id === id);
    if (productoEliminado) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: `"${productoEliminado.nombre}" disminuido en 1`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
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
            <Route
              path="/"
              element={
                <Inicio
                  listaProductos={listaProductos}
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                  agregarAlCarrito={agregarAlCarrito}
                ></Inicio>
              }
            ></Route>
            <Route
              path="/productos"
              element={<Productos listaProductos={listaProductos} agregarAlCarrito={agregarAlCarrito}></Productos>}
            ></Route>
            <Route path="/detalleproducto/:id" element={<DetalleProductos></DetalleProductos>}></Route>
            <Route path="/carrito" element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito}></Carrito>}></Route>
            <Route path="/login" element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}></Route>
            <Route path="/quienesSomos" element={<QuienesSomos></QuienesSomos>}></Route>
            <Route path="/PoliticasDePrivacidad" element={<PoliticasDePrivacidad></PoliticasDePrivacidad>}></Route>
            <Route path="/registro" element={<Register></Register>}></Route>
            <Route path="/terminosycondiciones" element={<TerminosYCondiciones></TerminosYCondiciones>}></Route>
            <Route path="/administrador" element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}>
              <Route
                index
                element={
                  <Administrador
                    usuarioAdmin={usuarioAdmin}
                    obtenerProductos={obtenerProductos}
                    page={page}
                    totalPages={totalPages}
                    listaProductos={listaProductos}
                    setListaProductos={setListaProductos}
                  ></Administrador>
                }
              ></Route>
              <Route
                path="crearusuario"
                element={<FormularioUsuario titulo={"Usuario Nuevo"} usuarioAdmin={usuarioAdmin}></FormularioUsuario>}
              ></Route>
              <Route path="editarusuario/:id" element={<FormularioUsuario titulo={"Modificar Usuario"}></FormularioUsuario>}></Route>
              <Route path="crearcancha" element={<FormularioCancha titulo={"Cancha Nueva"}></FormularioCancha>}></Route>
              <Route path="editarcancha/:id" element={<FormularioCancha titulo={"Modificar Cancha"}></FormularioCancha>}></Route>
              <Route path="crearproducto" element={<FormularioProducto titulo={"Producto Nuevo"}></FormularioProducto>}></Route>
              <Route path="editarproducto/:id" element={<FormularioProducto titulo={"Modificar Producto"}></FormularioProducto>}></Route>
              <Route path="editarreserva/:id" element={<FormularioReserva titulo={"Modificar Reserva"}></FormularioReserva>}></Route>
            </Route>
            <Route path="/reserva/:id" element={<ReservaCancha usuarioAdmin={usuarioAdmin}></ReservaCancha>}></Route>
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
