import { useState } from "react";
import Avatar from "./Avatar";
import BuscarPersona from "./BuscarPersona";
import { LIMITE_TEXTO, nombreCompleto } from "../../utils/personas";

// Tarjeta para escribir y enviar una idea.
function Proponer({ usuarios, persona, onElegir, onEnviar, bloqueado }) {
  const [cambiando, setCambiando] = useState(false);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [enviada, setEnviada] = useState(false);

  const elegir = (id) => {
    onElegir(id);
    setCambiando(false);
  };

  const enviar = async (evento) => {
    evento.preventDefault();
    const limpio = texto.trim();
    if (!limpio) {
      setError("Escribe tu idea antes de enviarla.");
      return;
    }

    setEnviando(true);
    setError("");
    setEnviada(false);
    try {
      await onEnviar(limpio);
      setTexto("");
      setEnviada(true);
    } catch (problema) {
      // El texto se queda para poder intentarlo otra vez.
      setError(problema.message);
    } finally {
      setEnviando(false);
    }
  };

  const faltan = LIMITE_TEXTO - texto.length;

  return (
    <section className="proponer" aria-labelledby="proponer-titulo">
      <h2 className="proponer-titulo" id="proponer-titulo">
        Proponer una idea
      </h2>

      {!usuarios ? (
        <p className="buscar-vacio">Cargando…</p>
      ) : !persona || cambiando ? (
        <BuscarPersona
          usuarios={usuarios}
          onElegir={elegir}
          onCancelar={persona ? () => setCambiando(false) : null}
        />
      ) : (
        <form onSubmit={enviar} noValidate>
          <div className="proponer-quien">
            <Avatar persona={persona} />
            <p>
              Envías como <strong>{nombreCompleto(persona)}</strong>
            
            </p>
          </div>

          <label className="campo-etiqueta" htmlFor="idea">
            ¿Qué te gustaría que se implementara?
          </label>
          <textarea
            id="idea"
            className={`campo-control proponer-texto ${error ? "campo-control--error" : ""}`}
            rows={5}
            maxLength={LIMITE_TEXTO}
            placeholder="Me gustaría que el colegio…"
            value={texto}
            aria-invalid={error ? "true" : undefined}
            aria-describedby="idea-ayuda"
            onChange={(evento) => {
              setTexto(evento.target.value);
              setEnviada(false);
              if (error) setError("");
            }}
          />
          <div className="proponer-pie" id="idea-ayuda">
            <span>Cuenta qué te gustaría y por qué ayudaría.</span>
            <span className={faltan <= 50 ? "proponer-cuenta--poco" : ""}>
              {texto.length}/{LIMITE_TEXTO}
            </span>
          </div>

          {error && (
            <p className="proponer-error" role="alert">
              {error}
            </p>
          )}
          {enviada && (
            <p className="proponer-listo" role="status">
              Listo, tu idea ya está en la caja. El gobierno estudiantil la puede
              ver en el tablero.
            </p>
          )}

          <button type="submit" className="boton" disabled={enviando || bloqueado}>
            {enviando ? "Enviando…" : "Enviar idea"}
          </button>
        </form>
      )}
    </section>
  );
}

export default Proponer;
