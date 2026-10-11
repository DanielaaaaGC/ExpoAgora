import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./estudiante.css";
import logoA from "../assets/logoA.png";

import Hero from "./hero"; 
import Partidos from "./partidos"; 
import InicioAfinidad from "./Inicioafinidad";
import Votacion from "./votacion"; 

function TresColumnas() {
  const attrStringCol =
    '{"variationThumbColour":"#8D7BE8","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#8D7BE8","group-2":"#000000","background":"#FFFFFF00"}}';

  const setColIconAttrs = useCallback((node) => {
    if (node) {
      node.setAttribute("attributes", attrStringCol);
    }
  }, []);

  return (
    <section className="seccion-tres-columnas">
      {/* Columna 1: Poder Estudiantil */}
      <div className="columna-item">
        <animated-icons
          ref={setColIconAttrs}
          src="https://animatedicons.co/get-icon?name=Review&style=minimalistic&token=e271fbe7-23f4-4470-9cc9-ac62bdc729f1"
          trigger="loop"
          height="70"
          width="70"
        ></animated-icons>
        <h2>Poder Estudiantil</h2>
        <p> 
          Al organizarnos y expresar ideas, la comunidad estudiantil asume un rol activo 
          en la construcción de nuestro entorno, permitiendo así que tengamos poder de decidir sobre los temas que nos afectan.
        </p>
      </div>

      {/* Columna 2: Tu Voto Importa */}
      <div className="columna-item">
        <animated-icons
          ref={setColIconAttrs}
          src="https://animatedicons.co/get-icon?name=Firecracker&style=minimalistic&token=0e6f2ecc-a2ca-45ba-9eab-0926e9b25a78"
          trigger="loop"
          height="70"
          width="70"
        ></animated-icons>
        <h2>Tu Voto Importa</h2>
        <p>
          Cada voto representa tu postura frente al futuro de la institución. Es la herramienta 
          clave para respaldar las propuestas que mejor se alinean con las necesidades 
          de la comunidad estudiantil.
        </p>
      </div>

      {/* Columna 3: Importancia de la Participación */}
      <div className="columna-item">
        <animated-icons
          ref={setColIconAttrs}
          src="https://animatedicons.co/get-icon?name=Dynamic%20Role&style=minimalistic&token=deb3f3dc-7e65-4d2a-a47e-e6447f4bab30"
          trigger="loop"
          height="70"
          width="70"
        ></animated-icons>
        <h2>Importancia de la Participación</h2>
        <p>
          Involucrarse en los procesos democráticos fortalece la convivencia, la transparencia 
          y el pensamiento crítico. La participación activa fomenta una ciudadanía responsable 
          desde la etapa escolar.
        </p>
      </div>
    </section>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const scriptId = "animated-icons-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://animatedicons.co/scripts/embed-animated-icons.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const attrString =
    '{"variationThumbColour":"#8D7BE8","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#8D7BE8","group-2":"#000000","background":"#FFFFFF00"}}';

  const setIconAttrs = useCallback((node) => {
    if (node) {
      node.setAttribute("attributes", attrString);
    }
  }, []);

  return (
    <nav className="navbar-estudiante">
      <div className="navbar-logo">
        <img src={logoA} alt="Logo de Ágora" />
        <span>Ágora</span>
      </div>

      <button
        className={`hamburger-btn ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <Link to="/indexestudiante" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Thank%20you&style=minimalistic&token=eb0b9e1a-e71e-4b20-a7dc-7c38f678e237"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Inicio</span>
        </Link>

        <Link to="/modulos" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=checklist&style=minimalistic&token=0d874aa3-6ae4-45c8-9949-aca91ae5739d"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Módulos</span>
        </Link>

        <Link to="/calendario" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=calendar%20V3&style=minimalistic&token=4c41ae18-3a92-43bc-b097-59c6f2c21510"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Calendario</span>
        </Link>

        <Link to="/comunidad" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Audience%20Reach&style=minimalistic&token=a566e2c2-ed78-4e8f-9adb-3283a20f035c"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Comunidad</span>
        </Link>

        <Link to="/notas" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Report%20V2&style=minimalistic&token=1869947d-0b96-4314-9dd7-a86ec7a829ff"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Notas</span>
        </Link>
      </div>
    </nav>
  );
}

export default function IndexEstudiante() {
  // Estado básico de la carga si no viene directamente de tu backend
  const [carga, setCarga] = useState({
    estado: "exito",
    origen: "bd",
    datos: { partidos: [], propuestas: [] },
  });

  const handleComenzar = () => {
    // Aquí puedes redirigir a la vista del quiz o abrir el modal de preguntas
    console.log("Iniciando Quiz de Afinidad...");
  };

  const handleReintentar = () => {
    console.log("Reintentando carga...");
  };

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
      </main>
      
      <TresColumnas />

      <Partidos />

      <InicioAfinidad 

/>

      <Votacion />
    </div>
  );
}
export { Navbar as NavbarEstudiante };
