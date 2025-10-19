import './TerminosYCondiciones.css'; 

const TerminosYCondiciones = () => {

  return (
    <div className='tyc-full py-5'>
      <div className="tyc-container container py-5">
      <header className="text-center mb-5">
        <h1 className="display-5 fw-bolder text-dark py-3">TÉRMINOS Y CONDICIONES DE USO</h1>
        <p className="lead text-muted">
          FullCanchas | Dirección: Gral. José María Paz 1544, San Miguel de Tucumán, Tucumán
          <br />
          Última actualización: Octubre 2025
        </p>
      </header>
      
      <section className="mb-5">
        <h2 className="tyc-section-title">1. Objeto y Aceptación</h2>
        <p className="tyc-paragraph">
          El presente documento establece los Términos y Condiciones Generales (en adelante, "T&C") que rigen el uso de la plataforma web y los servicios ofrecidos por FullCanchas, un complejo deportivo que incluye el servicio de reserva de canchas de fútbol 5 y una plataforma de e-commerce.
        </p>
        <p className="tyc-paragraph alert alert-secondary border-0 py-3">
          La utilización de cualquiera de los servicios de FullCanchas (incluyendo la navegación, registro, reserva o compra) implica la aceptación plena e incondicional de estos T&C, constituyendo un acuerdo legalmente vinculante entre el Usuario y FullCanchas.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="tyc-section-title">2. Disposiciones de Reservas y Cláusula Penal</h2>
        
        <div className="card shadow-sm mb-4 border-0 tyc-card-detail">
          <div className="card-body">
            <h5 className="card-title text-dark fw-bold">2.1. Confirmación, Horarios y Plazos</h5>
            <p className="tyc-paragraph">
              Las reservas de canchas se realizan exclusivamente para los días Lunes a Sábado. La confirmación está supeditada al pago total o de la seña establecida. El tiempo de retraso se descontará del tiempo total reservado, sin derecho a prórroga o compensación.
            </p>
          </div>
        </div>
        
        <div className="card shadow-lg mb-4 border-0 tyc-card-danger">
          <div className="card-body">
            <h5 className="card-title text-dark fw-bolder">2.2. Cláusula por Incumplimiento (No Show)</h5>
            <p className="tyc-paragraph fw-semibold">
              Se define como "No Show" la inasistencia del equipo/usuario a la cancha reservada, o la cancelación realizada con menos de 24 horas de anticipación al turno.
            </p>
            <p className="tyc-paragraph">
              En virtud de la cláusula penal, si el Usuario incurre en un "No Show", perderá automáticamente el monto total o el importe de la seña abonada. Dicho monto será retenido por FullCanchas en concepto de resarcimiento por los daños y perjuicios derivados de la imposibilidad de comercializar el turno. No habrá lugar a reembolso, crédito o reprogramación.
            </p>
          </div>
        </div>
        
        <div className="card shadow-sm border-0 tyc-card-detail">
          <div className="card-body">
            <h5 className="card-title text-dark fw-bold">2.3. Cancelaciones por Fuerza Mayor</h5>
            <p className="tyc-paragraph">
              Si FullCanchas debe cancelar una reserva debido a factores de fuerza mayor (ej. condiciones climáticas extremas), se ofrecerá al Usuario la reprogramación del turno o el reembolso íntegro del monto abonado.
            </p>
          </div>
        </div>
        
      </section>

      <section className="mb-5">
        <h2 className="tyc-section-title">3. Comercio Electrónico y Transacciones</h2>
        <ul className="list-group tyc-list">
          <li className="list-group-item">
            <h5 className="mb-1 text-dark fw-bold">3.1. Proceso de Compra y Facturación</h5>
            <p className="mb-1 tyc-paragraph">Los precios de los productos están indicados en Pesos Argentinos. La compra se perfecciona con el pago. Emitiremos la factura o ticket fiscal correspondiente al consumidor final.</p>
          </li>
          <li className="list-group-item">
            <h5 className="mb-1 text-dark fw-bold">3.2. Derecho de Revocación (Arrepentimiento)</h5>
            <p className="mb-1 tyc-paragraph">Conforme a la Ley de Defensa del Consumidor, el cliente tiene el derecho de revocar la aceptación del producto adquirido a través de nuestro sitio web, dentro de los diez (10) días corridos contados a partir de la fecha de entrega, siempre que el producto sea devuelto sin uso y con su empaque original.</p>
          </li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="tyc-section-title">4. Responsabilidad y Legislación Aplicable</h2>
        <p className="tyc-paragraph">
          4.1. Conducta en las Instalaciones: El Usuario es responsable por la conducta propia y de sus acompañantes. Queda estrictamente prohibido el consumo de bebidas alcohólicas (fuera de las áreas autorizadas) y sustancias ilícitas.
        </p>
        <p className="tyc-paragraph">
          4.2. Exclusión de Responsabilidad por Riesgo Deportivo: El Usuario asume los riesgos inherentes a la práctica del fútbol 5. FullCanchas no se responsabiliza por lesiones, daños físicos o robo de objetos personales en las instalaciones.
        </p>
        <p className="tyc-paragraph">
          4.3. Jurisdicción: Para cualquier controversia, el Usuario y FullCanchas se someten a la jurisdicción de los Tribunales Ordinarios de la Provincia de Tucumán, con expresa renuncia a cualquier otro fuero.
        </p>
      </section>

      <footer className="text-center pt-3 border-top">
        <p className="text-muted small">
          Para consultas, por favor contactar a: FullCanchas@gmail.com
        </p>
      </footer>
    </div>
    </div>
  );
};

export default TerminosYCondiciones;