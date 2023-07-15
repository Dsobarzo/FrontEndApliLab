import React, { useState } from 'react';
import axios from 'axios';

const EliminarDocente = ({ docenteId, onDocenteEliminado }) => {
  const [id, setId] = useState(docenteId);

  const eliminarDocente = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      axios
        .delete(`https://apilab-backend-sandbox.up.railway.app/borrarprofesor/${id}`)
        .then(response => {
          // El docente se eliminó exitosamente
          console.log('Docente eliminado:', response.data);
          onDocenteEliminado(); // Actualizar la lista de docentes
        })
        .catch(error => {
          // Ocurrió un error al eliminar el docente
          console.error('Error al eliminar el docente:', error);
        });
    }
  };

  return (
    <div>
      <button className="btn btn-danger btn-sm m-1 p-2" onClick={eliminarDocente}>
        Eliminar
      </button>
    </div>
  );
};

export default EliminarDocente;
