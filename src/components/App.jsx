import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/navbar.jsx";
import Carrusel from "./componentes/carrusel.jsx";
import Login from "./componentes/login.jsx";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
