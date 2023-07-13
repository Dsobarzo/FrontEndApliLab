import React, { useState } from 'react';
import axios from 'axios';

const ModificarLaboratorio = ({ laboratorio, onLaboratorioModificado }) => {
  const [nombre, setNombre] = useState(laboratorio.nombre);
  const [ubicacion, setUbicacion] = useState(laboratorio.ubicacion);
  const [capacidad, setCapacidad] = useState(laboratorio.capacidad || 0);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);

  const MAX_CARACTERES_NOMBRE = 30;
  const MAX_CARACTERES_UBICACION = 30;
  const MAX_DIGITOS_CAPACIDAD = 3;

  const handleModificar = () => {
    abrirModal();
  };

  const handleCancelar = () => {
    cerrarModal();
    resetForm();
  };

  const handleGuardar = () => {
    if (!nombre || !ubicacion || !capacidad) {
      setAlertaVisible(true);
      return;
    }

    const laboratorioModificado = {
      id: laboratorio.id,
      nombre: nombre,
      ubicacion: ubicacion,
      capacidad: capacidad,
    };

    axios
      .put(`https://apilab-backend-sandbox.up.railway.app/modificarlaboratorio/${laboratorio.id}`, laboratorioModificado)
      .then(response => {
        console.log('Laboratorio modificado:', response.data);
        cerrarModal();
        resetForm();
        onLaboratorioModificado();
      })
      .catch(error => {
        console.error('Error al modificar el laboratorio:', error);
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
    setNombre(laboratorio.nombre);
    setUbicacion(laboratorio.ubicacion);
    setCapacidad(laboratorio.capacidad);
  };

  const handleNombreChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_NOMBRE);
    setNombre(value);
  };

  const handleUbicacionChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_UBICACION);
    setUbicacion(value);
  };

  const handleCapacidadChange = e => {
    let value = e.target.value;
    if (value < 0) {
      value = '';
    } else if (value.length > MAX_DIGITOS_CAPACIDAD) {
      value = value.slice(0, MAX_DIGITOS_CAPACIDAD);
    }
    setCapacidad(value);
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
                <h5 className="modal-title" style={{ color: 'black' }}>Modificar Laboratorio</h5>
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
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Ubicación:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ubicacion}
                      onChange={handleUbicacionChange}
                      maxLength={MAX_CARACTERES_UBICACION}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Capacidad:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={capacidad}
                      onChange={handleCapacidadChange}
                      min={0}
                      max={Math.pow(10, MAX_DIGITOS_CAPACIDAD) - 1}
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
                    No puedes dejar campos en sin rellenar
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

export default ModificarLaboratorio;
