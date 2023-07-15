import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgregarDocente = ({ onDocenteAgregado }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [alertaVisible, setAlertaVisible] = useState(false);

  const MAX_CARACTERES_NOMBRE = 30;
  const MAX_CARACTERES_APELLIDO = 30;
  const MAX_CARACTERES_EMAIL = 50;

  useEffect(() => {
    obtenerCarreras();
  }, []);

  const obtenerCarreras = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenercarreras')
      .then(response => {
        setCarreras(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las carreras:', error);
      });
  };

  const handleAgregar = () => {
    if (!nombre || !apellido || !email || !selectedCarrera) {
      setAlertaVisible(true);
      return;
    }

    const docente = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      id_carrera: selectedCarrera
    };

    axios
      .post('https://apilab-backend-sandbox.up.railway.app/guardarprofesor', docente)
      .then(response => {
        console.log('Docente agregado:', response.data);
        onDocenteAgregado();
        setNombre('');
        setApellido('');
        setEmail('');
        setSelectedCarrera('');
        setAlertaVisible(false);
      })
      .catch(error => {
        console.error('Error al agregar el docente:', error);
      });
  };

  const handleNombreChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_NOMBRE);
    setNombre(value);
  };

  const handleApellidoChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_APELLIDO);
    setApellido(value);
  };

  const handleEmailChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_EMAIL);
    setEmail(value);
  };

  const handleCarreraChange = e => {
    const value = e.target.value;
    setSelectedCarrera(value);
  };

  return (
    <div>
      <form><br/>
      <h2 className='text-left fs-3' style={{ color: 'white'}} >AGREGAR LABORATORIO</h2>
        <div className='form-group p-2'>
          <label className='fs-4'>Nombre:</label>
          <input
            type='text'
            className='form-control'
            style={{ maxWidth: '10px' }}
            value={nombre}
            onChange={handleNombreChange}
            maxLength={MAX_CARACTERES_NOMBRE}
          />
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Apellido:</label>
          <input
            type='text'
            className='form-control'
            style={{ maxWidth: '10px' }}
            value={apellido}
            onChange={handleApellidoChange}
            maxLength={MAX_CARACTERES_APELLIDO}
          />
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Email:</label>
          <input
            type='email'
            className='form-control'
            style={{ maxWidth: '10px' }}
            value={email}
            onChange={handleEmailChange}
            maxLength={MAX_CARACTERES_EMAIL}
          />
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Carrera:</label>
          <select
            className='form-control'
            style={{ maxWidth: '180px' }}
            value={selectedCarrera}
            onChange={handleCarreraChange}
          >
            <option value=''>Seleccionar carrera</option>
            {carreras.map(carrera => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.id}
              </option>
            ))}
          </select>
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

export default AgregarDocente;
