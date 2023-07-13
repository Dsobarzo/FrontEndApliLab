import '../ESTILOS/menu_administrador.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ListadoLaboratorios from '../CODE/LABORATORIOS/verLab.js';
import ListadoCarreras from '../CODE/CARRERAS/verCar.js';
import ListadoDocentes from '../CODE/DOCENTES/verDoc.js';
import ListadoReservas from '../CODE/RESERVAS/verRes.js';

function MenuAdministrador() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      // El usuario no ha iniciado sesión, redirigir al inicio de sesión
      navigate('/');
    }
  }, [navigate]);

  const cerrarSesion = () => {
    // Eliminar la cookie de sesión
    Cookies.remove('authToken');
    // Redirigir al inicio de sesión
    navigate('/');
  };

  // Verificar si el usuario ha iniciado sesión
  const authToken = Cookies.get('authToken');

  if (!authToken) {
    // El usuario no ha iniciado sesión, redirigir al inicio de sesión
    return navigate('/');
  }

  return (
    <div className='principal'>
      <div className='container'>
        <div className='cerrarSesion'>
          <button id='btn_exit' className='btn btn-outline-light' onClick={cerrarSesion}>Cerrar Sesión</button>
          <h1>GESTIÓN DE LABORATORIOS</h1>
        </div>
        <div className='accordion' id='accordionExample'>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingOne'>
              <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                LABORATORIOS
              </button>
            </h2>
            <div id='collapseOne' className='accordion-collapse collapse' aria-labelledby='headingOne'>
              <div className='accordion-body'>
                <div>
                  <ListadoLaboratorios />
                </div>
              </div>
            </div>
          </div>


          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingTwo'>

              <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>
                CARRERAS
              </button>
            </h2>
            <div id='collapseTwo' className='accordion-collapse collapse' aria-labelledby='headingTwo'>
              <div className='accordion-body'>
                <div>
                  <ListadoCarreras />
                </div>
              </div>
            </div>
          </div>


          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingThree'>
              <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>
                DOCENTES
              </button>
            </h2>
            <div id='collapseThree' className='accordion-collapse collapse' aria-labelledby='headingThree'>
              <div className='accordion-body'>
                <div>
                  <ListadoDocentes />
                </div>
              </div>
            </div>
          </div>

          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingFor'>
              <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseFor' aria-expanded='false' aria-controls='collapseFor'>
                RESERVAS
              </button>
            </h2>
            <div id='collapseFor' className='accordion-collapse collapse' aria-labelledby='headingFor'>
              <div className='accordion-body'>
                <div>
                  <ListadoReservas />
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <br />
        
      </div>
      <div className='footer footer-container'>
          <p> <i>Todos los derechos reservados © 2023 Universidad de Magallanes</i> </p>
          <p>Rodrigo Romero Alvarado - Diego Sobarzo Obando</p>
          <Link to='/term_cond'>Términos y Condiciones</Link>
        </div>
    </div>
  );
}

export default MenuAdministrador;
