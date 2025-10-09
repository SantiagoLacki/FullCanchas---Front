import { BrowserRouter, Route, Routes } from "react-router";
import Menu from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Administrador from "./components/pages/Administrador"
import Error404 from "./components/pages/Error404"
import Inicio from "./components/pages/Inicio"
import Login from "./components/pages/Login"
import QuienesSomos from "./components/pages/QuienesSomos"
import Register from "./components/pages/Register"
import FormularioUsuario from "./components/pages/usuario/FormularioUsuario";
import FormularioCancha from "./components/pages/cancha/FormularioCancha";
import ReservaCancha from "./components/pages/reserva/ReservaCancha";
import FormularioProducto from "./components/pages/producto/FormularioProducto";

function App() {

  return (
    <>
    <BrowserRouter>
      <Menu></Menu>
      <main>
        <Routes>
          <Route path="/" element={<Inicio></Inicio>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/quienesSomos" element={<QuienesSomos></QuienesSomos>}></Route>
          <Route path="/registro" element={<Register></Register>}></Route>
          <Route path="/administrador" element={<Administrador></Administrador>}></Route>
          <Route path="/administrador/crearusuario" element={<FormularioUsuario></FormularioUsuario>}></Route>
          <Route path="/administrador/crearcancha" element={<FormularioCancha></FormularioCancha>}></Route>
          <Route path="/reserva" element={<ReservaCancha></ReservaCancha>}></Route>
          <Route path="/administrador/crearproducto" element={<FormularioProducto></FormularioProducto>}></Route>
          <Route path="*" element={<Inicio></Inicio>}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>  
    </>
  )
}

export default App
