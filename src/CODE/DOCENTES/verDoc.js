import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EliminarDocente from './eliminarDoc';
import AgregarDocente from './agregarDoc';
import ModificarDocente from './modificarDoc';

const ListadoDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [carreras, setCarreras] = useState({});

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

  return (
    <div>
      <h2>Listado de Docentes</h2>
      <div className='row align-items-start'>
        <div className='col-10 table-responsive'>
          <table className="table table-dark table-striped table-hover caption-top align-middle">
            <caption>Listado de docentes</caption>
            <thead>
              <tr>
                <th className="w-20">Nombre</th>
                <th className="w-20">Apellido</th>
                <th className="w-20">Email</th>
                <th className="w-20">Carrera</th>
                <th className="w-10">Modificar</th>
                <th className="w-10">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map(docente => (
                <tr key={docente.id}>
                  <td>{docente.nombre}</td>
                  <td>{docente.apellido}</td>
                  <td>{docente.email}</td>
                  <td>{carreras[docente.id_carrera]}</td>
                  <td>
                    <ModificarDocente docente={docente} onDocenteModificado={handleDocenteModificado} />
                  </td>
                  <td>
                    <EliminarDocente docenteId={docente.id} onDocenteEliminado={handleDocenteEliminado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-2'>
          <h3>Agregar Docente</h3>
          <AgregarDocente onDocenteAgregado={handleDocenteAgregado} />
        </div>
      </div>
    </div>
  );
};

export default ListadoDocentes;
