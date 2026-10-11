import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./estudiante.css";
import logoA from "../assets/logoA.png";

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

        {/* Estudiantes */}
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

        <Link to="/crearpartido" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Edit%20V2&style=minimalistic&token=103ba7b6-a0d9-4d83-87ae-7aceb8cc75aa"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Crear partido</span>
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

        <Link to="/notas" className="nav-item" onClick={closeMenu}><span style={{fontSize:28,width:45,textAlign:"center"}} aria-hidden="true">▤</span><span>Notas</span></Link>

        {/* Calendario */}
        <Link to="/calendarioprofe" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=calendar%20V3&style=minimalistic&token=4c41ae18-3a92-43bc-b097-59c6f2c21510"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Calendario</span>
        </Link>

        <Link to="/comunidadprofe" className="nav-item" onClick={closeMenu}>
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
export default Navbar;