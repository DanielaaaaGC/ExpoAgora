
import { useEffect, useState } from "react";
import { partidosService } from "../../services/partidosService";
import CandidatoDetalleModal from "./CandidatoDetalleModal";

/*
  PALETA ÁGORA
  --------------------------------
  Lila      #8B7AD8
  Rosa      #E98BB5
  Azul      #5B8DEF
  Turquesa  #4FC3C1
  Amarillo  #F4C95D
*/

const COLORES_AGORA = {
  lila: "#8B7AD8",
  rosa: "#E98BB5",
  azul: "#5B8DEF",
  turquesa: "#4FC3C1",
  amarillo: "#F4C95D",

  fondo: "#F8F7FC",
  texto: "#29263D",
  textoSuave: "#77738B",
  borde: "#E8E4F2",
  blanco: "#FFFFFF",
};

function TarjetaCandidato({ p, onVerDetalle, indice }) {
  const candidato = p.miembros?.find(
    (m) => m.cargo?.toLowerCase() === "presidente"
  );

  const inicial = (candidato?.nombre ?? p.nombre ?? "P")
    .trim()
    .charAt(0)
    .toUpperCase();

  /*
    Cada tarjeta recibe un color diferente
    para aprovechar toda la identidad de Ágora.
  */
  const colores = [
    COLORES_AGORA.lila,
    COLORES_AGORA.azul,
    COLORES_AGORA.turquesa,
    COLORES_AGORA.rosa,
    COLORES_AGORA.amarillo,
  ];

  const colorAcento = colores[indice % colores.length];

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        bg-white
        rounded-[28px]
        p-6
        flex
        flex-col
        items-center
        text-center
        border
        border-[#E8E4F2]
        shadow-[0_8px_28px_rgba(70,62,110,0.08)]
        hover:shadow-[0_16px_38px_rgba(70,62,110,0.14)]
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* =================================
          BARRA SUPERIOR DE COLOR
      ================================== */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: `linear-gradient(
            90deg,
            ${colorAcento},
            ${COLORES_AGORA.lila}
          )`,
        }}
      />

      {/* =================================
          CÍRCULO DECORATIVO
      ================================== */}
      <div
        className="
          absolute
          -top-16
          -right-16
          w-36
          h-36
          rounded-full
          opacity-[0.08]
          pointer-events-none
        "
        style={{
          backgroundColor: colorAcento,
        }}
      />

      {/* Segundo círculo decorativo */}
      <div
        className="
          absolute
          -bottom-16
          -left-16
          w-32
          h-32
          rounded-full
          opacity-[0.05]
          pointer-events-none
        "
        style={{
          backgroundColor: COLORES_AGORA.turquesa,
        }}
      />

      {/* =================================
          AVATAR
      ================================== */}
      <div
        className="
          relative
          w-20
          h-20
          lg:w-24
          lg:h-24
          rounded-full
          grid
          place-items-center
          text-2xl
          lg:text-3xl
          font-display
          font-semibold
          text-white
          shrink-0
          ring-4
          ring-[#F3F0FA]
          transition-transform
          duration-300
          group-hover:scale-105
        "
        style={{
          background: `linear-gradient(
            145deg,
            ${colorAcento},
            ${COLORES_AGORA.lila}
          )`,
          boxShadow: `0 10px 25px -8px ${colorAcento}99`,
        }}
      >
        {inicial}
      </div>

      {/* =================================
          NOMBRE
      ================================== */}
      <p
        className="
          font-display
          font-semibold
          text-[#29263D]
          text-base
          lg:text-lg
          mt-4
        "
      >
        {candidato?.nombre ?? "Candidatura pendiente"}
      </p>

      {/* Cargo */}
      <p className="text-xs text-[#77738B] mt-1">
        Candidata/o a la presidencia
      </p>

      {/* =================================
          PARTIDO
      ================================== */}
      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          font-medium
          mt-4
          rounded-full
          px-3.5
          py-1.5
        "
        style={{
          backgroundColor: `${colorAcento}18`,
          color: colorAcento,
        }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{
            backgroundColor: colorAcento,
          }}
        />

        <span>{p.nombre}</span>
      </div>

      {/* =================================
          BOTÓN
      ================================== */}
      <button
        type="button"
        onClick={() => onVerDetalle(p)}
        className="
          mt-5
          w-full
          rounded-full
          border-2
          px-5
          py-2
          text-xs
          font-semibold
          transition-all
          duration-200
          bg-white
          hover:text-white
          hover:shadow-md
        "
        style={{
          borderColor: colorAcento,
          color: colorAcento,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colorAcento;
          e.currentTarget.style.color = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#FFFFFF";
          e.currentTarget.style.color = colorAcento;
        }}
      >
        Ver directiva y propuestas
      </button>
    </div>
  );
}

