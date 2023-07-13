import React, { useState } from 'react';
import axios from 'axios';

const EliminarDocente = ({ docenteId, onDocenteEliminado }) => {
  const [id, setId] = useState(docenteId);

  const eliminarDocente = () => {
    axios.delete(`https://apilab-backend-sandbox.up.railway.app/borrarprofesor/${id}`)
      .then(response => {
        // El docente se eliminó exitosamente
        console.log('Docente eliminado:', response.data);
        // Aquí puedes realizar acciones adicionales después de eliminar el docente, si es necesario.
        onDocenteEliminado(); // Llamar a la función para actualizar la lista de docentes
      })
      .catch(error => {
        // Ocurrió un error al eliminar el docente
        console.error('Error al eliminar el docente:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades.
      });
  };

  return (
    <div>
      <button className="btn btn-danger m-1" onClick={eliminarDocente}>Eliminar</button>
    </div>
  );
};

export default EliminarDocente;
