import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgregarReserva from './agregarRes';
import ModificarReserva from './modificarRes';

const ListadoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [filtroLaboratorio, setFiltroLaboratorio] = useState('');
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
        console.log('Reservas obtenidas:', response.data);
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

  const handleReservaModificada = () => {
    obtenerReservas();
  };

  const handleReservaAgregada = () => {
    obtenerReservas();
  };

  const handleFiltroLaboratorioChange = (e) => {
    setFiltroLaboratorio(e.target.value);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
  };

  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };

  const reservasFiltradas = reservas.filter((reserva) =>
    (filtroLaboratorio ? reserva.id_laboratorios === parseInt(filtroLaboratorio) : true) &&
    (filtroFecha ? reserva.fecha_reserva === filtroFecha : true) &&
    (filtroEstado ? (filtroEstado === 'activo' ? reserva.estado : !reserva.estado) : true)
  );

  const obtenerClaseEstado = (estado) => {
    if (estado) {
      return 'text-success'; // Activo: Verde
    } else {
      return 'text-danger'; // Inactivo: Rojo
    }
  };

  return (
    <div>
      <h2>Listado de Reservas</h2>
      <div className='row align-items-start'>
        <div className='col-4'>
          <label>Filtrar por Laboratorio:</label>
          <select
            value={filtroLaboratorio}
            onChange={handleFiltroLaboratorioChange}
            className='form-control'
          >
            <option value=''>Todos los laboratorios</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className='col-4'>
          <label>Filtrar por Fecha:</label>
          <input
            type='date'
            value={filtroFecha}
            onChange={handleFiltroFechaChange}
            className='form-control'
          />
        </div>
        <div className='col-4'>
          <label>Filtrar por Estado:</label>
          <select
            value={filtroEstado}
            onChange={handleFiltroEstadoChange}
            className='form-control'
          >
            <option value=''>Todos los estados</option>
            <option value='activo'>Activo</option>
            <option value='inactivo'>Inactivo</option>
          </select>
        </div>
        <div className='col-10 table-responsive'>
          <table className='table table-dark table-striped table-hover caption-top align-middle'>
            <caption>Listado de reservas</caption>
            <thead>
              <tr>
                <th className='w-25'>Laboratorio</th>
                <th className='w-25'>Docente</th>
                <th className='w-25'>Fecha Reserva</th>
                <th className='w-25'>Bloque</th>
                <th className='w-25'>Estado</th>
                <th>Modificar</th>
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
                    <td>{reserva.fecha_reserva}</td>
                    <td>{reserva.bloque}</td>
                    <td className={claseEstado}>{reserva.estado ? 'Activo' : 'Inactivo'}</td>
                    <td>
                      <ModificarReserva
                        reserva={reserva}
                        onReservaModificada={handleReservaModificada}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='col-2'>
          <AgregarReserva onReservaAgregada={handleReservaAgregada} />
        </div>
      </div>
    </div>
  );
};

export default ListadoReservas;
