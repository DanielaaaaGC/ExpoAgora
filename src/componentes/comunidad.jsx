import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Proponer from "./ideas/Proponer";
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

export function Navbar() {
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

function CajaIdeas() {
  const [baseDeDatos, setBaseDeDatos] = useState("agora");
  const [usuariosCargados, setUsuariosCargados] = useState(true); // Controla que ya no está cargando
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
      setUsuariosCargados(true); // Desbloquea el formulario
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

        <div className="portada">
          <div className="portada-texto">
            <h1 className="portada-titulo">¿Qué te gustaría que cambiara en el colegio?</h1>
            <p className="portada-bajada">
              Escribe tu idea en la caja. El gobierno estudiantil revisa todas las
              ideas que llegan aquí, y cualquiera puede leerlas en el tablero.
            </p>
            <ul className="portada-pasos">
              <li>
                Escribe lo que te gustaría que se implementara.
              </li>
              <li>
                El gobierno estudiantil las lee para saber qué quieren los estudiantes.
              </li>
              <li>
                Escribe con respeto y lenguaje adecuado, de lo contrario vendrán consecuencias
              </li>
            </ul>

          
          </div>

          <Proponer
            usuarios={usuariosCargados}
            persona={persona}
            onEnviar={enviar}
            bloqueado={Boolean(aviso) || !persona}
          />
        </div>

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