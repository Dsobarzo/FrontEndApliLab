import React, { useState, useEffect } from 'react';
import { obtenerDocentes, obtenerLaboratorios, actualizarReservas } from '../actualizarDatos.js';
import axios from 'axios';

const AgregarReserva = ({ onReservaAgregada }) => {
  const [laboratorio, setLaboratorio] = useState('');
  const [docente, setDocente] = useState('');
  const [fecha, setFecha] = useState('');
  const [bloque, setBloque] = useState('');
  const [laboratorios, setLaboratorios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [errorFechaPasada, setErrorFechaPasada] = useState(false);

  useEffect(() => {
    obtenerDatosLaboratorios();
    obtenerDatosDocentes();
  }, []);

  //Obtener listado de laboratorios
  const obtenerDatosLaboratorios = async () => {
    try {
      const laboratoriosData = await obtenerLaboratorios();
      setLaboratorios(laboratoriosData);
    } catch (error) {
      console.error('//Error al obtener los laboratorios:', error);
    }
  };

  //Obtener listado de Profesores
  const obtenerDatosDocentes = async () => {
    try {
      const docentesData = await obtenerDocentes();
      setDocentes(docentesData);
    } catch (error) {
      console.error('//Error al obtener los docentes:', error);
    }
  };

  const handleReservaAgregada = () => {
    if (!laboratorio || !docente || !fecha || !bloque) {
      setAlertaVisible(true);
      return;
    }

    // Verificacion de fecha pasada
    const fechaActual = new Date();
    const fechaReserva = new Date(fecha);

    if (fechaReserva < fechaActual - 1) {
      setErrorFechaPasada(true);
      return;
    } else {
      setErrorFechaPasada(false);
    }

    const reserva = {
      id_laboratorios: laboratorio,
      id_profesores: docente,
      fecha_reserva: fecha,
      bloque: bloque,
      estado: true,
    };

    //Guardar nueva reserva
    axios
      .post('https://apilab-backend-sandbox.up.railway.app/guardarreserva', reserva)
      .then(response => {
        console.log('Reserva agregada:', response.data);
        onReservaAgregada(); // Actualiza los datos
        actualizarReservas();
        setLaboratorio('');
        setDocente('');
        setFecha('');
        setBloque('');
        setAlertaVisible(false);

        const docenteSeleccionado = docentes.find((doc) => doc.id === parseInt(docente));

      // Verificar que haya un docente seleccionado y un correo asociado
      if (docenteSeleccionado) {

        const nombreDocente = `${docenteSeleccionado.nombre} ${docenteSeleccionado.apellido}`;
        const laboratorioSeleccionado = laboratorios.find((lab) => lab.id === parseInt(laboratorio));

        let estadoNuevo = '';
        const estado = true;

        if (estado) {
          estadoNuevo = 'Activo';
        } else {
          estadoNuevo = 'Inactivo';
        }

        const mensajeReserva = `
        Estimado/a ${nombreDocente},

        Le informamos que se ha agregado una reserva de laboratorio con el siguiente detalle:
        
        - Nombre del Docente: ${nombreDocente}
        - Nombre del Laboratorio: ${laboratorioSeleccionado.nombre}
        - Fecha de la Reserva: ${fecha}
        - Bloque: ${bloque}
        - Estado de la Reserva: ${estadoNuevo}

        Para comprobar los datos de su reserva, puede ingresar al siguiente link:
        https://frontendaplilab-production.up.railway.app/

        Gracias,
        Sistema de Reserva de Laboratorios
        `;
        enviarNotificacionPorCorreo([docenteSeleccionado.email], 'Nueva Reserva de Laboratorio', mensajeReserva);
      } else {
        // En el de que no se haya seleccionado un docente
        console.warn('Por favor, seleccione un docente antes de agendar la reserva.');
      }

      })
      .catch(error => {
        console.error('Error al agregar la reserva:', error);
      });
  };

  const handleLaboratorioChange = e => {
    obtenerLaboratorios();
    setLaboratorio(e.target.value);
  };

  const handleDocenteChange = e => {
    const docenteId = e.target.value;
    setDocente(docenteId);
    
  };

  const handleFechaChange = e => {
    setFecha(e.target.value);
  };

  const handleBloqueChange = e => {
    setBloque(e.target.value);
  };

  async function enviarNotificacionPorCorreo(destinatarios, asunto, mensaje) {
    try {
      // Endpoint Notificaciones
      const urlServicioExterno = 'https://mailnotification.onrender.com/v1/notificacion';
  
      // Datos del correo electrónico
      const datosCorreo = {
        toUser: destinatarios,
        subject: asunto,
        message: mensaje,
      };
  
      // Solicitud POST
      const respuesta = await axios.post(urlServicioExterno, datosCorreo);
      console.log(respuesta)
  
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error('Error al enviar la notificación por correo electrónico:', error.message);
    }
  }

  return (
    <div>
      <form>
        <br />
        <h2 className='text-left fs-3' style={{ color: 'white' }}>AGREGAR RESERVA</h2>
        <div className='form-group p-2'>
          <label className='fs-4'>Laboratorio:</label>
          <select
            className='form-control'
            style={{ maxWidth: '180px' }}
            value={laboratorio}
            onClick={obtenerDatosLaboratorios}
            onChange={handleLaboratorioChange}
          >
            <option value=''>Seleccion laboratorio</option>
            {laboratorios.map(lab => (
              <option key={lab.id} value={lab.id}>
                {lab.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Docente:</label>
          <select 
          className='form-control'  
          style={{ maxWidth: '180px' }}
          value={docente} 
          onClick={obtenerDatosDocentes}
          onChange={handleDocenteChange}
          >
            <option value=''>Seleccion docente</option>
            {docentes.map(docente => (
              <option key={docente.id} value={docente.id}>
                {docente.nombre + " " + docente.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Bloque:</label>
          <select 
          className='form-control' 
          style={{ maxWidth: '180px' }}
          value={bloque} 
          onChange={handleBloqueChange}>
            <option value=''>Seleccion bloque</option>
            <option value='1er Bloque'>1er Bloque [07:50 - 09:20]</option>
            <option value='2do Bloque'>2do Bloque [09:30 - 11:00]</option>
            <option value='3er Bloque'>3er Bloque [11:10 - 12:40]</option>
            <option value='4to Bloque'>4to Bloque [12:50 - 14-20]</option>
            <option value='5to Bloque'>5to Bloque [14:30 - 16:00]</option>
            <option value='6to Bloque'>6to Bloque [16:10 - 17:40]</option>
            <option value='7mo Bloque'>7mo Bloque [17:50 - 19:20]</option>
          </select>
        </div >
        <div className='form-group p-2'>
          <label className='fs-4'>Fecha:</label>
          <input 
          type='date' 
          className='form-control' 
          style={{ maxWidth: '180px' }}
          value={fecha} 
          onChange={handleFechaChange} />
        </div>
        <div className='d-grid col-8 mx-4'>
          <button type='button' className='btn btn-dark mt-5' onClick={handleReservaAgregada}>
            Agregar
          </button>
        </div>
      </form>
      {alertaVisible && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>Por favor, complete todos los campos.</div>
        </div>
      )}
      {errorFechaPasada && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>No se puede reservar en una fecha pasada.</div>
        </div>
      )}
    </div>
  );
};

export default AgregarReserva;