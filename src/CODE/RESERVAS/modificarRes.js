import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModificarReserva = ({ reserva, onReservaModificada }) => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [laboratorio, setLaboratorio] = useState(reserva.id_laboratorios || '');
  const [docente, setDocente] = useState(reserva.id_profesores || '');
  const [fecha, setFecha] = useState(reserva.fecha_reserva);
  const [bloque, setBloque] = useState(reserva.bloque);
  const [estadoReserva, setEstadoReserva] = useState(reserva.estado);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);

  const MAX_CARACTERES_FECHA = 10;

  useEffect(() => {
    obtenerLaboratorios();
    obtenerDocentes();
  }, []);

  const obtenerLaboratorios = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenerlaboratorios')
      .then(response => {
        console.log('Laboratorios obtenidos:', response.data);
        setLaboratorios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los laboratorios:', error);
      });
  };

  const obtenerDocentes = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenerprofesores')
      .then(response => {
        console.log('Docentes obtenidos:', response.data);
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los docentes:', error);
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
    if (!laboratorio || !docente || !fecha || !bloque) {
      setAlertaVisible(true);
      return;
    }

    const [horaInicio, horaFin] = bloque.split(' - ');

    const reservaModificada = {
      id_laboratorios: laboratorio,
      id_profesores: docente,
      fecha_reserva: fecha,
      bloque: bloque,
      estado: estadoReserva
    };

    axios
      .put(`https://apilab-backend-sandbox.up.railway.app/modificarreserva/${reserva.id}`, reservaModificada)
      .then(response => {
        console.log('Reserva modificada:', response.data);
        cerrarModal();
        resetForm();
        onReservaModificada();
      })
      .catch(error => {
        console.error('Error al modificar la reserva:', error);
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
    setLaboratorio(reserva.id_laboratorios || '');
    setDocente(reserva.id_profesores || '');
    setFecha(reserva.fecha_reserva);
    setBloque(reserva.bloque);
    setEstadoReserva(reserva.estado);
  };

  const handleLaboratorioChange = e => {
    setLaboratorio(e.target.value);
  };

  const handleDocenteChange = e => {
    setDocente(e.target.value);
  };

  const handleFechaChange = e => {
    const value = e.target.value.slice(0, MAX_CARACTERES_FECHA);
    setFecha(value);
  };

  const handleBloqueChange = e => {
    setBloque(e.target.value);
  };

  const handleEstadoChange = e => {
    setEstadoReserva(e.target.value === 'true');
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
                <h5 className="modal-title" style={{ color: 'black' }}>Modificar Reserva</h5>
                <button type="button" className="close" onClick={handleCancelar}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Laboratorio:</label>
                    <select className="form-control" value={laboratorio} onChange={handleLaboratorioChange}>
                      <option value="">Seleccione un laboratorio</option>
                      {laboratorios.map(lab => (
                        <option key={lab.id} value={lab.id}>{lab.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Docente:</label>
                    <select className="form-control" value={docente} onChange={handleDocenteChange}>
                      <option value="">Seleccione un docente</option>
                      {docentes.map(docente => (
                        <option key={docente.id} value={docente.id}>{docente.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Fecha:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fecha}
                      onChange={handleFechaChange}
                      maxLength={MAX_CARACTERES_FECHA}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Bloque:</label>
                    <select className="form-control" value={bloque} onChange={handleBloqueChange}>
                      <option value=''>Seleccione un bloque</option>
                      <option value='1er Bloque'>1er Bloque [07:50 - 09:20]</option>
                      <option value='2do Bloque'>2do Bloque [09:30 - 11:00]</option>
                      <option value='3er Bloque'>3er Bloque [11:10 - 12:40]</option>
                      <option value='4to Bloque'>4to Bloque [12:50 - 14-20]</option>
                      <option value='5to Bloque'>5to Bloque [14:30 - 16:00]</option>
                      <option value='6to Bloque'>6to Bloque [16:10 - 17:40]</option>
                      <option value='7mo Bloque'>7mo Bloque [17:50 - 19:20]</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'black' }}>Estado:</label>
                    <select className="form-control" value={estadoReserva} onChange={handleEstadoChange}>
                      <option value={true}>Activo</option>
                      <option value={false}>Inactivo</option>
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
                    Por favor, complete todos los campos.
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

export default ModificarReserva;
