import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModificarDocente = ({ docente, onDocenteModificado }) => {
  const [nombre, setNombre] = useState(docente.nombre);
  const [apellido, setApellido] = useState(docente.apellido);
  const [email, setEmail] = useState(docente.email);
  const [carreras, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState(docente.id_carrera);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleModificar = () => {
    abrirModal();
  };

  const handleCancelar = () => {
    cerrarModal();
    resetForm();
  };

  const handleGuardar = () => {
    if (!nombre || !apellido || !email || !selectedCarrera) {
      setAlertaVisible(true);
      return;
    }

    const docenteModificado = {
      id: docente.id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      id_carrera: selectedCarrera
    };

    axios
      .put(`https://apilab-backend-sandbox.up.railway.app/modificarprofesor/${docente.id}`, docenteModificado)
      .then(response => {
        console.log('Docente modificado:', response.data);
        cerrarModal();
        resetForm();
        onDocenteModificado();
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
    setAlertaVisible(false);
  };

  const resetForm = () => {
    setNombre(docente.nombre);
    setApellido(docente.apellido);
    setEmail(docente.email);
    setSelectedCarrera(docente.id_carrera);
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
          <div className="modal-content border border-white" style={{ marginTop: '100px', height: '650px', background: 'linear-gradient(to right, #ffffff, #000000, rgb(0, 0, 0), rgb(0, 0, 0), rgb(0, 0, 0), rgb(0, 0, 0), rgb(0, 0, 0), rgb(0, 0, 0), #000000, #ffffff)' }}>
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
                  <div className="form-group mx-5 px-4">
                    <label className='fs-4' style={{ color: 'white' }}>Carrera:</label>
                    <select style={{ background: 'white', width: '300px', textAlign: 'center', margin: '0px 10px' }}
                      className="form-control"
                      value={selectedCarrera}
                      onChange={handleCarreraChange}
                    >
                      <option value="">Seleccione una carrera</option>
                      {carreras.map(carrera => (
                        <option key={carrera.id} value={carrera.id}>
                          {carrera.id}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              {alertaVisible && (
                <div className="alert alert-danger d-flex mx-5" role="alert">
                <svg className="text-center" width="24" height="24" role="img" aria-label="Danger:">
                  <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    No puedes dejar campos sin rellenar.
                  </div>
                </div>
              )}
              <div className="modal-footer mx-auto">
                <button type="button" className="btn btn-dark btn-md m-1 p-2" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" className="btn btn-dark btn-md m-1 p-2" onClick={handleCancelar}>
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
