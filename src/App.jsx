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
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";

function App() {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem('userKey')) || {}
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado)

  useEffect(()=>{
    sessionStorage.setItem('userKey', JSON.stringify(usuarioAdmin))
  }, [usuarioAdmin])

  return (
    <>
    <BrowserRouter>
      <Menu usuarioAdmin={usuarioAdmin} setUsuarioAdmin={setUsuarioAdmin}></Menu>
      <main>
        <Routes>
          <Route path="/" element={<Inicio></Inicio>}></Route>
          <Route path="/login" element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}></Route>
          <Route path="/quienesSomos" element={<QuienesSomos></QuienesSomos>}></Route>
          <Route path="/registro" element={<Register></Register>}></Route>
          <Route path="/administrador" element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}>
              <Route index element={<Administrador></Administrador>}></Route>
              <Route path="crearusuario" element={<FormularioUsuario></FormularioUsuario>}></Route>
              <Route path="crearcancha" element={<FormularioCancha></FormularioCancha>}></Route>
              <Route path="crearproducto" element={<FormularioProducto></FormularioProducto>}></Route>
          </Route>
          <Route path="/reserva" element={<ReservaCancha></ReservaCancha>}></Route>
          <Route path="*" element={<Inicio></Inicio>}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>  
    </>
  )
}

export default App
