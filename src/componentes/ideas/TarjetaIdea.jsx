import { useState } from "react";
import Avatar from "./Avatar";
import { fechaLegible } from "../../utils/fechasc";
import { detalleDe, esDocente, nombreCompleto } from "../../utils/personas";

// Colores suaves de las banderas para que el tablero no sea todo igual.
const FONDOS = ["tarjeta--lila", "tarjeta--menta", "tarjeta--rosa", "tarjeta--nube"];

// Una idea en el tablero.
function TarjetaIdea({ idea, esMia, puedeEliminar, nueva, onEliminar }) {
  const [confirmando, setConfirmando] = useState(false);
  const detalle = detalleDe(idea);

  const clases = ["tarjeta", FONDOS[idea.id_idea % FONDOS.length]];
  if (nueva) clases.push("tarjeta--nueva");

  return (
    <li className={clases.join(" ")}>
      <p className="tarjeta-texto">{idea.comentario}</p>

      <div className="tarjeta-pie">
        <Avatar persona={idea} className="tarjeta-avatar" />
        <div className="tarjeta-autor">
          <p className="tarjeta-nombre">
            {nombreCompleto(idea)}
            {esMia && <span className="tarjeta-marca">Tuya</span>}
          </p>
          <p className="tarjeta-datos">
            {detalle && (
              <span className={esDocente(idea) ? "tarjeta-docente" : ""}>{detalle}</span>
            )}
            <time dateTime={idea.fecha || undefined}>{fechaLegible(idea.fecha)}</time>
          </p>
        </div>
      </div>

      {puedeEliminar && (
        <div className="tarjeta-acciones">
          {confirmando ? (
            <span className="confirmar">
              ¿Eliminar esta idea?
              <button
                type="button"
                className="accion accion--peligro"
                onClick={() => onEliminar(idea)}
              >
                Sí, eliminar
              </button>
              <button type="button" className="accion" onClick={() => setConfirmando(false)}>
                No
              </button>
            </span>
          ) : (
            <button type="button" className="accion" onClick={() => setConfirmando(true)}>
              Eliminar
            </button>
          )}
        </div>
      )}
    </li>
  );
}

export default TarjetaIdea;
