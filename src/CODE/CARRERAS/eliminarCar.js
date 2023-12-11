import React, { useState, useEffect } from 'react';
import { obtenerDocentes, obtenerCarreras, actualizarCarreras, actualizarDocentes } from '../actualizarDatos.js';
import axios from 'axios';

const EliminarCarrera = ({ carreraId, onCarreraEliminada }) => {

  actualizarCarreras();
  obtenerCarreras();
  actualizarDocentes();
  obtenerDocentes();

  const [tieneDocentes, setTieneDocentes] = useState(false);
  const [id] = useState(carreraId);

  useEffect(() => {
    const verificarDocentes = async () => {
      try {
        // Obtener docentes
        const docentesResponse = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerprofesores');

        // Verificar si la carrera tiene docentes asociados
        const carreraConDocentes = docentesResponse.data.some(docente => docente.id_carrera === carreraId);
        setTieneDocentes(carreraConDocentes);
      } catch (error) {
        console.error(`Error al verificar docentes para la carrera ${carreraId}:`, error);
      }
    };

    if (carreraId) {
      verificarDocentes();
    }
  }, [carreraId]);

  const eliminarCarrera = () => {
    if (!tieneDocentes) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');

      if (confirmacion) {
        axios
          .delete(`https://apilab-backend-sandbox.up.railway.app/borrarcarrera/${id}`)
          .then(response => {
            console.log('Carrera eliminada:', response.data);
            onCarreraEliminada(); // Actualizar la lista de carreras
          })
          .catch(error => {
            console.error('Error al eliminar la carrera:', error);
          });
      }
    } else {
      alert('La carrera no se puede eliminar, porque tiene docentes asociados.');
    }
  };

  return (
    <div>
      <button className="btn btn-danger btn-sm m-1 p-2" onClick={eliminarCarrera}>
        Eliminar
      </button>
    </div>
  );
};

export default EliminarCarrera;