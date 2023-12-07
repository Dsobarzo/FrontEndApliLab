import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgregarReserva from './agregarRes';
import ModificarReserva from './modificarRes';

const ListadoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

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

  const handleReservaModificada = () => {
    obtenerReservas();
  };

  const handleReservaAgregada = () => {
    obtenerReservas();
  };

  const handleFiltroBusquedaChange = (e) => {
    setFiltroBusqueda(e.target.value);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
  };

  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };

  const reservasFiltradas = reservas.filter((reserva) => {
    const laboratorio = laboratorios.find((lab) => lab.id === reserva.id_laboratorios);
    const docente = docentes.find((doc) => doc.id === reserva.id_profesores);
    const nombreLaboratorio = laboratorio ? laboratorio.nombre.toLowerCase() : '';
    const nombreDocente = docente ? `${docente.nombre} ${docente.apellido}`.toLowerCase() : '';

    return (
      (!filtroBusqueda ||
        nombreLaboratorio.includes(filtroBusqueda.toLowerCase()) ||
        nombreDocente.includes(filtroBusqueda.toLowerCase())) &&
      (!filtroFecha || reserva.fecha_reserva === filtroFecha) &&
      (!filtroEstado || (filtroEstado === 'activo' ? reserva.estado : !reserva.estado))
    );
  });

  const obtenerClaseEstado = (estado) => {
    if (estado) {
      return 'text-success'; // Activo: Verde
    } else {
      return 'text-danger'; // Inactivo: Rojo
    }
  };

  return (
    <div className='row'>
      <p className='fs-2'>Listado de Reservas</p>
      <div className='row align-items-start text-end'>
        <div className='col-1'>
          <label className='form-label fs-4 mt-1'>Buscar:</label>
        </div>
        <div className='col-2 p-1'>
          <input
            type='text'
            value={filtroBusqueda}
            onChange={handleFiltroBusquedaChange}
            className='form-control fs-6'
          />
        </div>
        <div className='col-1'>
          <label className='form-label fs-4 mt-1 px-0'>Estado:</label>
        </div>
        <div className='col-2 pt-1'>
          <select
            value={filtroEstado}
            onChange={handleFiltroEstadoChange}
            className='form-select fs-6'
          >
            <option value=''>Todos los estados</option>
            <option value='activo'>Activo</option>
            <option value='inactivo'>Inactivo</option>
          </select>
        </div>
        <div className='col-2'>
          <label className='form-label fs-4 mt-1'>Filtrar por fecha:</label>
        </div>
        <div className='col-2 pt-1'>
          <input
            type='date'
            value={filtroFecha}
            onChange={handleFiltroFechaChange}
            className='form-control fs-6'
          />
        </div>
      </div>
      <div className='col-10 table-responsive mt-3' style={{ maxHeight: '820px' }}>
        <table className='table table-dark table-striped table-hover caption-top align-middle'>
          <thead>
            <tr>
              <th className='w-25'>Laboratorio</th>
              <th className='w-25'>Docente</th>
              <th className='w-25 text-center'>Fecha Reserva</th>
              <th className='w-25 text-center'>Bloque</th>
              <th className='w-25'>Estado</th>
              <th className='w-25 text-center'>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.map((reserva) => {
              const laboratorio = laboratorios.find((lab) => lab.id === reserva.id_laboratorios);
              const docente = docentes.find((doc) => doc.id === reserva.id_profesores);
              const claseEstado = obtenerClaseEstado(reserva.estado);

              return (
                <tr key={reserva.id}>
                  <td>{laboratorio ? laboratorio.nombre : ''}</td>
                  <td>{docente ? `${docente.nombre} ${docente.apellido}` : ''}</td>
                  <td className='text-center'>{reserva.fecha_reserva}</td>
                  <td className='text-center'>{reserva.bloque}</td>
                  <td className={claseEstado}>{reserva.estado ? 'Activo' : 'Inactivo'}</td>
                  <td className='text-center'>
                    <ModificarReserva reserva={reserva} onReservaModificada={handleReservaModificada} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='col-2 table-responsive'>
        <AgregarReserva onReservaAgregada={handleReservaAgregada} />
      </div>
    </div>
  );
};

export default ListadoReservas;
