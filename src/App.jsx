import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./componentes/navbar.jsx";
import Modulos, { DetalleModulo } from "./componentes/Modulos.jsx";
import Notas from "./componentes/Notas.jsx";
import JuegosModulo from "./componentes/JuegosModulo.jsx";
import AulaOriginal from "./componentes/AulaOriginal.jsx";
import Carrusel from "./componentes/carrusel.jsx";
import Login from "./componentes/login.jsx";

import IndexEstudiante from "./componentes/indexestudiante.jsx";
import IndexProfesor from "./componentes/indexprofesor.jsx";
import Estudiantes from "./componentes/estudiantes.jsx";
import ComunidadP from "./componentes/comunidadprofe.jsx";
import Chatbot from './componentes/chatbot.jsx';
import CrearPartido from "./componentes/CrearPartido.jsx";
import Comunidad from "./componentes/comunidad.jsx";
import Calendario from "./componentes/Calendario.jsx"; 
import CalendarioProfe from "./componentes/CalendarioProfe.jsx"; 

function AppContent() {
  const location = useLocation();

  // Ocultar chatbot si la ruta actual es exactamente '/login'
  const ocultarChatbot = location.pathname === "/login";

  return (
    <>
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
        <Route path="/modulos" element={<Modulos />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/comunidadprofe" element={<ComunidadP />} />
        <Route path="/modulos/:id" element={<DetalleModulo />} />
        <Route path="/modulos/:id/juegos" element={<JuegosModulo />} />
        <Route path="/aula" element={<AulaOriginal />} />
        <Route path="/notas" element={<Notas />} />

  
        <Route path="/calendario" element={<Calendario />} />

        <Route path="/calendarioprofe" element={<CalendarioProfe />} />
        <Route path="/calendario-profesor" element={<CalendarioProfe />} />
        <Route path="/crearpartido" element={<CrearPartido />} />
      </Routes>


      {!ocultarChatbot && <Chatbot />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;