import { useRef, useState } from "react";
import Pregunta from "./Pregunta";

const sinAnimacion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Segunda pantalla: la lista de propuestas con su escala.
function Cuestionario({ preguntas, respuestas, onResponder, onTerminar }) {
  const [activa, setActiva] = useState(
    preguntas.length ? preguntas[0].id_propuesta : null
  );
  const [avisarFaltantes, setAvisarFaltantes] = useState(false);

  const filas = useRef({});
  const final = useRef(null);

  const respondidas = preguntas.filter(
    (pregunta) => respuestas[pregunta.id_propuesta] !== undefined
  ).length;
  const faltan = preguntas.length - respondidas;
  const porcentaje = preguntas.length
    ? Math.round((respondidas / preguntas.length) * 100)
    : 0;

  const llevarA = (elemento) => {
    if (!elemento) return;
    window.setTimeout(() => {
      elemento.scrollIntoView({
        behavior: sinAnimacion() ? "auto" : "smooth",
        block: "center",
      });
    }, 160);
  };

  const responder = (pregunta, valor, conClic) => {
    const nuevas = { ...respuestas, [pregunta.id_propuesta]: valor };
    onResponder(nuevas);

    if (!conClic) {
      setActiva(pregunta.id_propuesta);
      return;
    }

    // Busca la siguiente sin responder (primero hacia abajo, luego desde arriba).
    const posicion = preguntas.indexOf(pregunta);
    const pendiente = (otra) => nuevas[otra.id_propuesta] === undefined;
    const siguiente =
      preguntas.slice(posicion + 1).find(pendiente) || preguntas.find(pendiente);

    if (siguiente) {
      setActiva(siguiente.id_propuesta);
      llevarA(filas.current[siguiente.id_propuesta]);
    } else {
      setActiva(null);
      llevarA(final.current);
    }
  };

  const terminar = () => {
    if (faltan === 0) {
      onTerminar();
      return;
    }

    const primera = preguntas.find(
      (pregunta) => respuestas[pregunta.id_propuesta] === undefined
    );
    setAvisarFaltantes(true);
    setActiva(primera.id_propuesta);
    llevarA(filas.current[primera.id_propuesta]);
  };

  return (
    <section className="cuestionario">
      <h1 className="cuestionario-titulo">
        ¿Qué tan de acuerdo estás con cada propuesta?
      </h1>

      <div className="progreso">
        <div
          className="progreso-barra"
          role="progressbar"
          aria-label="Propuestas respondidas"
          aria-valuemin={0}
          aria-valuemax={preguntas.length}
          aria-valuenow={respondidas}
        >
          <div className="progreso-relleno" style={{ width: `${porcentaje}%` }} />
        </div>
        <p className="progreso-texto">
          {respondidas} de {preguntas.length}
        </p>
      </div>

      <ol className={`preguntas ${activa !== null ? "preguntas--enfocadas" : ""}`}>
        {preguntas.map((pregunta) => {
          const id = pregunta.id_propuesta;
          return (
            <Pregunta
              key={id}
              ref={(elemento) => {
                filas.current[id] = elemento;
              }}
              propuesta={pregunta}
              valor={respuestas[id]}
              activa={activa === id}
              falta={avisarFaltantes && respuestas[id] === undefined}
              onActivar={() => setActiva(id)}
              onResponder={(valor, conClic) => responder(pregunta, valor, conClic)}
            />
          );
        })}
      </ol>

      <div className="cuestionario-final" ref={final}>
        <button type="button" className="boton" onClick={terminar}>
          Ver mi resultado
        </button>
        <p className="cuestionario-faltan" aria-live="polite">
          {faltan === 0
            ? "Ya respondiste todas las propuestas."
            : faltan === 1
            ? "Te falta 1 propuesta por responder."
            : `Te faltan ${faltan} propuestas por responder.`}
        </p>
      </div>
    </section>
  );
}

export default Cuestionario;
