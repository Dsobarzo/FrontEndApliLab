import React, { useState } from 'react';
import axios from 'axios';

const ModificarCarrera = ({ carrera, onCarreraModificada }) => {
  const [nombre, setNombre] = useState(carrera.carrera);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);

  const MAX_CARACTERES_NOMBRE = 30;

  const handleModificar = () => {
    abrirModal();
  };

  const handleCancelar = () => {
    cerrarModal();
    resetForm();
  };

  const handleGuardar = () => {
    if (!nombre) {
      setAlertaVisible(true);
      return;
    }

    const carreraModificada = {
      carrera: nombre
    };

    axios
      .put(`https://apilab-backend-sandbox.up.railway.app/modificarcarrera/${carrera.id}`, carreraModificada)
      .then(response => {
        console.log('Carrera modificada:', response.data);
        onCarreraModificada(); // Actualiza los datos
        cerrarModal();
        resetForm();
      })
      .catch(error => {
        console.error('Error al modificar la carrera:', error);
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
    setNombre((prevNombre) => prevNombre);
  };
  

  const handleNombreChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_NOMBRE);
    setNombre(value);
  };

  return (
    <div>
      <button className="btn btn-warning btn-sm m-1 p-2" onClick={handleModificar}>
        Modificar
      </button>
      {modalVisible && (
        <div className="modal my-5" id="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
          <div className="modal-content border border-white" style={{ marginTop: '150px', height: '500px', background: 'rgb(35, 35, 35)' }}>
              <div className="modal-header">
                <h5 className="modal-title fs-3" style={{ color: 'white', marginLeft: '115px' }}>Modificar Carrera</h5>
                <button type="button" className="close" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleCancelar}>
                  <span className='fs-1' style={{ color: 'red', marginTop: '10px' }}>&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <form>
                  <div className="form-group">
                    <label className='fs-4 mb-3' style={{ color: 'white' }}>Nombre:</label>
                    <input
                      type="text"
                      className="form-control  mx-auto"
                      value={nombre}
                      onChange={handleNombreChange}
                      maxLength={MAX_CARACTERES_NOMBRE}
                    />
                  </div>
                </form>
              </div>
              {alertaVisible && (
                <div className="alert alert-danger d-flex mx-5" role="alert">
                <svg className="text-center" width="24" height="24" role="img" aria-label="Danger:">
                  <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    No puedes dejar el campo en blanco.
                  </div>
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

export default ModificarCarrera;
