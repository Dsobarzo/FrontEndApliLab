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
        console.log('Laboratorios obtenidos:', response.data);
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
    <div className='row'>
      <p className='fs-2'>Listado de Laboratorios</p>
      <div className='col-10 table-responsive'>
        <div className='col-3'>
          <label htmlFor='filtroLaboratorio' className='fs-4 text-center'>Filtrar por nombre:</label>
          <select
            id='filtroLaboratorio'
            className='form-select fs-6'
            value={filtroLaboratorio}
            onChange={handleFiltroLaboratorioChange}
          >
            <option value=''>Todos los laboratorios</option>
            {laboratorios.map(laboratorio => (
              <option key={laboratorio.id} value={laboratorio.id}>
                {laboratorio.nombre}
              </option>
            ))}
          </select><br/>
        </div>
        <table className="table table-dark table-striped table-hover caption-top align-middle">

          <thead>
            <tr>
              <th className="w-50">Nombre</th>
              <th className="w-25">Ubicación</th>
              <th className="w-25">Capacidad</th>
              <th className="w-25">Modificar</th>
              <th className="w-25">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {laboratoriosFiltrados.map(laboratorio => (
              <tr key={laboratorio.id}>
                <td>{laboratorio.nombre}</td>
                <td>{laboratorio.ubicacion}</td>
                <td>{laboratorio.capacidad}</td>
                <td>
                  <ModificarLaboratorio laboratorio={laboratorio} onLaboratorioModificado={handleLaboratorioModificado} />
                </td>
                <td>
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
  );
};

export default ListadoLaboratorios;
