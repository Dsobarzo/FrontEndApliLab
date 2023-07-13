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
        cerrarModal();
        resetForm();
        onCarreraModificada();
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
    setNombre(carrera.carrera);
  };

  const handleNombreChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_NOMBRE);
    setNombre(value);
  };

  return (
    <div>
      <button className="btn btn-warning m-1" onClick={handleModificar}>
        Modificar
      </button>
      {modalVisible && (
        <div className="modal" id="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: 'black' }}>Modificar Carrera</h5>
                <button type="button" className="close" onClick={handleCancelar}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nombre}
                      onChange={handleNombreChange}
                      maxLength={MAX_CARACTERES_NOMBRE}
                    />
                  </div>
                </form>
              </div>
              {alertaVisible && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    No puedes dejar el campo en blanco.
                  </div>
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleGuardar}>
                  Guardar
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
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
