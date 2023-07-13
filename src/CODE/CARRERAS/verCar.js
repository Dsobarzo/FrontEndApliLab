import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EliminarCarrera from './eliminarCar';
import AgregarCarrera from './agregarCar';
import ModificarCarrera from './modificarCar';

const ListadoCarreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [filtroCarrera, setFiltroCarrera] = useState('');

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

  const handleFiltroCarreraChange = (e) => {
    setFiltroCarrera(e.target.value);
  };

  const carrerasFiltradas = carreras.filter(carrera =>
    carrera.carrera.toLowerCase().includes(filtroCarrera.toLowerCase())
  );


  return (
    <div>
      <p className='fs-2'>Listado de Carreras</p>
      <div className='row align-items-start'>
        <div className='row'>
          <div className='col-1'>
            <label htmlFor='filtroCarrera' className='form-label fs-4 text-center mt-1'>Buscar:</label>
          </div>
          <div className='col-2 pt-1'>
            <input
              type='text'
              id='filtroCarrera'
              className='form-control fs-6'
              value={filtroCarrera}
              onChange={handleFiltroCarreraChange}
            />
          </div>
        </div>

        <div className='col-10 table-responsive'><br />
          <table className='table table-dark table-striped table-hover caption-top align-middle'>
            <thead>
              <tr>
                <th className='w-50'>Carrera</th>
                <th className='w-25 text-center'>Modificar</th>
                <th className='w-25 text-center'>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {carrerasFiltradas.map(carrera => (
                <tr key={carrera.id}>
                  <td>{carrera.carrera}</td>
                  <td className='text-center'>
                    <ModificarCarrera carrera={carrera} onCarreraModificada={handleCarreraModificada} />
                  </td>
                  <td className='text-center'>
                    <EliminarCarrera carreraId={carrera.id} onCarreraEliminada={handleCarreraEliminada} />
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
        <div className='col-2'>
          <AgregarCarrera onCarreraAgregada={handleCarreraAgregada} />
        </div>
      </div>
    </div>
  );
};

export default ListadoCarreras;
