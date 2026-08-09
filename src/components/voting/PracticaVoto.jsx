
import { useEffect, useState } from "react";
import { partidosService } from "../../services/partidosService";
import { votosService } from "../../services/votosService";
import { IconVotaciones } from "../icons/Icon";

// En producción este id vendría de la sesión del estudiante autenticado.
const ID_ESTUDIANTE_DEMO = 100;

const PASOS = [
  { n: 1, titulo: "Conoce la boleta", texto: "Explora cómo es la boleta real y sus secciones." },
  { n: 2, titulo: "Selecciona tu opción", texto: "Elige a tu candidato o partido como lo harías el día de la elección." },
  { n: 3, titulo: "Confirma tu voto", texto: "Revisa tu selección y deposita tu voto en la urna." },
  { n: 4, titulo: "¡Listo!", texto: "Has completado el simulacro. Tu participación hace la diferencia." },
];

export default function PracticaVoto() {
  const [partidos, setPartidos] = useState([]);
  const [paso, setPaso] = useState(1);
  const [seleccion, setSeleccion] = useState(null); // id_partido | "blanco" | null
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    partidosService.getAll().then(setPartidos);
  }, []);

  async function confirmarVoto() {
    setEnviando(true);
    await votosService.registrar({
      id_estudiante: ID_ESTUDIANTE_DEMO,
      id_partido: seleccion === "blanco" ? null : seleccion,
    });
    setEnviando(false);
    setPaso(4);
  }

  function reiniciar() {
    setSeleccion(null);
    setPaso(1);
  }

  const partidoElegido = partidos.find((p) => p.id_partido === seleccion);

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-14 sm:py-16 lg:py-20">

      {/* Encabezado */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-1.5 rounded-full bg-[#8B7AD8]" />
          <span className="w-6 h-1.5 rounded-full bg-[#E98BB5]" />
          <span className="w-6 h-1.5 rounded-full bg-[#5B8DEF]" />
          <span className="w-6 h-1.5 rounded-full bg-[#4FC3C1]" />
          <span className="w-6 h-1.5 rounded-full bg-[#F4C95D]" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] text-[#29263D]">
          3. Practica tu voto
        </h2>

        <p className="text-sm text-[#77738B] mb-8 lg:mb-10 max-w-2xl mt-2">
          Realiza un simulacro paso a paso y familiarízate con la boleta.
        </p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr_280px] gap-8 lg:gap-10">

        {/* Pasos */}
        <ol className="relative pl-6 border-l-2 border-dashed border-[#E5E0F1] space-y-6">
          {PASOS.map((p) => (
            <li key={p.n} className="relative">

              <span
                className={`absolute -left-[31px] top-0 w-7 h-7 rounded-full grid place-items-center text-xs font-bold transition-all ${
                  paso >= p.n
                    ? "text-white"
                    : "bg-[#F1EFF8] text-[#77738B]"
                }`}
                style={{
                  backgroundColor:
                    paso >= p.n
                      ? [
                          "#8B7AD8",
                          "#5B8DEF",
                          "#4FC3C1",
                          "#F4C95D",
                        ][p.n - 1]
                      : undefined,
                }}
              >
                {p.n}
              </span>

              <p className="font-semibold text-sm text-[#29263D]">
                {p.titulo}
              </p>

              <p className="text-xs text-[#77738B] mt-0.5">
                {p.texto}
              </p>
            </li>
          ))}
        </ol>

        {/* Boleta */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgba(70,62,110,0.08)] border border-[#E8E4F2]">

          <div className="text-center mb-5">

            <div className="flex justify-center gap-1.5 mb-3">
              <span className="w-5 h-1 rounded-full bg-[#8B7AD8]" />
              <span className="w-5 h-1 rounded-full bg-[#E98BB5]" />
              <span className="w-5 h-1 rounded-full bg-[#5B8DEF]" />
              <span className="w-5 h-1 rounded-full bg-[#4FC3C1]" />
              <span className="w-5 h-1 rounded-full bg-[#F4C95D]" />
            </div>

            <p className="font-display text-xl text-[#29263D]">
              Elecciones estudiantiles 2026
            </p>

            <p className="text-xs text-[#77738B]">
              Presidencia del Gobierno Estudiantil
            </p>

            <p className="text-xs text-[#77738B] mt-1">
              Marque una sola opción
            </p>
          </div>

          {paso === 1 && (
            <div className="text-center py-6">

              <p className="text-sm text-[#4F4B63] max-w-sm mx-auto">
                Esta es la boleta oficial del simulacro: cada recuadro representa un partido,
                con su color, su candidato/a y una estrella para marcar tu opción. Al final
                también puedes votar en blanco.
              </p>

              <button
                type="button"
                onClick={() => setPaso(2)}
                className="
                  mt-5
                  rounded-full
                  text-white
                  text-sm
                  font-semibold
                  px-6
                  py-2.5
                  transition-all
                  hover:shadow-md
                  hover:-translate-y-0.5
                "
                style={{
                  background: "linear-gradient(90deg, #8B7AD8, #5B8DEF)",
                }}
              >
                Comenzar simulacro →
              </button>
            </div>
          )}

          {(paso === 2 || paso === 3) && (
            <div className="grid grid-cols-2 gap-4">

              {partidos.map((p) => {
                const candidato = p.miembros.find(
                  (m) => m.cargo === "presidente"
                );

                const activo = seleccion === p.id_partido;

                return (
                  <button
                    key={p.id_partido}
                    type="button"
                    disabled={paso === 3}
                    onClick={() => setSeleccion(p.id_partido)}
                    style={{
                      borderColor: p.color,
                      backgroundColor: activo
                        ? `${p.color}1A`
                        : "white",
                    }}
                    className={`
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border-2
                      p-4
                      text-left
                      transition-all
                      hover:shadow-md
                      ${
                        activo
                          ? "shadow-md scale-[1.02]"
                          : ""
                      }
                      disabled:opacity-60
                      disabled:hover:shadow-none
                      disabled:hover:scale-100
                    `}
                  >
                    <span
                      className="text-2xl leading-none shrink-0"
                      style={{ color: p.color }}
                    >
                      {activo ? "★" : "☆"}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold truncate text-[#29263D]">
                        {candidato?.nombre ?? p.nombre}
                      </span>

                      <span className="block text-xs text-[#77738B] truncate">
                        {p.nombre}
                      </span>
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                disabled={paso === 3}
                onClick={() => setSeleccion("blanco")}
                className={`
                  col-span-2
                  rounded-2xl
                  border-2
                  border-[#8B7AD8]
                  p-4
                  text-center
                  text-sm
                  font-semibold
                  text-[#6D62B5]
                  transition-all
                  hover:shadow-md
                  disabled:opacity-60
                  disabled:hover:shadow-none
                  ${
                    seleccion === "blanco"
                      ? "bg-[#F1EEFC] shadow-md"
                      : "bg-white"
                  }
                `}
              >
                {seleccion === "blanco" ? "★" : "☆"} Voto en blanco
              </button>
            </div>
          )}

          {paso === 4 && (
            <div className="text-center py-6">

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  rounded-full
                  grid
                  place-items-center
                  mb-3
                "
                style={{
                  backgroundColor: "#DDF5F1",
                  color: "#4FC3C1",
                }}
              >
                <IconVotaciones size={28} />
              </div>

              <p className="font-semibold text-[#29263D]">
                {seleccion === "blanco"
                  ? "Registraste un voto en blanco."
                  : `Votaste por ${partidoElegido?.nombre ?? "tu opción"}.`}
              </p>

              <button
                type="button"
                onClick={reiniciar}
                className="
                  mt-4
                  rounded-full
                  bg-white
                  border
                  border-[#8B7AD8]
                  text-[#6D62B5]
                  text-sm
                  font-semibold
                  px-5
                  py-2
                  hover:bg-[#F1EEFC]
                  transition-colors
                "
              >
                Volver a intentar
              </button>
            </div>
          )}

          {paso === 2 && (
            <button
              type="button"
              disabled={!seleccion}
              onClick={() => setPaso(3)}
              className="
                mt-5
                w-full
                rounded-full
                text-white
                text-sm
                font-semibold
                py-2.5
                disabled:opacity-40
                transition-all
                hover:shadow-md
              "
              style={{
                background:
                  "linear-gradient(90deg, #8B7AD8, #5B8DEF)",
              }}
            >
              Continuar
            </button>
          )}

          {paso === 3 && (
            <div className="mt-5 flex gap-3">

              <button
                type="button"
                onClick={() => setPaso(2)}
                className="
                  flex-1
                  rounded-full
                  bg-white
                  border
                  border-[#E8E4F2]
                  text-[#6D6880]
                  text-sm
                  font-semibold
                  py-2.5
                  hover:bg-[#F7F5FC]
                  transition-colors
                "
              >
                Cambiar
              </button>

              <button
                type="button"
                disabled={enviando}
                onClick={confirmarVoto}
                className="
                  flex-1
                  rounded-full
                  text-white
                  text-sm
                  font-semibold
                  py-2.5
                  disabled:opacity-60
                  transition-all
                  hover:shadow-md
                "
                style={{
                  background:
                    "linear-gradient(90deg, #E98BB5, #8B7AD8)",
                }}
              >
                {enviando
                  ? "Depositando…"
                  : "Confirmar y depositar"}
              </button>
            </div>
          )}
        </div>

        {/* Nota de simulacro */}
        <div
          className="
            rounded-3xl
            p-6
            h-fit
            border
          "
          style={{
            background:
              "linear-gradient(145deg, #F3F0FC, #EEF8F7)",
            borderColor: "#E3DEEF",
          }}
        >

          <div className="flex gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-[#8B7AD8]" />
            <span className="w-3 h-3 rounded-full bg-[#E98BB5]" />
            <span className="w-3 h-3 rounded-full bg-[#5B8DEF]" />
            <span className="w-3 h-3 rounded-full bg-[#4FC3C1]" />
            <span className="w-3 h-3 rounded-full bg-[#F4C95D]" />
          </div>

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-white
              grid
              place-items-center
              mb-3
            "
            style={{
              color: "#8B7AD8",
            }}
          >
            <IconVotaciones size={24} />
          </div>

          <p className="font-semibold text-sm text-[#29263D]">
            Este es un simulacro
          </p>

          <p className="text-xs text-[#77738B] mt-1">
            Tus respuestas se guardan solo como práctica educativa: no tienen
            validez oficial ni sustituyen una elección real.
          </p>
        </div>
      </div>
    </section>
  );
}

