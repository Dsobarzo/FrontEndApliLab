import React, { useState } from 'react';
import axios from 'axios';

const AgregarCarrera = ({ onCarreraAgregada }) => {
  const [nombreCarrera, setNombreCarrera] = useState('');

  const MAX_CARACTERES = 30;

  const handleAgregar = () => {
    if (!nombreCarrera) {
      return;
    }

    const carrera = {
      carrera: nombreCarrera
    };

    axios
      .post('https://apilab-backend-sandbox.up.railway.app/guardarcarrera', carrera)
      .then(response => {
        console.log('Carrera agregada:', response.data);
        onCarreraAgregada();
        setNombreCarrera('');
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
        <div className='form-group'>
          <label>Nombre de la carrera:</label>
          <input
            type='text'
            className='form-control'
            value={nombreCarrera}
            onChange={handleNombreCarreraChange}
            maxLength={MAX_CARACTERES}
          />
        </div>
        <button type='button' className='btn btn-primary' onClick={handleAgregar}>
          Agregar Carrera
        </button>
      </form>
    </div>
  );
};

export default AgregarCarrera;
