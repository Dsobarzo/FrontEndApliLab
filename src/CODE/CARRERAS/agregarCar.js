import React, { useState } from 'react';
import axios from 'axios';

const AgregarCarrera = ({ onCarreraAgregada }) => {
  const [nombreCarrera, setNombreCarrera] = useState('');

  const MAX_CARACTERES = 30;

  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleAgregar = () => {
    if (!nombreCarrera) {
      setAlertaVisible(true);
      return;
    }

    const carrera = {
      carrera: nombreCarrera
    };

    axios
      .post('https://apilab-backend-sandbox.up.railway.app/guardarcarrera', carrera)
      .then(response => {
        console.log('Carrera agregada:', response.data);
        onCarreraAgregada(); // Actualiza los datos
        setNombreCarrera('');
        setAlertaVisible(false);
      })
      .catch(error => {
        console.error('Error al agregar la carrera:', error);
      });
  };

  const handleNombreCarreraChange = (e) => {
    const value = e.target.value.slice(0, MAX_CARACTERES);
    setNombreCarrera(value);
  };

  return (
    <div>
      <form>
      <h2 className='text-left fs-3' style={{ color: 'white'}} >AGREGAR CARRERA</h2>
        <div className='form-group p-2'>
          <label className='fs-4'>Nombre:</label>
          <input
            type='text'
            className='form-control'
            style={{ textAlign: 'left', maxWidth: '10px' }}
            value={nombreCarrera}
            onChange={handleNombreCarreraChange}
            maxLength={MAX_CARACTERES}
          />
        </div>
        <div className='d-grid col-8 mx-4'>
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

export default AgregarCarrera;
