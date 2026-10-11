import { useMemo, useState } from "react";
import Avatar from "./Avatar";
import { detalleDe, nombreCompleto } from "../../utils/personas";

const sinTildes = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const MAXIMO = 40; // nombres que se muestran a la vez

// Buscador para elegir quién eres (hace las veces de inicio de sesión).
function BuscarPersona({ usuarios, onElegir, onCancelar }) {
  const [busqueda, setBusqueda] = useState("");

  const encontrados = useMemo(() => {
    const palabras = sinTildes(busqueda).split(/\s+/).filter(Boolean);
    if (palabras.length === 0) return usuarios;
    return usuarios.filter((persona) => {
      const texto = sinTildes(`${nombreCompleto(persona)} ${persona.curso || ""}`);
      return palabras.every((palabra) => texto.includes(palabra));
    });
  }, [usuarios, busqueda]);

  if (usuarios.length === 0) {
    return (
      <p className="buscar-vacio">
        No hay usuarios registrados en la base de datos. Agrega al menos uno en
        la tabla usuario para poder enviar ideas.
      </p>
    );
  }

  return (
    <div className="buscar">
      <label className="campo-etiqueta" htmlFor="buscar-persona">
        Primero, busca tu nombre
      </label>
      <input
        id="buscar-persona"
        className="campo-control"
        type="search"
        autoComplete="off"
        placeholder="Ej.: Valeria Solano"
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      {encontrados.length === 0 ? (
        <p className="buscar-vacio">Nadie coincide con «{busqueda.trim()}».</p>
      ) : (
        <ul className="buscar-lista">
          {encontrados.slice(0, MAXIMO).map((persona) => (
            <li key={persona.id_usuario}>
              <button
                type="button"
                className="buscar-persona"
                onClick={() => onElegir(persona.id_usuario)}
              >
                <Avatar persona={persona} />
                <span className="buscar-nombre">{nombreCompleto(persona)}</span>
                {detalleDe(persona) && (
                  <span className="buscar-detalle">{detalleDe(persona)}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {encontrados.length > MAXIMO && (
        <p className="buscar-nota">
          Hay {encontrados.length} personas. Escribe tu nombre para encontrarte
          más rápido.
        </p>
      )}

      {onCancelar && (
        <button type="button" className="boton-texto" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </div>
  );
}

export default BuscarPersona;
