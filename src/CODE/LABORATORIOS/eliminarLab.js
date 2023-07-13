import React, { useState } from 'react';
import axios from 'axios';

const EliminarLaboratorio = ({ laboratorioId, onLaboratorioEliminado }) => {
  const [id, setId] = useState(laboratorioId);

  const eliminarLaboratorio = () => {
    axios.delete(`https://apilab-backend-sandbox.up.railway.app/borrarlaboratorio/${id}`)
      .then(response => {
        // El laboratorio se eliminó exitosamente
        console.log('Laboratorio eliminado:', response.data);
        // Aquí puedes realizar acciones adicionales después de eliminar el laboratorio, si es necesario.
        onLaboratorioEliminado(); // Llamar a la función para actualizar la lista de laboratorios
      })
      .catch(error => {
        // Ocurrió un error al eliminar el laboratorio
        console.error('Error al eliminar el laboratorio:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades.
      });
  };

  return (
    <div>
      <button className="btn btn-danger m-1" onClick={eliminarLaboratorio}>Eliminar</button>
    </div>
  );
};

export default EliminarLaboratorio;
