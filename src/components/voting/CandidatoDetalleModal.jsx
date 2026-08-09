import Modal from "../common/Modal";

export default function CandidatoDetalleModal({ partido, onClose }) {
  const candidato = partido.miembros.find((m) => m.cargo === "presidente");
  const resto = partido.miembros.filter((m) => m.cargo !== "presidente");

  return (
    <Modal titulo={partido.nombre} onClose={onClose}>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: partido.color }} />
        <p className="text-sm text-agora-muted">{partido.descripcion}</p>
      </div>

      {candidato && (
        <div
          className="flex items-center gap-3 mb-6 bg-agora-card-soft rounded-2xl p-4"
          style={{ boxShadow: `inset 0 0 0 1px ${partido.color}33` }}
        >
          <div
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full grid place-items-center text-xl font-display text-white shrink-0"
            style={{ backgroundColor: partido.color }}
          >
            {candidato.nombre.trim().charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{candidato.nombre}</p>
            <p className="text-xs text-agora-muted">Candidata a la presidencia</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-agora-muted mb-2">
            Directiva completa
          </p>
          <ul className="space-y-1.5">
            {candidato && (
              <li className="flex items-center justify-between text-sm bg-agora-card-soft rounded-lg px-3 py-2">
                <span>{candidato.nombre}</span>
                <span className="capitalize text-agora-muted">presidente</span>
              </li>
            )}
            {resto.map((m) => (
              <li key={m.id_miembro} className="flex items-center justify-between text-sm bg-agora-card-soft rounded-lg px-3 py-2">
                <span>{m.nombre}</span>
                <span className="capitalize text-agora-muted">{m.cargo}</span>
              </li>
            ))}
            {partido.miembros.length === 0 && (
              <p className="text-sm text-agora-muted">Este partido aún no ha registrado directiva.</p>
            )}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-agora-muted mb-2">Propuestas</p>
          <ul className="space-y-2">
            {partido.propuestas.map((p) => (
              <li key={p.id_propuesta} className="bg-agora-card-soft rounded-lg px-3 py-2">
                <p className="text-sm font-medium">{p.titulo}</p>
                <p className="text-xs text-agora-muted mt-0.5">{p.descripcion}</p>
              </li>
            ))}
            {partido.propuestas.length === 0 && (
              <p className="text-sm text-agora-muted">Este partido aún no ha publicado propuestas.</p>
            )}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
