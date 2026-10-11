import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Tablero from "./ideas/Tablero";
import logoA from "../assets/logoA.png";
import { pedir } from "../utils/api";
import { esDocente } from "../utils/personas";
import "./comunidad.css";

const ESPERA = 8000;

const obtenerUsuarioLogueado = () => {
  try {
    const guardado = localStorage.getItem("usuario") || localStorage.getItem("agora-usuario");
    return guardado ? JSON.parse(guardado) : null;
  } catch (error) {
    return null;
  }
};

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

        {/* Comunidad */}
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

function CajaIdeas() {
  const [baseDeDatos, setBaseDeDatos] = useState("agora");
  const [usuariosCargados, setUsuariosCargados] = useState(true); 
  const [persona] = useState(obtenerUsuarioLogueado());
  const [ideas, setIdeas] = useState(null);
  const [aviso, setAviso] = useState(""); 
  const [errorAccion, setErrorAccion] = useState("");
  const [nueva, setNueva] = useState(null); 

  const version = useRef(0);

  const cargarIdeas = useCallback(async () => {
    const alEmpezar = version.current;
    try {
      const datos = await pedir("/api/ideas");
      if (alEmpezar !== version.current) return;
      setIdeas(datos.ideas || datos);
      setBaseDeDatos(datos.baseDeDatos || "agora");
      setUsuariosCargados(true); 
      setAviso("");
    } catch (error) {
      if (alEmpezar === version.current) setAviso(error.message);
    }
  }, []);

  useEffect(() => {
    cargarIdeas();
  }, [cargarIdeas]);

  useEffect(() => {
    const reloj = window.setInterval(() => {
      if (!document.hidden) cargarIdeas();
    }, ESPERA);
    return () => window.clearInterval(reloj);
  }, [cargarIdeas]);

  const cambiar = async (accion) => {
    version.current += 1;
    setErrorAccion("");
    try {
      return await accion();
    } catch (error) {
      throw error;
    } finally {
      version.current += 1;
      await cargarIdeas();
    }
  };

  const enviar = async (texto) => {
    if (!persona || !persona.id_usuario) {
      throw new Error("Debes iniciar sesión para enviar una idea.");
    }
    const respuesta = await cambiar(() =>
      pedir("/api/ideas", "POST", { id_usuario: persona.id_usuario, comentario: texto })
    );
    const id_idea = respuesta.id_idea;
    setNueva(id_idea);
    window.setTimeout(() => setNueva((actual) => (actual === id_idea ? null : actual)), 4000);
  };

  const eliminar = (idea) => {
    cambiar(() => pedir(`/api/ideas/${idea.id_idea}`, "DELETE")).catch(
      (error) => setErrorAccion(error.message)
    );
  };

  return (
    <>
      <Navbar />
      <main className="caja-pagina">
        {aviso && (
          <div className="aviso" role="status">
            <p>
              <strong>Sin conexión con la base de datos.</strong> {aviso}
            </p>
            <button type="button" className="aviso-boton" onClick={cargarIdeas}>
              Reintentar
            </button>
          </div>
        )}

    
        {errorAccion && (
          <p className="error-accion" role="alert">
            {errorAccion}
          </p>
        )}

        {ideas ? (
          <Tablero
            ideas={ideas}
            yo={persona ? persona.id_usuario : null}
            modero={Boolean(persona) && esDocente(persona)}
            nueva={nueva}
            onEliminar={eliminar}
          />
        ) : (
          !aviso && <p className="cargando">Cargando ideas…</p>
        )}
      </main>
    </>
  );
}

export default CajaIdeas;