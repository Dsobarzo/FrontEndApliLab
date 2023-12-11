import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../VISTAS/login';
import MenuAdministrador from '../VISTAS/menu_administrador';
import MenuDocente from '../VISTAS/menu_docente';
import TerminosCondiciones from '../VISTAS/term_cond';
import NotFound from '../VISTAS/not_found';
import Cookies from 'js-cookie';

function verificarAutenticacion(element, rolesPermitidos) {
  const authToken = Cookies.get('authToken');
  const rolUsuario = Cookies.get('rolUsuario'); // Obtener el rol del usuario desde las cookies

  if (!authToken || !rolesPermitidos.includes(rolUsuario)) {
  // El usuario no ha iniciado sesión o no tiene el rol adecuado, redirigir al inicio de sesión
    return <Navigate to="/" replace={true} />;
  }
  return element;
}


function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/menu_administrador"
          element={verificarAutenticacion(<MenuAdministrador />, ['administrador'])}
        />
        <Route
          path="/menu_docente"
          element={verificarAutenticacion(<MenuDocente />, ['docente'])}
        />

        <Route path="/term_cond" element={<TerminosCondiciones />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
