import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EliminarLaboratorio from './eliminarLab';
import AgregarLaboratorio from './agregarLab';
import ModificarLaboratorio from './modificarLab';


const ListadoLaboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [filtroLaboratorio, setFiltroLaboratorio] = useState('');

  useEffect(() => {
    obtenerLaboratorios();
  }, []);

  const obtenerLaboratorios = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenerlaboratorios')
      .then(response => {
        const laboratoriosOrdenados = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setLaboratorios(laboratoriosOrdenados);
      })
      .catch(error => {
        console.error('Error al obtener los laboratorios:', error);
      });
  };

  const handleLaboratorioModificado = () => {
    obtenerLaboratorios();
  };

  const handleLaboratorioEliminado = () => {
    obtenerLaboratorios();
  };

  const handleLaboratorioAgregado = () => {
    obtenerLaboratorios();
  };

  const handleFiltroLaboratorioChange = (e) => {
    setFiltroLaboratorio(e.target.value);
  };

  const laboratoriosFiltrados = laboratorios.filter(laboratorio =>
    filtroLaboratorio ? laboratorio.id === parseInt(filtroLaboratorio) : true
  );

  return (
    <div style={{ padding: '1%' }}>
      <h2 className='fs-2' style={{ color: 'white' }}>Listado de Laboratorios</h2>
      <div>
        <div className='col-3'>
          <label htmlFor='filtroLaboratorio' className='fs-4 text-center' style={{ minWidth: '190px' }}>Buscar por nombre:</label>
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
        <form style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className='table-responsive' style={{ width: '70%', minWidth: '310px' }}>
            <div style={{ maxHeight: '600px',  margin: '10px 10px 10px 0px' }}>
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
          </div>
          <div style={{ flex: '1 0 300px' }}>
            <AgregarLaboratorio onLaboratorioAgregado={handleLaboratorioAgregado} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListadoLaboratorios;