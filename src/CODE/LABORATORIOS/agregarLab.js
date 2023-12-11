import React, { useState } from 'react';
import axios from 'axios';

const AgregarLaboratorio = ({ onLaboratorioAgregado }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [capacidad, setCapacidad] = useState('');

  const MAX_CARACTERES_NOMBRE = 30;
  const MAX_CARACTERES_UBICACION = 30;
  const MAX_DIGITOS_CAPACIDAD = 3;

  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleAgregar = () => {
    if (!nombre || !ubicacion || !capacidad) {
      setAlertaVisible(true);
      return;
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
    if (value < 0) {
      value = '';
    } else if (value.length > MAX_DIGITOS_CAPACIDAD) {
      value = value.slice(0, MAX_DIGITOS_CAPACIDAD);
    }
    setCapacidad(value);
  };

  return (
    <div style={{ width: '320px'}}>
      <h2 className='text-center fs-3 my-4' style={{ color: 'white' }} >AGREGAR LABORATORIO</h2>
      <form>
        <div className='form-group p-2' style={{ width: '100%'}}>
          <label className='fs-4'>Nombre:</label>
          <input
            type='text'
            className='form-control'
            style={{ width: '100%' }}
            value={nombre}
            onChange={handleNombreChange}
            maxLength={MAX_CARACTERES_NOMBRE}
          />
        </div>
        <div className='form-group p-2' style={{ width: '100%'}}>
          <label className='fs-4'>Ubicación:</label>
          <input
            type='text'
            className='form-control'
            style={{ width: '100%' }}
            value={ubicacion}
            onChange={handleUbicacionChange}
            maxLength={MAX_CARACTERES_UBICACION}
          />
        </div>
        <div className='form-group p-2' style={{ width: '100%'}}>
          <label className='fs-4'>Capacidad:</label>
          <input
            type='number'
            className='form-control'
            style={{ width: '100%' }}
            value={capacidad}
            onChange={handleCapacidadChange}
            min={0}
            max={Math.pow(10, MAX_DIGITOS_CAPACIDAD) - 1}
          />
        </div>
        <div className='col-8' style={{ textAlign: 'center', width: '100%'}}>
          <button
            type='button'
            className='btn btn-dark'
            onClick={handleAgregar}
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
    </div>
  );
};

export default AgregarLaboratorio;