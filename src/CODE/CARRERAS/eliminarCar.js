import React, { useState } from 'react';
import axios from 'axios';

const EliminarCarrera = ({ carreraId, onCarreraEliminada }) => {
  const [id, setId] = useState(carreraId);

  const eliminarCarrera = () => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');

    if (confirmacion) {
      axios
        .delete(`https://apilab-backend-sandbox.up.railway.app/borrarcarrera/${id}`)
        .then(response => {
          // La carrera se eliminó exitosamente
          console.log('Carrera eliminada:', response.data);
          onCarreraEliminada(); // Actualizar la lista de carreras
        })
        .catch(error => {
          // Ocurrió un error al eliminar la carrera
          console.error('Error al eliminar la carrera:', error);
        });
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

