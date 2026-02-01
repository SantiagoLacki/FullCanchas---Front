import "./PoliticasDePrivacidad.css";

const PoliticasPrivacidad = () => {
  const nombreComplejo = "FullCanchas";
  const emailContacto = "FullCanchas@gmail.com";
  const fechaActualizacion = "Octubre de 2025";

  return (
    <div className="pp-full py-4">
      <div className="pp-container container my-5">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bolder text-dark py-4">POLÍTICAS DE PRIVACIDAD</h1>
          <p className="lead text-muted">
            {nombreComplejo} está comprometido con la protección de su privacidad.
            <br />
            Última actualización: {fechaActualizacion}
          </p>
        </header>

        <section className="mb-5">
          <h2 className="pp-section-title">1. Identidad y Cumplimiento Normativo</h2>
          <div className="card shadow-sm mb-3 pp-card-detail">
            <div className="card-body">
              <h5 className="card-title text-dark fw-bold">1.1. Responsable del Tratamiento de Datos</h5>
              <p className="pp-paragraph">
                El responsable del archivo, registro o base de datos es {nombreComplejo}, con domicilio en Gral. José María Paz 1544, San
                Miguel de Tucumán, Tucumán, Argentina.
              </p>
            </div>
          </div>
          <p className="pp-paragraph alert alert-secondary border-0 py-3">
            {nombreComplejo} garantiza el cumplimiento de la Ley Nacional de Protección de Datos Personales N° 25.326 y su normativa
            reglamentaria, así como toda norma argentina aplicable en la materia.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="pp-section-title">2. Datos Recolectados y Finalidades</h2>
          <h5 className="text-dark fw-bold mb-3">2.1. Tipos de Datos Recabados</h5>
          <ul className="list-group pp-list">
            <li className="list-group-item">
              <span className="fw-semibold">Datos de Reserva y Cuenta:</span> Nombre, Apellido, DNI/CUIT, dirección de correo electrónico,
              teléfono y datos de la cancha reservada (fecha y hora).
            </li>
            <li className="list-group-item">
              <span className="fw-semibold">Datos de E-commerce:</span> Datos de facturación, dirección de envío y el historial de compras.
            </li>
            <li className="list-group-item">
              <span className="fw-semibold">Datos de Navegación (Cookies):</span> Información sobre el uso del sitio web, ubicación
              aproximada y preferencias de sesión.
            </li>
          </ul>

          <h5 className="text-dark fw-bold my-3">2.2. Finalidades del Tratamiento</h5>
          <p className="pp-paragraph">Sus datos personales serán utilizados exclusivamente para los siguientes propósitos:</p>
          <ul className="list-group pp-list-sub">
            <li className="list-group-item">Gestionar, validar y confirmar las reservas de canchas y los pagos asociados.</li>
            <li className="list-group-item">Procesar y enviar los productos adquiridos a través del e-commerce.</li>
            <li className="list-group-item">Comunicar información esencial sobre el estado de su reserva o compra.</li>
            <li className="list-group-item">
              Realizar análisis internos para la mejora de nuestros servicios y la seguridad de la plataforma.
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="pp-section-title">3. Derechos del Titular de los Datos</h2>
          <p className="pp-paragraph">
            En cumplimiento de los artículos 14, 15 y 16 de la Ley N° 25.326, usted posee los siguientes derechos sobre sus datos
            personales:
          </p>

          <div className="card shadow-sm pp-card-danger">
            <div className="card-body">
              <h5 className="card-title text-dark fw-bolder">Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h5>
              <p className="pp-paragraph">
                Derecho de Acceso: Usted tiene la facultad de solicitar y obtener información de sus datos personales incluidos en nuestras
                bases de datos, con una periodicidad no inferior a seis (6) meses.
              </p>
              <p className="pp-paragraph">
                Derecho de Rectificación, Actualización y Supresión (Cancelación): Usted podrá solicitar la corrección, actualización o
                eliminación de sus datos si resultan ser inexactos, incompletos, desactualizados o si ya no son necesarios para los fines
                que fueron recolectados.
              </p>
            </div>
          </div>

          <p className="pp-paragraph mt-3 small text-muted">
            Para ejercer cualquiera de estos derechos, el titular deberá enviar una solicitud por escrito a {emailContacto}. El Responsable
            del archivo responderá en los plazos establecidos por la normativa vigente.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="pp-section-title">4. Confidencialidad y Seguridad</h2>
          <ul className="list-group pp-list">
            <li className="list-group-item">
              <span className="fw-semibold">Seguridad de la Información:</span> {nombreComplejo} implementa medidas técnicas y
              organizacionales para asegurar la confidencialidad e integridad de sus datos personales, buscando evitar su alteración,
              pérdida o acceso no autorizado.
            </li>
            <li className="list-group-item">
              <span className="fw-semibold">Transferencia de Datos a Terceros:</span> Sus datos no serán vendidos, alquilados o cedidos a
              terceros, salvo que (i) sea estrictamente necesario para la prestación del servicio (ej. servicios de pago, logística de
              envíos), o (ii) exista una obligación legal o mandato judicial.
            </li>
            <li className="list-group-item">
              <span className="fw-semibold">Uso de Cookies:</span> Utilizamos cookies propias y de terceros para optimizar la experiencia de
              reserva y compra. Al navegar, usted acepta el uso de estas cookies. Puede gestionar su configuración de cookies a través de su
              navegador.
            </li>
          </ul>
        </section>

        <footer className="text-center pt-3 border-top">
          <p className="text-muted small">
            Órgano de Control: La Agencia de Acceso a la Información Pública (AAIP), en su carácter de Órgano de Control de la Ley N°
            25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan por incumplimientos a la normativa sobre
            protección de datos personales.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PoliticasPrivacidad;
