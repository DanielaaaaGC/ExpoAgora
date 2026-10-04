import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/navbar.jsx";
import Carrusel from "./componentes/carrusel.jsx";
import Login from "./componentes/login.jsx";

import IndexEstudiante from "./componentes/indexestudiante.jsx";
import IndexProfesor from "./componentes/indexprofesor.jsx";
import Estudiantes from "./componentes/estudiantes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

   
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Carrusel />
            </>
          }
        />


        <Route path="/login" element={<Login />} />

       
        <Route path="/indexestudiante" element={<IndexEstudiante />} />
        <Route path="/indexprofesor" element={<IndexProfesor />} />


        <Route path="/estudiantes" element={<Estudiantes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;