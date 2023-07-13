import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EliminarDocente from './eliminarDoc';
import AgregarDocente from './agregarDoc';
import ModificarDocente from './modificarDoc';

const ListadoDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [carreras, setCarreras] = useState({});
  const [filtroBusqueda, setFiltroBusqueda] = useState('');

  useEffect(() => {
    obtenerDocentes();
    obtenerCarreras();
  }, []);

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

  const obtenerCarreras = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenercarreras')
      .then(response => {
        console.log('Carreras obtenidas:', response.data);
        const carrerasMap = response.data.reduce((map, carrera) => {
          map[carrera.id] = carrera.carrera;
          return map;
        }, {});
        setCarreras(carrerasMap);
      })
      .catch(error => {
        console.error('Error al obtener las carreras:', error);
      });
  };

  const handleDocenteModificado = () => {
    obtenerDocentes();
  };

  const handleDocenteEliminado = () => {
    obtenerDocentes();
  };

  const handleDocenteAgregado = () => {
    obtenerDocentes();
  };

  const handleFiltroBusquedaChange = (e) => {
    setFiltroBusqueda(e.target.value);
  };

  const docentesFiltrados = docentes.filter(docente => {
    const nombreApellido = `${docente.nombre} ${docente.apellido}`.toLowerCase();
    const carrera = carreras[docente.id_carrera]?.toLowerCase();

    return (
      !filtroBusqueda ||
      nombreApellido.includes(filtroBusqueda.toLowerCase()) ||
      carrera.includes(filtroBusqueda.toLowerCase())
    );
  });

  return (
    <div>
      <p className='fs-2'>Listado de Docentes</p>
      <div className='row align-items-start'>

          <div className='row'>
            <div className='col-1'>
              <label htmlFor='filtroBusqueda' className='form-label fs-4 text-center mt-1'>Buscar:</label>
            </div>
            <div className='col-2  pt-1'>
              <input
                type='text'
                id='filtroBusqueda'
                className='form-control fs-6'
                value={filtroBusqueda}
                onChange={handleFiltroBusquedaChange}
              />
            </div>

        </div>
        <div className='col-10 table-responsive'><br />
          <table className="table table-dark table-striped table-hover caption-top align-middle">
            <thead>
              <tr>
                <th className="w-20">Nombre</th>
                <th className="w-20">Apellido</th>
                <th className="w-20 text-center">Email</th>
                <th className="w-20 text-center">Carrera</th>
                <th className="w-10 text-center">Modificar</th>
                <th className="w-10 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {docentesFiltrados.map(docente => (
                <tr key={docente.id}>
                  <td>{docente.nombre}</td>
                  <td>{docente.apellido}</td>
                  <td className='text-center'>{docente.email}</td>
                  <td className='text-center'>{carreras[docente.id_carrera]}</td>
                  <td className='text-center'>
                    <ModificarDocente docente={docente} onDocenteModificado={handleDocenteModificado} />
                  </td>
                  <td className='text-center'>
                    <EliminarDocente docenteId={docente.id} onDocenteEliminado={handleDocenteEliminado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-2'>
          <AgregarDocente onDocenteAgregado={handleDocenteAgregado} />
        </div>
      </div>
    </div>
  );
};

export default ListadoDocentes;
