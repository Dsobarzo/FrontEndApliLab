import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgregarReserva = ({ onReservaAgregada }) => {
  const [laboratorio, setLaboratorio] = useState('');
  const [docente, setDocente] = useState('');
  const [fecha, setFecha] = useState('');
  const [bloque, setBloque] = useState('');
  const [laboratorios, setLaboratorios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);

  useEffect(() => {
    obtenerLaboratorios();
    obtenerDocentes();
  }, []);

  const obtenerLaboratorios = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenerlaboratorios')
      .then(response => {
        console.log('Laboratorios obtenidos:', response.data);
        setLaboratorios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los laboratorios:', error);
      });
  };

  const obtenerDocentes = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenerprofesores')
      .then(response => {
        console.log('Docentes obtenidos:', response.data);
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los docentes:', error);
      });
  };

  const handleAgregar = () => {
    if (!laboratorio || !docente || !fecha || !bloque) {
      setAlertaVisible(true);
      return;
    }

    // Verificar si la fecha seleccionada es una fecha pasada
    const fechaActual = new Date();
    const fechaReserva = new Date(fecha);

    if (fechaReserva < fechaActual) {
      console.error('No se puede reservar en una fecha pasada');
      return;
    }

    const reserva = {
      id_laboratorios: laboratorio,
      id_profesores: docente,
      fecha_reserva: fecha,
      bloque: bloque,
      estado: true
    };

    axios
      .post('https://apilab-backend-sandbox.up.railway.app/guardarreserva', reserva)
      .then(response => {
        console.log('Reserva agregada:', response.data);
        onReservaAgregada();
        setLaboratorio('');
        setDocente('');
        setFecha('');
        setBloque('');
        setAlertaVisible(false);
      })
      .catch(error => {
        console.error('Error al agregar la reserva:', error);
      });
  };

  const handleLaboratorioChange = e => {
    setLaboratorio(e.target.value);
  };

  const handleDocenteChange = e => {
    setDocente(e.target.value);
  };

  const handleFechaChange = e => {
    setFecha(e.target.value);
  };

  const handleBloqueChange = e => {
    setBloque(e.target.value);
  };

  return (
    <div>
      <form>
      <br/>
        <p className='fs-2 text-center'>RESERVAR</p>
        <div className='form-group p-2'>
          <label className='fs-4'>Laboratorio:</label>
          <select className='form-control' value={laboratorio} onChange={handleLaboratorioChange}>
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
          <select className='form-control'  value={docente} onChange={handleDocenteChange}>
            <option value=''>Seleccion docente</option>
            {docentes.map(docente => (
              <option key={docente.id} value={docente.id}>
                {docente.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Bloque:</label>
          <select className='form-control' value={bloque} onChange={handleBloqueChange}>
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
          <input type='date' className='form-control' value={fecha} onChange={handleFechaChange} />
        </div>
        <div className='d-grid col-8 mx-auto'>
        <button type='button' className='btn btn-dark mt-5' onClick={handleAgregar}>
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
    </div>
  );
};

export default AgregarReserva;
