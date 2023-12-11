import React, { useState, useEffect } from 'react';
import { obtenerReservas, obtenerLaboratorios,actualizarLaboratorios, actualizarReservas } from '../actualizarDatos.js';
import axios from 'axios';

const EliminarLaboratorio = ({ laboratorioId, onLaboratorioEliminado }) => {
  
  actualizarLaboratorios();
  obtenerLaboratorios();
  actualizarReservas();
  obtenerReservas();

  const [tieneReservas, setTieneReservas] = useState(false);
  const [id] = useState(laboratorioId);

  useEffect(() => {
    const verificarReservas = async () => {
      try {
        // Obtener reservas
        const reservasResponse = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerreservas');

        // Verificar si el laboratorio tiene reservas
        const laboratorioConReservas = reservasResponse.data.some(reserva => reserva.id_laboratorios === laboratorioId);
        setTieneReservas(laboratorioConReservas);
      } catch (error) {
        console.error(`Error al verificar reservas para el laboratorio ${laboratorioId}:`, error);
      }
    };

    if (laboratorioId) {
      verificarReservas();
    }
  }, [laboratorioId]);

  const eliminarLaboratorio = () => {
    if (!tieneReservas) {

      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este laboratorio?');

      if (confirmacion) {
        axios
          .delete(`https://apilab-backend-sandbox.up.railway.app/borrarlaboratorio/${id}`)
          .then(response => {
            console.log('Laboratorio eliminado:', response.data);
            onLaboratorioEliminado(); // Actualizar la lista de laboratorios
          })
          .catch(error => {
            console.error('Error al eliminar el laboratorio:', error);
          });
      }
    } else {
      alert('El laboratorio no se puede eliminar, porque tiene reservas asociadas.');
    }
  };

  return (
    <div>
      <button className="btn btn-danger btn-sm m-1 p-2" onClick={eliminarLaboratorio}>
        Eliminar
      </button>
    </div>
  );
};

export default EliminarLaboratorio;