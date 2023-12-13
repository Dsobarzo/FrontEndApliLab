import React, { useEffect, useState } from 'react';
import { obtenerLaboratorios, actualizarLaboratorios } from '../actualizarDatos.js';
import EliminarLaboratorio from './eliminarLab';
import AgregarLaboratorio from './agregarLab';
import ModificarLaboratorio from './modificarLab';

const ListadoLaboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [filtroLaboratorio, setFiltroLaboratorio] = useState('');

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const laboratoriosData = await obtenerLaboratorios();
      setLaboratorios(laboratoriosData);
    } catch (error) {
      console.error('//Error al obtener los laboratorios:', error);
    }
  };

  const handleLaboratorioModificado = async () => {
    try {
      await actualizarLaboratorios();
      obtenerDatos();
    } catch (error) {
      console.error('Error al actualizar los laboratorios:', error);
    }
  };

  const handleLaboratorioEliminado = async () => {
    try {
      await actualizarLaboratorios();
      obtenerDatos();
    } catch (error) {
      console.error('Error al actualizar los laboratorios:', error);
    }
  };

  const handleLaboratorioAgregado = async () => {
    try {
      await actualizarLaboratorios();
      obtenerDatos();
    } catch (error) {
      console.error('Error al actualizar los laboratorios:', error);
    }
  };

  const handleFiltroLaboratorioChange = (e) => {
    setFiltroLaboratorio(e.target.value);
  };

  const laboratoriosFiltrados = laboratorios.filter(laboratorio =>
    filtroLaboratorio ? laboratorio.id === parseInt(filtroLaboratorio) : true
  );

  return (
    <div className='row'>
      <p className='fs-2'>Listado de Laboratorios</p>
      <div className='row align-items-start'>
        <div className='row'>
          <div className='col-1'>
            <label htmlFor='filtroLAboratorio' className='form-label fs-4 mt-1'>Buscar:</label>
          </div>
          <div className='col-2  pt-1'>
            <select
              id='filtroLaboratorio'
              className='form-select fs-6'
              value={filtroLaboratorio}
              onChange={handleFiltroLaboratorioChange}
              style={{ minWidth: '200px' }}
            >
              <option value=''>Todos los laboratorios</option>
              {laboratorios.map(laboratorio => (
                <option key={laboratorio.id} value={laboratorio.id}>
                  {laboratorio.nombre}
                </option>
              ))}
            </select><br />
          </div>
        </div>
        <div className='col-10 table-responsive' style={{ maxHeight: '600px' }}>
          <table className="table table-dark table-striped table-hover caption-top align-middle">
            <thead>
              <tr>
                <th className="w-25">Nombre</th>
                <th className="w-25 text-center">Ubicación</th>
                <th className="w-25 text-center">Capacidad</th>
                <th className="w-25 text-center">Modificar</th>
                <th className="w-25 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {laboratoriosFiltrados.map(laboratorio => (
                <tr key={laboratorio.id}>
                  <td>{laboratorio.nombre}</td>
                  <td className='text-center'>{laboratorio.ubicacion}</td>
                  <td className='text-center'>{laboratorio.capacidad}</td>
                  <td className='text-center'>
                    <ModificarLaboratorio laboratorio={laboratorio} onLaboratorioModificado={handleLaboratorioModificado} />
                  </td>
                  <td className='text-center'>
                    <EliminarLaboratorio laboratorioId={laboratorio.id} onLaboratorioEliminado={handleLaboratorioEliminado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className='col-2 table-responsive'>
            <AgregarLaboratorio onLaboratorioAgregado={handleLaboratorioAgregado} />
          </div>
        </div>
      </div>
  );
};

export default ListadoLaboratorios;
