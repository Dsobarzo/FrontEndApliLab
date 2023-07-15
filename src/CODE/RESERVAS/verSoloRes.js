import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListadoSoloReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

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

  const handleFiltroBusquedaChange = (e) => {
    setFiltroBusqueda(e.target.value);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
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
      (!filtroFecha || reserva.fecha_reserva === filtroFecha)
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
      <p className='fs-2'>Listado de Reservas</p>
      <div className='row align-items-start'>
        <div className='row'>
          <div className='col-1'>
            <label className='form-label fs-4 text-center mt-1'>Buscar:</label>
          </div>
          <div className='col-2 pt-1'>
            <input
              type='text'
              value={filtroBusqueda}
              onChange={handleFiltroBusquedaChange}
              className='form-control fs-6'
            />
          </div>
          <div className='col-2'>
            <label className='form-label fs-4 text-center mt-1'>Filtrar por Fecha:</label>
            </div>
            <div className='col-2 p-1'>
            <input
              type='date'
              value={filtroFecha}
              onChange={handleFiltroFechaChange}
              className='form-control fs-6'
            />
          </div>
          <div className='col-12 table-responsive mt-3' style={{ maxHeight: '400px' }}><br/>
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
