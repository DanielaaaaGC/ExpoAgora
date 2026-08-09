import Modal from "../common/Modal";
import { IconIdeas } from "../icons/Icon";

const ICONOS_COLOR = {
  banco: "#C97C93", voto: "#7C4F6D", balanza: "#4E8A67", gobierno: "#2E7C63",
  partidos: "#C97C93", lista: "#3E6FA6", mapa: "#D9971F", escudo: "#C97A1F",
};

export default function ModuloDetalleModal({ modulo, onClose }) {
  const color = ICONOS_COLOR[modulo.icono] ?? "#C97C93";

  return (
    <Modal titulo={`${modulo.numero}. ${modulo.nombre}`} onClose={onClose}>
      <p className="text-sm text-agora-muted mb-5">{modulo.resumen}</p>

      <div className="grid lg:grid-cols-[1fr_220px] gap-6 lg:gap-8">
        <div className="space-y-3 text-sm leading-relaxed whitespace-pre-line">
          {modulo.contenido}
        </div>

        <div className="space-y-4 lg:order-none order-first">
          {modulo.puntosClave?.length > 0 && (
            <div className="bg-agora-card-soft rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-agora-muted mb-2.5">
                Ideas clave
              </p>
              <ul className="space-y-2">
                {modulo.puntosClave.map((punto, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-snug">
                    <span
                      className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {modulo.datoClave && (
            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: `${color}1A`, boxShadow: `inset 0 0 0 1px ${color}33` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <IconIdeas size={16} />
                <p className="text-xs font-semibold" style={{ color }}>
                  ¿Sabías que…?
                </p>
              </div>
              <p className="text-xs leading-relaxed text-agora-ink/80">{modulo.datoClave}</p>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{ backgroundColor: color }}
        className="mt-6 w-full rounded-full text-white text-sm font-semibold py-2.5 hover:brightness-105 transition-all"
      >
        Entendido
      </button>
    </Modal>
  );
}