export default function CandidatosCarousel() {
  const [partidos, setPartidos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    partidosService
      .getAll()
      .then((data) => {
        if (activo) {
          setPartidos(data);
          setCargando(false);
        }
      })
      .catch((error) => {
        console.error("Error al cargar los partidos:", error);

        if (activo) {
          setPartidos([]);
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <section
      className="
        w-full
        max-w-7xl
        mx-auto
        px-5
        sm:px-8
        lg:px-12
        py-12
        sm:py-16
        lg:py-20
      "
    >
      {/* =========================================
          ENCABEZADO
      ========================================== */}
      <div className="mb-9 lg:mb-11">

        {/* Decoración multicolor */}
        <div className="flex items-center gap-2 mb-4">

          <span
            className="w-10 h-1.5 rounded-full"
            style={{ backgroundColor: COLORES_AGORA.lila }}
          />

          <span
            className="w-7 h-1.5 rounded-full"
            style={{ backgroundColor: COLORES_AGORA.rosa }}
          />

          <span
            className="w-7 h-1.5 rounded-full"
            style={{ backgroundColor: COLORES_AGORA.azul }}
          />

          <span
            className="w-7 h-1.5 rounded-full"
            style={{ backgroundColor: COLORES_AGORA.turquesa }}
          />

          <span
            className="w-7 h-1.5 rounded-full"
            style={{ backgroundColor: COLORES_AGORA.amarillo }}
          />
        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-4
          "
        >
          <div>

            {/* Número de sección */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="
                  text-xs
                  font-bold
                  px-2.5
                  py-1
                  rounded-full
                  text-white
                "
                style={{
                  backgroundColor: COLORES_AGORA.lila,
                }}
              >
                01
              </span>

              <span
                className="
                  text-xs
                  font-semibold
                "
                style={{
                  color: COLORES_AGORA.turquesa,
                }}
              >
                PARTICIPACIÓN CIUDADANA
              </span>
            </div>

            <h2
              className="
                font-display
                font-semibold
                text-[#29263D]
                text-2xl
                sm:text-3xl
                lg:text-[2.4rem]
                leading-tight
              "
            >
              Conoce a los partidos políticos
            </h2>

            <p
              className="
                text-sm
                text-[#77738B]
                max-w-2xl
                mt-3
                leading-relaxed
              "
            >
              Explora los perfiles, trayectorias y propuestas de quienes
              compiten, además de informarte sobre las organizaciones
              políticas y sus principales propuestas.
            </p>
          </div>

          {/* =================================
              CONTADOR
          ================================== */}
          {partidos.length > 0 && (
            <div
              className="
                hidden
                sm:flex
                items-center
                gap-2
                shrink-0
                rounded-full
                px-4
                py-2
                text-xs
                font-semibold
                border
              "
              style={{
                backgroundColor: `${COLORES_AGORA.amarillo}22`,
                borderColor: `${COLORES_AGORA.amarillo}55`,
                color: "#80651B",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: COLORES_AGORA.amarillo,
                }}
              />

              {partidos.length} partidos inscritos
            </div>
          )}
        </div>
      </div>

      {/* =========================================
          CARGANDO
      ========================================== */}
      {cargando && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
            lg:gap-6
          "
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="
                h-[330px]
                rounded-[28px]
                border
                border-[#E8E4F2]
                bg-[#F8F7FC]
                animate-pulse
                overflow-hidden
              "
            >
              <div className="h-1.5 bg-[#E8E4F2]" />

              <div className="flex flex-col items-center p-6">

                <div className="w-24 h-24 rounded-full bg-[#E9E5F4]" />

                <div className="w-32 h-4 rounded-full bg-[#E9E5F4] mt-5" />

                <div className="w-24 h-3 rounded-full bg-[#E9E5F4] mt-3" />

                <div className="w-28 h-7 rounded-full bg-[#E9E5F4] mt-5" />

                <div className="w-full h-9 rounded-full bg-[#E9E5F4] mt-5" />

              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================
          SIN PARTIDOS
      ========================================== */}
      {!cargando && partidos.length === 0 && (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            py-14
            px-6
            rounded-[28px]
            border
          "
          style={{
            backgroundColor: `${COLORES_AGORA.lila}08`,
            borderColor: `${COLORES_AGORA.lila}25`,
          }}
        >
          <div
            className="
              w-14
              h-14
              rounded-full
              grid
              place-items-center
              text-xl
              font-bold
              text-white
            "
            style={{
              background: `linear-gradient(
                135deg,
                ${COLORES_AGORA.lila},
                ${COLORES_AGORA.azul}
              )`,
            }}
          >
            !
          </div>

          <p className="text-sm font-semibold text-[#403D55] mt-4">
            Aún no hay partidos registrados.
          </p>

          <p className="text-xs text-[#858196] mt-1">
            Los partidos aparecerán aquí cuando sean registrados.
          </p>
        </div>
      )}

      {/* =========================================
          TARJETAS
      ========================================== */}
      {!cargando && partidos.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
            lg:gap-6
          "
        >
          {partidos.map((p, indice) => (
            <TarjetaCandidato
              key={p.id_partido}
              p={p}
              indice={indice}
              onVerDetalle={setSeleccionado}
            />
          ))}
        </div>
      )}

      {/* =========================================
          MODAL
      ========================================== */}
      {seleccionado && (
        <CandidatoDetalleModal
          partido={seleccionado}
          onClose={() => setSeleccionado(null)}
        />
      )}
    </section>
  );
}

