import '../ESTILOS/menu_docente.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ListadoSoloReservas from '../CODE/RESERVAS/verSoloRes.js';

function MenuDocente() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el usuario ha iniciado sesión
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      // El usuario no ha iniciado sesión, redirige al inicio de sesión
      navigate('/');
    }
  }, [navigate]);

  const cerrarSesion = () => {
    // Eliminar la cookie de sesión
    Cookies.remove('authToken');
    // Redirige al inicio de sesión
    navigate('/');
  };

  // Verifica si el usuario ha iniciado sesión y tiene el rol de docente
  const authToken = Cookies.get('authToken');
  const rolUsuario = Cookies.get('rolUsuario');

  if (!authToken || rolUsuario !== 'docente') {
    // El usuario no ha iniciado sesión o no tiene el rol de docente, redirige al inicio de sesión
    return navigate('/');
  }

  return (
    <div className='principal'>
      <div className='container bg-black bg-opacity-75'>
        <div className='cerrarSesion mb-4'>
          <div className="row align-items-center">
            <div className="col">
              <h1>LISTADO DE LABORATORIOS RESERVADOS</h1>
            </div>
            <div className="col-auto" style={{ marginLeft: '245px'}}>
              <button className='btn btn-outline-light' onClick={cerrarSesion}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <div className='accordion' id='accordionExample'>
          <div className='accordion-item bg-black bg-opacity-50'>
            <h2 className='accordion-header' id='headingOne'>
              <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                RESERVAS
              </button>
            </h2>
            <div id='collapseOne' className='accordion-collapse collapse' aria-labelledby='headingOne'>
              <div className='accordion-body'>
                <div>
                  <ListadoSoloReservas />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br />
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
