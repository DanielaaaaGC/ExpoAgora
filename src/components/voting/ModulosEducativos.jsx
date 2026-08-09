import { useEffect, useState } from "react";
import { modulosVotacionService } from "../../services/modulosVotacionService";
import ModuloDetalleModal from "./ModuloDetalleModal";
import {
  IconBanco, IconVotaciones, IconBalanza, IconGobierno,
  IconPartidos, IconLista, IconMapa, IconEscudo,
} from "../icons/Icon";

const ICONOS = {
  banco: IconBanco, voto: IconVotaciones, balanza: IconBalanza, gobierno: IconGobierno,
  partidos: IconPartidos, lista: IconLista, mapa: IconMapa, escudo: IconEscudo,
};

export default function ModulosEducativos() {
  const [modulos, setModulos] = useState([]);
  const [abierto, setAbierto] = useState(null);

  useEffect(() => {
    modulosVotacionService.getAll().then(setModulos);
  }, []);

  return (
    <section className="bg-agora-card/40 px-6 sm:px-10 lg:px-14 py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] mb-2">2. Módulos educativos</h2>
        <p className="text-sm text-agora-muted max-w-2xl mb-8 lg:mb-10">
          Ocho recorridos cortos para entender cómo funciona el sistema electoral, antes de
          practicar tu voto. Cada módulo incluye contexto, un dato clave y las ideas más
          importantes para recordar.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {modulos.map((m) => {
            const Icon = ICONOS[m.icono] ?? IconBanco;
            return (
              <div
                key={m.id}
                className="group relative bg-white rounded-3xl p-6 lg:p-7 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-agora-border/60"
              >
                <span className="absolute top-4 left-4 w-6 h-6 rounded-full bg-agora-lilac text-white text-[11px] font-bold grid place-items-center">
                  {m.numero}
                </span>
                <div
                  className="w-16 h-16 lg:w-[4.5rem] lg:h-[4.5rem] rounded-2xl grid place-items-center mx-auto mt-3 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: m.color }}
                >
                  <Icon size={30} />
                </div>
                <p className="font-semibold text-center mt-5">{m.nombre}</p>
                <p className="text-xs text-agora-muted text-center mt-2 flex-1 leading-relaxed">{m.resumen}</p>
                <button
                  type="button"
                  onClick={() => setAbierto(m)}
                  className="mt-5 mx-auto rounded-full px-5 py-2 text-xs font-semibold hover:bg-agora-pink-light transition-colors"
                >
                  Ver módulo
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {abierto && <ModuloDetalleModal modulo={abierto} onClose={() => setAbierto(null)} />}
    </section>
  );
}
