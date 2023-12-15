import React, { useState } from 'react';
import axios from 'axios';

const AgregarLaboratorio = ({ onLaboratorioAgregado }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaDuplicidad, setAlertaDuplicidad] = useState(false);

  const MAX_CARACTERES_NOMBRE = 30;
  const MAX_CARACTERES_UBICACION = 30;
  const MAX_DIGITOS_CAPACIDAD = 3;

  const handleAgregar = async () => {
    if (!nombre || !ubicacion || !capacidad) {
      setAlertaVisible(true);
      return;
    }

    // Obtener la lista de laboratorio existentes
    const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerlaboratorios');
    const laboratoriosExist = response.data;

    // Verificar si el nuevo docente ya existe
    const laboratorioExistente = laboratoriosExist.find(
      (laboratorio) => laboratorio.nombre === nombre
    );

    if (laboratorioExistente) {
      setAlertaDuplicidad(true);
      setAlertaVisible(false);
      return;
    } else {
      setAlertaDuplicidad(false);
    }

    const laboratorio = {
      nombre: nombre,
      ubicacion: ubicacion,
      capacidad: parseInt(capacidad)
    };

    axios
      .post('https://apilab-backend-sandbox.up.railway.app/guardarlaboratorio', laboratorio)
      .then(response => {
        console.log('Laboratorio agregado:', response.data);
        onLaboratorioAgregado(); // Actualiza los datos
        setNombre('');
        setUbicacion('');
        setCapacidad('');
        setAlertaVisible(false);
      })
      .catch(error => {
        console.error('Error al agregar el laboratorio:', error);
      });
  };

  const handleNombreChange = (e) => {
    const value = e.target.value.slice(0, MAX_CARACTERES_NOMBRE);
    setNombre(value);
  };

  const handleUbicacionChange = (e) => {
    const value = e.target.value.slice(0, MAX_CARACTERES_UBICACION);
    setUbicacion(value);
  };

  const handleCapacidadChange = (e) => {
    let value = e.target.value;
    if (value < 1) {
      value = '';
    } else if (value.length > MAX_DIGITOS_CAPACIDAD) {
      value = value.slice(1, MAX_DIGITOS_CAPACIDAD);
    }
    setCapacidad(value);
  };

  return (
    <div>
      <form style={{ width: '100%' }}><br />
        <h2 className='text-left fs-3' style={{ color: 'white' }} >AGREGAR LABORATORIO</h2>
        <div className='form-group p-2'>
          <label className='fs-4'>Nombre:</label>
          <input
            type='text'
            className='form-control'
            style={{ textAlign: 'left', width: '100%' }}
            value={nombre}
            onChange={handleNombreChange}
            maxLength={MAX_CARACTERES_NOMBRE}
          />
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Ubicación:</label>
          <select
            className='form-control'
            style={{ maxWidth: '100%' }}
            value={ubicacion}
            onChange={handleUbicacionChange}
          >
            <option value="">Seleccionar piso</option>
            <option value="2do piso">2do piso</option>
            <option value="3er piso">3er piso</option>
          </select>
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Capacidad:</label>
          <input
            type='number'
            className='form-control'
            style={{ width: '100%' }}
            value={capacidad}
            onChange={handleCapacidadChange}
            min={1}
            max={Math.pow(10, MAX_DIGITOS_CAPACIDAD) - 1}
          />
        </div>
        <div className='form-group p-2'>
          <button
            type='button'
            className='btn btn-dark mt-5  mx-4'
            onClick={handleAgregar}
            style={{ minWidth: '80%' }}
          >
            Agregar
          </button>
        </div>
      </form>
      {alertaVisible && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>
            Por favor, complete todos los campos.
          </div>
        </div>
      )}
      {alertaDuplicidad && (
        <div className="alert alert-danger d-flex align-items-center text center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>
            El laboratorio ya existe.
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarLaboratorio;