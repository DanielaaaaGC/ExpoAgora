import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./estudiante.css";
import logoA from "../assets/logoA.png";

import Hero from "./hero"; 
import Partidos from "./partidos"; 




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
      {/* Columna 1: Guiar el Poder Estudiantil */}
      <div className="columna-item">
        <animated-icons
          ref={setColIconAttrs}
          src="https://animatedicons.co/get-icon?name=Review&style=minimalistic&token=e271fbe7-23f4-4470-9cc9-ac62bdc729f1"
          trigger="loop"
          height="70"
          width="70"
        ></animated-icons>
        <h2>Guiar el Poder Estudiantil</h2>
        <p>
          Como docentes, acompañamos al estudiantado a encauzar sus ideas y liderazgo, 
          brindándoles las herramientas necesarias para que tomen decisiones informadas y con impacto positivo.
        </p>
      </div>

      {/* Columna 2: Fomentar el Valor del Voto */}
      <div className="columna-item">
        <animated-icons
          ref={setColIconAttrs}
          src="https://animatedicons.co/get-icon?name=Firecracker&style=minimalistic&token=0e6f2ecc-a2ca-45ba-9eab-0926e9b25a78"
          trigger="loop"
          height="70"
          width="70"
        ></animated-icons>
        <h2>Fomentar el Valor del Voto</h2>
        <p>
          Enseñamos la importancia del sufragio consciente y analítico, ayudando a los estudiantes 
          a evaluar propuestas críticamente y comprender la responsabilidad de su elección.
        </p>
      </div>

      {/* Columna 3: Formación en Democracia */}
      <div className="columna-item">
        <animated-icons
          ref={setColIconAttrs}
          src="https://animatedicons.co/get-icon?name=Dynamic%20Role&style=minimalistic&token=deb3f3dc-7e65-4d2a-a47e-e6447f4bab30"
          trigger="loop"
          height="70"
          width="70"
        ></animated-icons>
        <h2>Formación en Democracia</h2>
        <p>
          Promovemos un espacio de aprendizaje cívico donde el diálogo, el respeto y la transparencia 
          sienten las bases para formar ciudadanos participativos y comprometidos desde las aulas.
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
        {/* Inicio */}
        <Link to="/indexprofesor" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Thank%20you&style=minimalistic&token=eb0b9e1a-e71e-4b20-a7dc-7c38f678e237"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Inicio</span>
        </Link>

        {/* NUEVO APARTADO: Estudiantes */}
        <Link to="/estudiantes" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Hire&style=minimalistic&token=ca71a3a4-a898-457d-b398-fae965c6ceb9"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Estudiantes</span>
        </Link>

        {/* Módulos */}
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

        {/* Calendario */}
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

        {/* Comunidad */}
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
      </div>
    </nav>
  );
}

export default function IndexEstudiante() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
      </main>
      
      <TresColumnas />

      <Partidos />
    </div>
  );
}