import React, { useState } from 'react';
import axios from 'axios';

const AgregarCarrera = ({ onCarreraAgregada }) => {
  const [nombreCarrera, setNombreCarrera] = useState('');
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaDuplicidad, setAlertaDuplicidad] = useState(false);

  const MAX_CARACTERES = 30;

  const handleAgregar = async () => {
    if (!nombreCarrera) {
      setAlertaVisible(true);
      return;
    }

    // Obtener la lista de carreras existentes
    const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenercarreras');
    const carrerasExist = response.data;

    // Verificar si la nueva carrera ya existe
    const carreraExistente = carrerasExist.find(
      (carrera) => carrera.carrera === nombreCarrera
    );

    if (carreraExistente) {
      setAlertaDuplicidad(true);
      setAlertaVisible(false);
      return;
    } else {
      setAlertaDuplicidad(false);
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
      <form style={{ width: '100%' }}><br />
        <h2 className='text-left fs-3' style={{ color: 'white' }} >AGREGAR CARRERA</h2>
        <div className='form-group p-2'>
          <label className='fs-4'>Nombre:</label>
          <input
            type='text'
            className='form-control'
            style={{ textAlign: 'left', maxWidth: '100%' }}
            value={nombreCarrera}
            onChange={handleNombreCarreraChange}
            maxLength={MAX_CARACTERES}
          />
        </div>
        <div className='form-group p-2'>
          <button
            type='button'
            className='btn btn-dark my-5 mx-4'
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
          <div>Por favor, complete todos los campos.</div>
        </div>
      )}
      {alertaDuplicidad && (
        <div className="alert alert-danger d-flex align-items-center text-center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>
            La carrera ya existe.
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarCarrera;
