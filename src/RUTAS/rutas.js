import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../PAGINAS/login';
import MenuAdministrador from '../PAGINAS/menu_administrador';
import MenuDocente from '../PAGINAS/menu_docente';
import TerminosCondiciones from '../PAGINAS/term_cond';
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
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
