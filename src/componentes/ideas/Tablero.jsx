import { useMemo, useState } from "react";
import TarjetaIdea from "./TarjetaIdea";
import { descargarIdeas } from "../../utils/archivo";
import { aFecha, esDeEstaSemana } from "../../utils/fechasc";
import { nombreCompleto } from "../../utils/personas";

const sinTildes = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const SIN_CURSO = "__sin_curso__";

const plural = (cantidad, uno, varios) => (cantidad === 1 ? `1 ${uno}` : `${cantidad} ${varios}`);

// Todas las ideas, con buscador, filtro por curso y orden.
function Tablero({ ideas, yo, modero, nueva, onEliminar }) {
  const [busqueda, setBusqueda] = useState("");
  const [curso, setCurso] = useState("");
  const [orden, setOrden] = useState("recientes");

  // Cursos que aparecen en las ideas, para el filtro.
  const cursos = useMemo(() => {
    const lista = new Set();
    let haySinCurso = false;
    ideas.forEach((idea) => {
      if (idea.curso) idea.curso.split(", ").forEach((uno) => lista.add(uno));
      else haySinCurso = true;
    });
    return {
      lista: [...lista].sort((a, b) => a.localeCompare(b, "es", { numeric: true })),
      haySinCurso,
    };
  }, [ideas]);

  const visibles = useMemo(() => {
    const palabras = sinTildes(busqueda).split(/\s+/).filter(Boolean);

    const filtradas = ideas.filter((idea) => {
      if (curso === SIN_CURSO && idea.curso) return false;
      if (curso && curso !== SIN_CURSO && !(idea.curso || "").split(", ").includes(curso)) {
        return false;
      }
      if (palabras.length === 0) return true;
      const texto = sinTildes(`${idea.comentario} ${nombreCompleto(idea)}`);
      return palabras.every((palabra) => texto.includes(palabra));
    });

    const tiempo = (idea) => (aFecha(idea.fecha) || new Date(0)).getTime();
    return filtradas.sort((a, b) =>
      orden === "recientes"
        ? tiempo(b) - tiempo(a) || b.id_idea - a.id_idea
        : tiempo(a) - tiempo(b) || a.id_idea - b.id_idea
    );
  }, [ideas, busqueda, curso, orden]);

  const personas = new Set(ideas.map((idea) => idea.id_usuario)).size;
  const semana = ideas.filter((idea) => esDeEstaSemana(idea.fecha)).length;
  const filtrando = busqueda.trim() !== "" || curso !== "";

  return (
    <section className="tablero" aria-labelledby="tablero-titulo">
      <div className="tablero-cabecera">
        <div>
          <h2 className="tablero-titulo" id="tablero-titulo">
            Ideas de los estudiantes
          </h2>
          <p className="tablero-resumen">
            {plural(ideas.length, "idea", "ideas")} de {plural(personas, "persona", "personas")}
            {semana > 0 && `, ${semana} en los últimos 7 días`}
          </p>
        </div>

        {ideas.length > 0 && (
          <button
            type="button"
            className="boton-secundario"
            onClick={() => descargarIdeas(visibles)}
          >
            Descargar lista
          </button>
        )}
      </div>

      {ideas.length > 0 && (
        <div className="tablero-filtros">
          <div className="filtro filtro--buscar">
            <label className="campo-etiqueta" htmlFor="filtro-buscar">
              Buscar
            </label>
            <input
              id="filtro-buscar"
              className="campo-control"
              type="search"
              placeholder="Palabra o nombre"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>

          <div className="filtro">
            <label className="campo-etiqueta" htmlFor="filtro-curso">
              Curso
            </label>
            <select
              id="filtro-curso"
              className="campo-control"
              value={curso}
              onChange={(evento) => setCurso(evento.target.value)}
            >
              <option value="">Todos</option>
              {cursos.lista.map((uno) => (
                <option key={uno} value={uno}>
                  {uno}
                </option>
              ))}
              {cursos.haySinCurso && <option value={SIN_CURSO}>Sin curso o docentes</option>}
            </select>
          </div>

          <div className="filtro">
            <label className="campo-etiqueta" htmlFor="filtro-orden">
              Orden
            </label>
            <select
              id="filtro-orden"
              className="campo-control"
              value={orden}
              onChange={(evento) => setOrden(evento.target.value)}
            >
              <option value="recientes">Más recientes</option>
              <option value="antiguas">Más antiguas</option>
            </select>
          </div>
        </div>
      )}

      {filtrando && ideas.length > 0 && (
        <p className="tablero-filtrado" role="status">
          {visibles.length === 0
            ? "Ninguna idea coincide con la búsqueda."
            : `Mostrando ${plural(visibles.length, "idea", "ideas")}.`}{" "}
          <button
            type="button"
            className="boton-texto"
            onClick={() => {
              setBusqueda("");
              setCurso("");
            }}
          >
            Ver todas
          </button>
        </p>
      )}

      {ideas.length === 0 ? (
        <div className="tablero-vacio">
          <p className="tablero-vacio-titulo">Todavía no hay ideas.</p>
          <p>La primera puede ser la tuya.</p>
        </div>
      ) : (
        <ul className="tarjetas">
          {visibles.map((idea) => (
            <TarjetaIdea
              key={idea.id_idea}
              idea={idea}
              esMia={idea.id_usuario === yo}
              puedeEliminar={idea.id_usuario === yo || modero}
              nueva={idea.id_idea === nueva}
              onEliminar={onEliminar}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default Tablero;
