import CardProducto from "./producto/CardProducto.jsx";
import "./Productos.css";
function Productos({ listaProductos }) {
  return (
    <section className="productos-container">
      <h1 className="text-center text-primary">Productos por categoría</h1>

      <div className="categoria">
        <h2 className="text-black">Remeras</h2>
        <div className="productos-grid">
          
        </div>
      </div>

      <div className="categoria">
        <h2 className="text-black">Bebidas</h2>
        <div className="productos-grid">
          
        </div>
      </div>

      <div className="categoria">
        <h2 className="text-black">Snacks</h2>
        <div className="productos-grid">
          
        </div>
      </div>

      <div className="categoria">
        <h2 className="text-black">Pelotas</h2>
        <div className="productos-grid">
          
        </div>
      </div>
    </section>
  );
}

export default Productos;
