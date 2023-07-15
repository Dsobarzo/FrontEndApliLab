import React, { useState } from 'react';
import axios from 'axios';

const EliminarLaboratorio = ({ laboratorioId, onLaboratorioEliminado }) => {
  const [id, setId] = useState(laboratorioId);

  const eliminarLaboratorio = () => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este laboratorio?');

    if (confirmacion) {
      axios.delete(`https://apilab-backend-sandbox.up.railway.app/borrarlaboratorio/${id}`)
        .then(response => {
          // El laboratorio se eliminó exitosamente
          console.log('Laboratorio eliminado:', response.data);
          onLaboratorioEliminado(); // Actualizar la lista de laboratorios
        })
        .catch(error => {
          // Ocurrió un error al eliminar el laboratorio
          console.error('Error al eliminar el laboratorio:', error);
        });
    }
  };

  return (
    <div>
      <button className="btn btn-danger btn-sm m-1 p-2" onClick={eliminarLaboratorio}>Eliminar</button>
    </div>
  );
};

export default EliminarLaboratorio;
