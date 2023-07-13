import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EliminarCarrera from './eliminarCar';
import AgregarCarrera from './agregarCar';
import ModificarCarrera from './modificarCar';

const ListadoCarreras = () => {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    obtenerCarreras();
  }, []);

  const obtenerCarreras = () => {
    axios
      .get('https://apilab-backend-sandbox.up.railway.app/obtenercarreras')
      .then(response => {
        console.log('Carreras obtenidas:', response.data);
        setCarreras(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las carreras:', error);
      });
  };

  const handleCarreraModificada = () => {
    obtenerCarreras();
  };

  const handleCarreraEliminada = () => {
    obtenerCarreras();
  };

  const handleCarreraAgregada = () => {
    obtenerCarreras();
  };

  return (
    <div>
      <h2>Listado de Carreras</h2>
      <div className='row align-items-start'>
        <div className='col-10 table-responsive'>
          <table className='table table-dark table-striped table-hover caption-top align-middle'>
            <caption>Listado de carreras</caption>
            <thead>
              <tr>
                <th className='w-50'>Carrera</th>
                <th className='w-25'>Modificar</th>
                <th className='w-25'>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {carreras.map(carrera => (
                <tr key={carrera.id}>
                  <td>{carrera.carrera}</td>
                  <td>
                    <ModificarCarrera carrera={carrera} onCarreraModificada={handleCarreraModificada} />
                  </td>
                  <td>
                    <EliminarCarrera carreraId={carrera.id} onCarreraEliminada={handleCarreraEliminada} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-2'>
          <h3>Agregar Carrera</h3>
          <AgregarCarrera onCarreraAgregada={handleCarreraAgregada} />
        </div>
      </div>
    </div>
  );
};

export default ListadoCarreras;
