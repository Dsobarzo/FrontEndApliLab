import '../ESTILOS/menu_administrador.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { obtenerLaboratorios, obtenerCarreras, obtenerDocentes, obtenerReservas } from '../CODE/actualizarDatos.js';
import ListadoLaboratorios from '../CODE/LABORATORIOS/verLab.js';
import ListadoCarreras from '../CODE/CARRERAS/verCar.js';
import ListadoDocentes from '../CODE/DOCENTES/verDoc.js';
import ListadoReservas from '../CODE/RESERVAS/verRes.js';

function MenuAdministrador() {

  const navigate = useNavigate();

  const [laboratorios, setLaboratorios] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [reservas, setReservas] = useState([]);
  

  //Laboratorios
  const handleLaboratorioAgregado = () => {
    obtenerDatos();
  };
  const handleLaboratorioModificado = () => {
    obtenerDatos();
  };
  const handleLaboratorioEliminado = () => {
    obtenerDatos();
  };

  //Carreras
  const handleCarreraAgregada = () => {
    obtenerDatos();
  };
  const handleCarreraModificada = () => {
    obtenerDatos();
  };
  const handleCarreraEliminada = () => {
    obtenerDatos();
  };

  //Docentes
  const handleDocenteAgregado = () => {
    obtenerDatos();
  };
  const handleDocenteModificado = () => {
    obtenerDatos();
  };
  const handleDocenteEliminado = () => {
    obtenerDatos();
  };

  //Reservas
  const handleReservaAgregada = () => {
    obtenerDatos();
  };
  const handleReservaModificada = () => {
    obtenerDatos();
  };

  useEffect(() => {
    const verificarAutenticacion = () => {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        navigate('/');
      }
    };

    const obtenerDatos = async () => {
      try {
        const laboratoriosData = await obtenerLaboratorios();
        const carrerasData = await obtenerCarreras();
        const docentesData = await obtenerDocentes();
        const reservasData = await obtenerReservas();

        setLaboratorios(laboratoriosData);
        setCarreras(carrerasData);
        setDocentes(docentesData);
        setReservas(reservasData);
      } catch (error) {
        console.error('//Error al obtener los datos:', error);
      }
    };

    verificarAutenticacion();
    obtenerDatos();
  }, [navigate, setLaboratorios,setCarreras, setDocentes,setReservas]);


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

  const obtenerDatos = async () => {
    try {
      const laboratoriosData = await obtenerLaboratorios();
      const carrerasData = await obtenerCarreras();
      const docentesData = await obtenerDocentes();
      const reservasData = await obtenerReservas();

      setLaboratorios(laboratoriosData);
      setCarreras(carrerasData);
      setDocentes(docentesData);
      setReservas(reservasData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  return (
    <div className='principal'>
      <div className='container bg-black bg-opacity-75'>
        <div className='cerrarSesion'>
          <div className="row">
            <div className="col">
              <h1 className='fs-2'>GESTIÓN DE RESERVAS DE LABORATORIOS</h1>
            </div>
            <div className="col-auto mb-3" style={{ textAlign: 'right' }}>
              <button id='btn_exit' className='btn btn-outline-light mx-5' onClick={cerrarSesion}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item bg-black bg-opacity-50">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                LABORATORIOS
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div>
                  <ListadoLaboratorios
                    onLaboratorioAgregado={handleLaboratorioAgregado}
                    onLaboratorioModificado={handleLaboratorioModificado}
                    onLaboratorioElimindado={handleLaboratorioEliminado}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item bg-black bg-opacity-50">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                CARRERAS
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div>
                  <ListadoCarreras
                    onCarreraAgregada={handleCarreraAgregada}
                    onCarreraModificada={handleCarreraModificada}
                    onCarreraElimindada={handleCarreraEliminada}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item bg-black bg-opacity-50">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                DOCENTES
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div>
                  <ListadoDocentes
                    onDocenteAgregado={handleDocenteAgregado}
                    onDocenteModificado={handleDocenteModificado}
                    onDocenteEliminado={handleDocenteEliminado}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item bg-black bg-opacity-50">
            <h2 className="accordion-header" id="headingFor">
              <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseFor' aria-expanded='false' aria-controls='collapseFor' data-bs-parent="#accordionExample">
                RESERVAS
              </button>
            </h2>
            <div id="collapseFor" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div>
                  <ListadoReservas
                  onReservaAgregada={handleReservaAgregada}
                  onReservaModificada={handleReservaModificada}
                  />
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

export default MenuAdministrador;