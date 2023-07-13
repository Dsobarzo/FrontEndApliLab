import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ListadoSoloReservas from '../CODE/RESERVAS/verSoloRes.js';

function MenuDocente() {
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

  // Verificar si el usuario ha iniciado sesión y tiene el rol de docente
  const authToken = Cookies.get('authToken');
  const rolUsuario = Cookies.get('rolUsuario');

  if (!authToken || rolUsuario !== 'docente') {
    // El usuario no ha iniciado sesión o no tiene el rol de docente, redirigir al inicio de sesión
    return navigate('/');
  }

  return (
    <div className='principal'>
      <div className='container'>
        <div className='cerrarSesion'>
          <button id='btn_exit' className='btn btn-outline-light' onClick={cerrarSesion}>Cerrar Sesión</button>
          <h1>LISTADO DE LABORATORIOS RESERVADOS</h1>
        </div>
        <div className='accordion' id='accordionExample'>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingOne'>
              <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                RESERVAS
              </button>
            </h2>
            <div id='collapseOne' className='accordion-collapse' aria-labelledby='headingOne'>
              <div className='accordion-body'>
                <div>
                  <ListadoSoloReservas />
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

export default MenuDocente;
