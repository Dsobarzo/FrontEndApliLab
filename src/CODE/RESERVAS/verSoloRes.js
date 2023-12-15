import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListadoSoloReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroLaboratorio, setFiltroLaboratorio] = useState('');
  const [filtroDocente, setFiltroDocente] = useState('');
  const [filtroBloque, setFiltroBloque] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const limpiarFiltros = () => {
    setFiltroFecha('');
    setFiltroLaboratorio('');
    setFiltroDocente('');
    setFiltroBloque('');
    setFiltroEstado('');
  };

  useEffect(() => {
    obtenerReservas();
    obtenerLaboratorios();
    obtenerDocentes();
  }, []);

  const obtenerReservas = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenerreservas')
      .then(response => {
        setReservas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las reservas:', error);
      });
  };

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

  const handleFiltroLaboratorioChange = (e) => {
    setFiltroLaboratorio(e.target.value);
  };

  const handleFiltroDocenteChange = (e) => {
    setFiltroDocente(e.target.value);
  };

  const handleFiltroBloqueChange = (e) => {
    setFiltroBloque(e.target.value);
  };

  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
  };

  const reservasFiltradas = reservas.filter((reserva) => {
    return (
      (!filtroDocente || reserva.id_profesores === parseInt(filtroDocente)) &&
      (!filtroFecha || reserva.fecha_reserva === filtroFecha) &&
      (!filtroLaboratorio || reserva.id_laboratorios === parseInt(filtroLaboratorio)) &&
      (!filtroBloque || reserva.bloque === filtroBloque) &&
      (!filtroEstado || reserva.estado === (filtroEstado === 'Activo'))
    );
  });

  const obtenerClaseEstado = (estado) => {
    if (estado) {
      return 'text-success'; // Activo: Verde
    } else {
      return 'text-danger'; // Cancelado: Rojo
    }
  };

  return (
    <div>
      <div>
        <h2 className='fs-2 mb-3' style={{ color: 'white' }}>Listado de Reservas</h2>
      </div>
      <div className='row align-items-start'>
        <div className='table-responsive'>
          <div className='row'>
            <div className='col-xs-2 col-md-2'>
              <label className='form-label fs-5 text-left mt-1'>Laboratorios:</label>
              <select
                value={filtroLaboratorio}
                onChange={handleFiltroLaboratorioChange}
                className='form-control fs-6'
              >
                <option value=''>Todos</option>
                {laboratorios.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-xs-2 col-md-2' style={{ flexWrap: 'wrap'}}>
              <label className='form-label fs-5 text-left mt-1'>Docentes:</label>
              <select
                value={filtroDocente}
                onChange={handleFiltroDocenteChange}
                className='form-control fs-6'
              >
                <option value=''>Todos</option>
                {docentes.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.nombre + ' ' + doc.apellido}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-xs-2 col-md-2'>
              <label className='form-label fs-5 text-center mt-1'>Fechas:</label>
              <input
                type='date'
                value={filtroFecha}
                onChange={handleFiltroFechaChange}
                className='form-control fs-6'
              />
            </div>
            <div className='col-xs-2 col-md-2'>
              <label className='form-label fs-5 text-left mt-1'>Bloques:</label>
              <select
                value={filtroBloque}
                onChange={handleFiltroBloqueChange}
                className='form-control fs-6'
              >
                <option value=''>Seleccion bloque</option>
                <option value='1er Bloque'>1er Bloque [07:50 - 09:20]</option>
                <option value='2do Bloque'>2do Bloque [09:30 - 11:00]</option>
                <option value='3er Bloque'>3er Bloque [11:10 - 12:40]</option>
                <option value='4to Bloque'>4to Bloque [12:50 - 14-20]</option>
                <option value='5to Bloque'>5to Bloque [14:30 - 16:00]</option>
                <option value='6to Bloque'>6to Bloque [16:10 - 17:40]</option>
                <option value='7mo Bloque'>7mo Bloque [17:50 - 19:20]</option>
              </select>
            </div>
            <div className='col-xs-2 col-md-2'>
              <label className='form-label fs-5 text-left mt-1'>Estados:</label>
              <select
                value={filtroEstado}
                onChange={handleFiltroEstadoChange}
                className='form-control fs-6'
              >
                <option value=''>Todos</option>
                <option value='Activo'>Activo</option>
                <option value='Cancelado'>Cancelado</option>
              </select>
            </div>
            <div className='col-xs-2 col-md-2 text-center'>
              <button
              id='btn_exit'
              className='btn btn-outline-light'
              onClick={limpiarFiltros}
              style={{ 
                padding: '7px',
                margin: '40px 0px 20px 0px',
                width: '60%',
              }}
              >
                Limpiar
              </button>
            </div>
          </div>
          <div className='col-12' style={{ height: '500px' }}><br />
            <table className='table table-dark table-striped table-hover caption-top align-middle'>
              <thead>
                <tr>
                  <th className='w-25'>Laboratorio</th>
                  <th className='w-25'>Docente</th>
                  <th className='w-25 text-center'>Fecha Reserva</th>
                  <th className='w-25 text-center'>Bloque</th>
                  <th className='w-25'>Estado</th>
                  <td className='text-center'></td>
                </tr>
              </thead>
              <tbody>
                {reservasFiltradas.map((reserva) => {
                  const laboratorio = laboratorios.find((lab) => lab.id === reserva.id_laboratorios);
                  const docente = docentes.find((doc) => doc.id === reserva.id_profesores);
                  const claseEstado = obtenerClaseEstado(reserva.estado);

                  return (
                    <tr key={reserva.id}>
                      <td className='p-3'>{laboratorio ? laboratorio.nombre : ''}</td>
                      <td>{docente ? `${docente.nombre} ${docente.apellido}` : ''}</td>
                      <td className=' text-center'>{reserva.fecha_reserva}</td>
                      <td className=' text-center'>{reserva.bloque}</td>
                      <td className={claseEstado}>{reserva.estado ? 'Activo' : 'Cancelado'}</td>
                      <td className='text-center'></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListadoSoloReservas;
