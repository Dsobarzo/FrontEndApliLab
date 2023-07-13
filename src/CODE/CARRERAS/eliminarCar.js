import React, { useState } from 'react';
import axios from 'axios';

const EliminarCarrera = ({ carreraId, onCarreraEliminada }) => {
  const [id, setId] = useState(carreraId);

  const eliminarCarrera = () => {
    axios
      .delete(`https://apilab-backend-sandbox.up.railway.app/borrarcarrera/${id}`)
      .then(response => {
        // La carrera se eliminó exitosamente
        console.log('Carrera eliminada:', response.data);
        // Aquí puedes realizar acciones adicionales después de eliminar la carrera, si es necesario.
        onCarreraEliminada(); // Llamar a la función para actualizar la lista de carreras
      })
      .catch(error => {
        // Ocurrió un error al eliminar la carrera
        console.error('Error al eliminar la carrera:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades.
      });
  };

  return (
    <div>
      <button className="btn btn-danger m-1" onClick={eliminarCarrera}>
        Eliminar
      </button>
    </div>
  );
};

export default EliminarCarrera;
