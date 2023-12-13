import React, { useEffect, useState } from 'react';
import { obtenerCarreras, actualizarCarreras } from '../actualizarDatos.js';
import EliminarCarrera from './eliminarCar';
import AgregarCarrera from './agregarCar';
import ModificarCarrera from './modificarCar';

const ListadoCarreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [filtroCarrera, setFiltroCarrera] = useState('');

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const carrerasData = await obtenerCarreras();
      setCarreras(carrerasData);
    } catch (error) {
      console.error('//Error al obtener las carreras:', error);
    }
  };

  const handleCarreraModificada = async () => {
    try {
      await actualizarCarreras();
      obtenerDatos();
    } catch (error) {
      console.error('Error al modificar la carrera:', error);
    }
  };

  const handleCarreraEliminada = async () => {
    try {
      await actualizarCarreras();
      obtenerDatos();
    } catch (error) {
      console.error('Error al eliminar la carrera:', error);
    }
  };

  const handleCarreraAgregada = async () => {
    try {
      await actualizarCarreras();
      obtenerDatos();
    } catch (error) {
      console.error('Error al agregar la carrera:', error);
    }
  };

  const handleFiltroCarreraChange = (e) => {
    setFiltroCarrera(e.target.value);
  };

  const carrerasFiltradas = carreras.filter(carrera =>
    carrera.carrera.toLowerCase().includes(filtroCarrera.toLowerCase())
  );


  return (
    <div className='row'>
      <p className='fs-2'>Listado de Carreras</p>
      <div className='row align-items-start'>
        <div className='row'>
          <div className='col-1'>
            <label htmlFor='filtroCarrera' className='form-label fs-4 mt-1'>Buscar:</label>
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

        <div className='col-10 table-responsive' style={{ maxHeight: '600px'}}><br/>
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
        <div className='col-2 table-responsive'>
          <AgregarCarrera onCarreraAgregada={handleCarreraAgregada} />
        </div>
      </div>
    </div>
  );
};

export default ListadoCarreras;
