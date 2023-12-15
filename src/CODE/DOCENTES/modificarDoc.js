import React, { useState, useEffect } from 'react';
import { obtenerCarreras } from '../actualizarDatos.js';
import axios from 'axios';

const ModificarDocente = ({ docente, onDocenteModificado }) => {
  const [nombre, setNombre] = useState(docente.nombre);
  const [apellido, setApellido] = useState(docente.apellido);
  const [email, setEmail] = useState(docente.email);
  const [carreras, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState(docente.id_carrera);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertaVisible1, setAlertaVisible1] = useState(false);
  const [alertaVisible2, setAlertaVisible2] = useState(false);
  const [alertaDuplicidad, setAlertaDuplicidad] = useState(false);

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

  const handleModificar = () => {
    abrirModal();
  };

  const handleCancelar = () => {
    cerrarModal();
    resetForm();
  };

  const handleGuardar = async () => {
    // Validaciones iniciales
    if (!nombre || !apellido || !selectedCarrera) {
      setAlertaVisible1(true);
      setAlertaVisible2(false);
      setAlertaDuplicidad(false);
      return;
    }

    if (!validarEmail(email)) {
      setAlertaVisible1(false);
      setAlertaVisible2(true);
      setAlertaDuplicidad(false);
      return;
    }

    const docenteModificado = {
      id: docente.id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      id_carrera: selectedCarrera
    };
    if (docente.nombre != nombre) {
      console.log('distintos')
      // Obtener la lista de docentes existentes
      const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerprofesores');
      const docentesExist = response.data;

      // Verificar si el nuevo docente ya existe
      const docenteExistente = docentesExist.some(
        (docente) => docente.nombre === nombre && docente.apellido === apellido
      );

      if (docenteExistente) {
        setAlertaVisible1(false);
        setAlertaVisible2(false);
        setAlertaDuplicidad(true);
        return;
      } else {
        setAlertaDuplicidad(false);
      }
    } else {
      console.log('iguales')
    }



    axios
      .put(`https://apilab-backend-sandbox.up.railway.app/modificarprofesor/${docente.id}`, docenteModificado)
      .then(response => {
        console.log('Docente modificado:', response.data);
        cerrarModal();
        resetForm();
        onDocenteModificado();
        setAlertaVisible1(false);
        setAlertaVisible2(false);
        setAlertaDuplicidad(false);
      })
      .catch(error => {
        console.error('Error al modificar el docente:', error);
      });
  };

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setAlertaVisible1(false);
    setAlertaVisible2(false);
    setAlertaDuplicidad(false);
  };

  const resetForm = () => {
    setNombre((prevNombre) => prevNombre || '');
    setApellido((prevApellido) => prevApellido || '');
    setEmail((prevEmail) => prevEmail || '');
    setSelectedCarrera((prevSelectedCarrera) => prevSelectedCarrera);
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
    setSelectedCarrera(e.target.value);
  };

  return (
    <div>
      <button className="btn btn-warning btn-sm m-1 p-2" onClick={handleModificar}>
        Modificar
      </button>
      {modalVisible && (
        <div className="modal my-5" id="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content border border-white" style={{ height: '650px', background: 'rgb(35, 35, 35)' }}>
              <div className="modal-header">
                <h5 className="modal-title fs-3" style={{ color: 'white', marginLeft: '115px' }}>Modificar Docente</h5>
                <button type="button" className="close" aria-label="Cerrar" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleCancelar}>
                  <span className='fs-1' style={{ color: 'red', marginTop: '10px' }}>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group text-center">
                    <label className='fs-4' style={{ color: 'white' }}>Nombre:</label>
                    <input
                      type="text"
                      className="form-control  mx-auto"
                      value={nombre}
                      onChange={handleNombreChange}
                      maxLength={MAX_CARACTERES_NOMBRE}
                    />
                  </div>
                  <div className="form-group">
                    <label className='fs-4' style={{ color: 'white' }}>Apellido:</label>
                    <input
                      type="text"
                      className="form-control mx-auto"
                      value={apellido}
                      onChange={handleApellidoChange}
                      maxLength={MAX_CARACTERES_APELLIDO}
                    />
                  </div>
                  <div className="form-group">
                    <label className='fs-4' style={{ color: 'white' }}>Email:</label>
                    <input
                      type="text"
                      className="form-control mx-auto"
                      value={email}
                      onChange={handleEmailChange}
                      maxLength={MAX_CARACTERES_EMAIL}
                    />
                  </div>
                  <div className="form-group">
                    <label className='fs-4' style={{ color: 'white' }}>Carrera:</label>
                    <select
                      className="form-control  mx-auto"
                      value={selectedCarrera}
                      onChange={handleCarreraChange}
                      style={{ maxWidth: '300px', textAlign: 'center' }}
                    >
                      <option value="">Seleccione una carrera</option>
                      {carreras.map(carrera => (
                        <option key={carrera.id} value={carrera.id}>
                          {carrera.carrera}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
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
              {alertaDuplicidad && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>El Docente ya existe.</div>
                </div>
              )}
              <div className="modal-footer mx-auto">
                <button type="button" className="btn btn-dark btn-md m-1 p-2 border-white" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" className="btn btn-dark btn-md m-1 p-2 border-white" onClick={handleCancelar}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModificarDocente;
