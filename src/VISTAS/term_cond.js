import React from 'react';
import '../ESTILOS/term_cond.css';

function TerminosCondiciones() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="fond">
      <div className="terminos-condiciones-container">
        <h2 className='fs-1 mb-5'>Términos y Condiciones de Uso</h2><br />
        <p>Bienvenido a nuestra página web. Estos Términos y Condiciones de Uso ("Términos") establecen los términos legales y condiciones bajo los cuales puedes acceder y utilizar nuestro sitio web. Al acceder y utilizar nuestra página web, aceptas cumplir y estar sujeto a estos Términos. Si no estás de acuerdo con alguno de los términos establecidos aquí, por favor no utilices nuestra página web.</p>

        <h2>Propiedad Intelectual</h2>
        <p>Todos los derechos de propiedad intelectual, incluyendo pero no limitados a derechos de autor, marcas registradas y derechos sobre bases de datos, en el contenido y el diseño de nuestra página web, son propiedad o están licenciados a nosotros. Está prohibida cualquier reproducción, distribución, exhibición o transmisión del contenido de nuestra página web, a menos que se cuente con nuestro permiso expreso por escrito.</p>

        <h2>Uso Aceptable</h2>
        <p>Al utilizar nuestra página web, te comprometes a no llevar a cabo ninguna de las siguientes acciones:</p>
        <ul>
          <li>Publicar, transmitir o difundir cualquier contenido que sea ilegal, ofensivo, difamatorio, obsceno o que viole los derechos de terceros.</li>
          <li>Intentar acceder o recopilar información de otros usuarios sin su consentimiento.</li>
          <li>Utilizar nuestra página web de manera que pueda causar daño, interrupción o afectar negativamente la disponibilidad o funcionalidad de la misma.</li>
          <li>Realizar cualquier actividad que pueda infringir los derechos de propiedad intelectual u otros derechos de nuestra página web o de terceros.</li>
        </ul>

        <h2>Privacidad</h2>
        <p>Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar nuestra página web, aceptas que recopilemos, utilicemos y almacenemos tus datos personales de acuerdo con nuestra Política de Privacidad.</p>

        <h2>Limitación de Responsabilidad</h2>
        <p>Nuestra página web se proporciona "tal cual" y no ofrecemos garantías de ningún tipo, ya sean expresas o implícitas, sobre la exactitud, confiabilidad o disponibilidad de la información o servicios proporcionados en la misma. No seremos responsables por ningún daño o perjuicio, directo o indirecto, que surja del uso de nuestra página web.</p>

        <h2>Enlaces Externos</h2>
        <p>Nuestra página web puede contener enlaces a sitios web de terceros. Estos enlaces son proporcionados únicamente para tu conveniencia y no implican respaldo o afiliación con dichos sitios web. No tenemos control sobre el contenido de estos sitios web de terceros y no seremos responsables de ningún daño o perjuicio causado por su uso.</p>

        <h2>Modificaciones de los Términos y Condiciones</h2>
        <p>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier modificación será efectiva inmediatamente después de su publicación en nuestra página web. Te recomendamos revisar regularmente estos Términos y Condiciones para estar al tanto de cualquier cambio.</p>

        <h2>Ley Aplicable y Jurisdicción</h2>
        <p>Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país de tu jurisdicción. Cualquier disputa que surja en relación con estos Términos y Condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de esa jurisdicción.</p>

        <br />
        <button className='btn btn-outline-light' onClick={goBack}>Atrás</button>
      </div>
    </div>
  );
}

export default TerminosCondiciones;
