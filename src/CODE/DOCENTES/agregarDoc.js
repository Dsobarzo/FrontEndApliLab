import React, { useState, useEffect } from 'react';
import { obtenerCarreras } from '../actualizarDatos.js';
import axios from 'axios';

const AgregarDocente = ({ onDocenteAgregado }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [alertaVisible1, setAlertaVisible1] = useState(false);
  const [alertaVisible2, setAlertaVisible2] = useState(false);
  const [alertaVisible3, setAlertaVisible3] = useState(false);

  const MAX_CARACTERES_NOMBRE = 30;
  const MAX_CARACTERES_APELLIDO = 30;
  const MAX_CARACTERES_EMAIL = 50;

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const carrerasData = await obtenerCarreras();
      setCarreras(carrerasData);
    } catch (error) {
      console.error('//Error al obtener las carreras:', error);
    }
  };

  const validarEmail = (email) => {
    // Expresión regular para validar un correo electrónico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAgregar = async () => {
    // Validaciones iniciales
    if (!nombre || !apellido || !selectedCarrera) {
      setAlertaVisible1(true);
      setAlertaVisible2(false);
      setAlertaVisible3(false);
      return;
    }

    if (!validarEmail(email)) {
      setAlertaVisible1(false);
      setAlertaVisible2(true);
      setAlertaVisible3(false);
      return;
    }

    // Obtener la lista de docentes existentes
    const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerprofesores');
    const docentesExist = response.data;

    // Verificar si el nuevo docente ya existe
    const docenteExistente = docentesExist.find(
      (docente) => docente.nombre === nombre && docente.apellido === apellido
    );

    if (docenteExistente) {
      setAlertaVisible1(false);
      setAlertaVisible2(false);
      setAlertaVisible3(true);
      return;
    }

    // Si el docente no existe, proceder a agregarlo
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
        onDocenteAgregado(); // Actualiza los datos
        setNombre('');
        setApellido('');
        setEmail('');
        setSelectedCarrera('');
        setAlertaVisible1(false);
        setAlertaVisible2(false);
        setAlertaVisible3(false);
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

  const handleCarreraChange = async e => {
    const value = e.target.value;
    setSelectedCarrera(value);

    try {
      // Actualizar listado de carreras
      await obtenerDatos();
    } catch (error) {
      console.error('Error al obtener las carreras después de cambiar la selección:', error);
    }
  };

  return (
    <div>
      <form style={{ width: '100%' }}><br />
        <h2 className='text-left fs-3' style={{ color: 'white' }} >AGREGAR DOCENTE</h2>
        <div className='form-group p-2'>
          <label className='fs-4'>Nombre:</label>
          <input
            type='text'
            className='form-control'
            style={{ textAlign: 'left', maxWidth: '100%' }}
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
            style={{ textAlign: 'left', maxWidth: '100%' }}
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
            style={{ textAlign: 'left', maxWidth: '100%' }}
            value={email}
            onChange={handleEmailChange}
            maxLength={MAX_CARACTERES_EMAIL}
          />
        </div>
        <div className='form-group p-2'>
          <label className='fs-4'>Carrera:</label>
          <select
            className='form-control'
            style={{ maxWidth: '100%' }}
            value={selectedCarrera}
            onClick={obtenerDatos}
            onChange={handleCarreraChange}
          >
            <option value=''>Seleccionar carrera</option>
            {carreras.map(carrera => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.carrera}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group p-2'>
          <button
            type='button'
            className='btn btn-dark mt-5 mx-4'
            onClick={handleAgregar}
            style={{ minWidth: '80%' }}
          >
            Agregar
          </button>
        </div>
      </form>
      {alertaVisible1 && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>Por favor, complete todos los campos.</div>
        </div>
      )}
      {alertaVisible2 && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>Por favor, ingrese un email valido.</div>
        </div>
      )}
      {alertaVisible3 && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg width="24" height="24" role="img" aria-label="Danger:">
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>El Docente ya existe.</div>
        </div>
      )}
    </div>
  );
};

export default AgregarDocente;
