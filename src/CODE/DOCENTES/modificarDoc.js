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
        console.log('Carreras obtenidas:', response.data);
        setCarreras(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las carreras:', error);
      });
  };

  const obtenerNombreCarrera = (idCarrera) => {
    const carrera = carreras.find(c => c.id === idCarrera);
    return carrera ? carrera.nombre : '';
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
      <button className="btn btn-warning m-1" onClick={handleModificar}>
        Modificar
      </button>
      {modalVisible && (
        <div className="modal" id="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: 'black' }}>Modificar Docente</h5>
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
                    <label style={{ color: 'black' }}>Apellido:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={apellido}
                      onChange={handleApellidoChange}
                      maxLength={MAX_CARACTERES_APELLIDO}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={handleEmailChange}
                      maxLength={MAX_CARACTERES_EMAIL}
                    />
                  </div>
                  <div className="form-group">
                    <label>Carrera:</label>
                    <select style={{ background: 'grey' }}
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
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    No puedes dejar campos sin rellenar.
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

export default ModificarDocente;
