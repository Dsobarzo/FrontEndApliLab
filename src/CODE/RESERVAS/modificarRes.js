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
  const [alertaFechaPasada, setAlertaFechaPasada] = useState(false);

  const MAX_CARACTERES_FECHA = 10;

  const [datosActuales, setDatosActuales] = useState({
    docenteActual: '',
    laboratorioActual: '',
    fechaAct: '',
    bloqueActual: '',
    estadoActual: false,
    emailDocenteOriginal: '',
  });

  useEffect(() => {
    obtenerLaboratorios();
    obtenerDocentes();
  }, []);

  const obtenerLaboratorios = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenerlaboratorios')
      .then(response => {
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
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los docentes:', error);
      });
  };

  const handleModificar = () => {
    abrirModal();
    guardarDatosActuales();
  };

  const guardarDatosActuales = () => {
    const nomDoc = docentes.find((doc) => doc.id === parseInt(docente));
    const emailDocente = nomDoc ? nomDoc.email : '';

    const docenteAntes = nomDoc ? `${nomDoc.nombre} ${nomDoc.apellido}` : '';
    const laboratorioAntes = laboratorios.find((lab) => lab.id === laboratorio);

    setDatosActuales({
      docenteActual: docenteAntes,
      laboratorioActual: laboratorioAntes ? laboratorioAntes.nombre : '<LaboratorioAntes>',
      fechaAct: fecha,
      bloqueActual: bloque,
      estadoActual: estadoReserva,
      emailDocenteOriginal: emailDocente, // Almacena el email original
    });
  };

  const handleCancelar = () => {
    cerrarModal();
    resetForm();
  };

  const handleGuardar = async () => {

    if (!laboratorio || !docente || !fecha || !bloque) {
      setAlertaVisible(true);
      return;
    }

    // Verificar si la fecha seleccionada es una fecha pasada
    const fechaActual = new Date();
    const fechaReserva = new Date(fecha);

    if (fechaReserva < fechaActual) {
      setAlertaFechaPasada(true);
      return;
    }

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

        const {
          docenteActual,
          laboratorioActual,
          fechaAct,
          bloqueActual,
          estadoActual,
        } = datosActuales;

        const docenteSeleccionado = docentes.find((doc) => doc.id === parseInt(docente));

        // Verificar que haya un docente seleccionado
        if (docenteSeleccionado) {

          const nombreDocente = `${docenteSeleccionado.nombre} ${docenteSeleccionado.apellido}`;
          const laboratorioSeleccionado = laboratorios.find((lab) => lab.id === parseInt(laboratorio));

          //console.log('anomDoc:', nomDoc)
          //console.log('DocenteSeleccionado:', docenteSeleccionado)
          //console.log('DocenteNuevo:', nombreDocente)
          //console.log('laboratorioSeleccionado:', laboratorioSeleccionado)
          //console.log('laboratorioNuevo:', nombreLaboratorio)

          const destinatarioUno = docenteActual;
          const destinatarioDos = nombreDocente;
          let estadoAntiguo = '';
          let estadoNuevo = '';

          if (estadoActual) {
            estadoAntiguo = 'Activo';
          } else {
            estadoAntiguo = 'Inactivo';
          }

          if (estadoReserva) {
            estadoNuevo = 'Activo';
          } else {
            estadoNuevo = 'Inactivo';
          }

          console.log('Antes:', destinatarioUno);
          console.log('Despues:', destinatarioDos);

          const mensajeReservaAntes = `
    Estimado/a ${destinatarioUno},

    Le informamos que se ha modificado la siguente reserva de laboratorio a su nombre. 

        - Nombre del Docente: ${docenteActual}
        - Nombre del Laboratorio: ${laboratorioActual}
        - Fecha de la Reserva: ${fechaAct}
        - Bloque: ${bloqueActual}
        - Estado de la Reserva: ${estadoAntiguo}
        
    A continuación, se detallan los cambios:
        
        - Nombre del Docente: ${nombreDocente}
        - Nombre del Laboratorio: ${laboratorioSeleccionado.nombre}
        - Fecha de la Reserva: ${fecha}
        - Bloque: ${bloque}
        - Estado de la Reserva: ${estadoNuevo}
        
    Para comprobar los cambios realizados en su reserva, puede ingresar al siguiente link:
    https://frontendaplilab-production.up.railway.app/
        
    Gracias,
    Sistema de Reserva de Laboratorios
        `;

        const mensajeReservaDespues = `
        Estimado/a ${destinatarioDos},
    
        Le informamos que se ha modificado la siguente reserva de laboratorio a su nombre. 
    
            - Nombre del Docente: ${docenteActual}
            - Nombre del Laboratorio: ${laboratorioActual}
            - Fecha de la Reserva: ${fechaAct}
            - Bloque: ${bloqueActual}
            - Estado de la Reserva: ${estadoAntiguo}
            
        A continuación, se detallan los cambios:
            
            - Nombre del Docente: ${nombreDocente}
            - Nombre del Laboratorio: ${laboratorioSeleccionado.nombre}
            - Fecha de la Reserva: ${fecha}
            - Bloque: ${bloque}
            - Estado de la Reserva: ${estadoNuevo}
            
        Para comprobar los cambios realizados en su reserva, puede ingresar al siguiente link:
        https://frontendaplilab-production.up.railway.app/
            
        Gracias,
        Sistema de Reserva de Laboratorios
            `;

          if (destinatarioUno === destinatarioDos) {
            console.log('un correo:', docenteActual, datosActuales.emailDocenteOriginal)
            enviarNotificacionPorCorreo([datosActuales.emailDocenteOriginal], "Modificación en Reserva de Laboratorio", mensajeReservaAntes);

          } else {
            console.log('dos correos:', docenteActual, datosActuales.emailDocenteOriginal, '/', nombreDocente, docenteSeleccionado.email)
            enviarNotificacionPorCorreo([datosActuales.emailDocenteOriginal], "Modificación de reserva de laboratorio", mensajeReservaAntes);
            enviarNotificacionPorCorreo([docenteSeleccionado.email], "Modificación de reserva de laboratorio", mensajeReservaDespues);
          }

        } else {
          // En el de que no se haya seleccionado un docente
          console.warn('Por favor, seleccione un docente antes de agendar la reserva.');
        }

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
    setAlertaFechaPasada(false);
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
    const docenteId = e.target.value;
    setDocente(docenteId);
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

  async function enviarNotificacionPorCorreo(destinatarios, asunto, mensaje) {
    try {
      // Endpoint Notificaciones
      const urlServicioExterno = 'https://mailnotification.onrender.com/v1/notificacion';

      // Datos del correo electrónico
      const datosCorreo = {
        toUser: destinatarios,
        subject: asunto,
        message: mensaje,
      };

      //console.log('destinatarios:', destinatarios);
      //console.log('asunto:', asunto);
      //console.log('mensaje:', mensaje);

      // Solicitud POST
      const respuesta = await axios.post(urlServicioExterno, datosCorreo);

      // Imprime detalles de la respuesta si es necesario
      console.log('Respuesta del servicio externo:', respuesta.data);

    } catch (error) {
      // Maneja errores en caso de que la solicitud falle
      console.error('Error al enviar la notificación por correo electrónico:', error.message);

      // Imprime detalles de la respuesta en caso de que existan
      if (error.response) {
        console.error('Detalles de la respuesta:', error.response.data);
      }
    }
  }


  return (
    <div>
      <button className="btn btn-warning btn-sm m-1 p-2" onClick={handleModificar}>
        Modificar
      </button>
      {modalVisible && (
        <div className="modal my-5" id="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content border border-white" style={{ height: '800px', background: 'rgb(35, 35, 35)' }}>
              <div className="modal-header">
                <h5 className="modal-title fs-3" style={{ color: 'white', marginLeft: '100px' }}>Modificar Reserva</h5>
                <button type="button" className="close" aria-label="Cerrar" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleCancelar}>
                  <span className='fs-1' style={{ color: 'red', marginTop: '10px' }}>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group text-center">
                    <label className='fs-4' style={{ color: 'white' }}>Laboratorio:</label>
                    <div className='mx-5'>
                      <select className="form-control" value={laboratorio} onChange={handleLaboratorioChange}>
                        <option value="">Seleccione un laboratorio</option>
                        {laboratorios.map(lab => (
                          <option key={lab.id} value={lab.id}>{lab.nombre}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'white' }}>Docente:</label>
                    <div className='mx-5'>
                      <select className="form-control" value={docente} onChange={handleDocenteChange}>
                        <option value="">Seleccione un docente</option>
                        {docentes.map(docente => (
                          <option key={docente.id} value={docente.id}>{docente.nombre + " " + docente.apellido}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ color: 'white' }}>Bloque:</label>
                    <div className='mx-5'>
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
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'white' }}>Estado:</label>
                    <div className='mx-5'>
                      <select className="form-control" value={estadoReserva} onChange={handleEstadoChange}>
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'white' }}>Fecha:</label>
                    <div className='mx-5'>
                      <input
                        type="date"
                        className="form-control mx-5"
                        value={fecha}
                        onChange={handleFechaChange}
                        maxLength={MAX_CARACTERES_FECHA}
                      />
                    </div>
                  </div>
                </form>
              </div>
              {alertaFechaPasada && (
                <div className="alert alert-danger d-flex mx-5" role="alert">
                  <svg className="text-center" width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    No se puede reservar en una fecha pasada.
                  </div>
                </div>
              )}
              {alertaVisible && (
                <div className="alert alert-danger d-flex mx-5" role="alert">
                  <svg className="text-center" width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>
                    Por favor, complete todos los campos.
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

export default ModificarReserva;
