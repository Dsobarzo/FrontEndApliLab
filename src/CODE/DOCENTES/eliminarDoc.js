import React, { useState, useEffect } from 'react';
import { actualizarDocentes, actualizarReservas, obtenerDocentes, obtenerReservas } from '../actualizarDatos.js';
import axios from 'axios';

const EliminarDocente = ({ docenteId, onDocenteEliminado }) => {

  actualizarDocentes();
  obtenerDocentes();
  actualizarReservas();
  obtenerReservas();

  const [tieneReservas, setTieneReservas] = useState(false);
  const [id] = useState(docenteId);

  useEffect(() => {
    const verificarReservas = async () => {
      try {
        // Obtener reservas
        const reservasResponse = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerreservas');

        // Verificar si el docente tiene reservas asociadas
        const docenteConReservas = reservasResponse.data.some(reserva => reserva.id_profesores === docenteId);
        setTieneReservas(docenteConReservas);
      } catch (error) {
        console.error(`Error al verificar reservas para el docente ${docenteId}:`, error);
      }
    };

    if (docenteId) {
      verificarReservas();
    }
  }, [docenteId]);

  const eliminarDocente = () => {
    if (!tieneReservas) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este docente?');

      if (confirmacion) {
        axios
          .delete(`https://apilab-backend-sandbox.up.railway.app/borrarprofesor/${id}`)
          .then(response => {
            console.log('Docente eliminado:', response.data);
            onDocenteEliminado(); // Actualizar la lista de docentes
          })
          .catch(error => {
            console.error('Error al eliminar el docente:', error);
          });
      }
    } else {
      alert('El docente no se puede eliminar, porque tiene reservas asociadas.');
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
