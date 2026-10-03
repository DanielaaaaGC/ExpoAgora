import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/navbar.jsx";
import Carrusel from "./componentes/carrusel.jsx";
import Login from "./componentes/login.jsx";

// 1. Importa tus componentes/páginas de las rutas pendientes
import IndexEstudiante from "./componentes/indexestudiante.jsx"; // Ajusta la ruta del archivo según tu carpeta
// import Profesor from "./componentes/profesor.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página principal */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Carrusel />
            </>
          }
        />

        {/* Página de inicio de sesión */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* 2. Agrega la ruta hacia la página del estudiante */}
        <Route
          path="/indexestudiante"
          element={<IndexEstudiante />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;