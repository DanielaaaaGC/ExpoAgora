import agoritaImg from "../../assets/img/agorita.png";

import {
  IconRecursos,
  IconPartidos,
  IconVotaciones,
} from "../icons/Icon";

const puntos = [
  {
    icon: IconRecursos,
    titulo: "Información clara",
    texto: "Conoce propuestas y trayectorias",
  },
  {
    icon: IconPartidos,
    titulo: "Partidos políticos",
    texto: "Descubre quiénes son y qué proponen",
  },
  {
    icon: IconVotaciones,
    titulo: "Simulacro de voto",
    texto: "Practica tu voto paso a paso",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF8]">

      {/* =====================================================
          FONDOS DECORATIVOS
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* LILA */}
        <div
          className="
            absolute
            -top-28
            -left-28
            w-96
            h-96
            rounded-full
            bg-[#D7A9E3]/35
            blur-3xl
          "
        />

        {/* AZUL */}
        <div
          className="
            absolute
            top-10
            right-0
            w-[420px]
            h-[420px]
            rounded-full
            bg-[#AAB8E5]/35
            blur-3xl
          "
        />

        {/* CELESTE */}
        <div
          className="
            absolute
            -bottom-40
            left-1/3
            w-96
            h-96
            rounded-full
            bg-[#B4F0EA]/30
            blur-3xl
          "
        />

      </div>

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ====================================================== */}
      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
          sm:px-10
          lg:px-14
          py-14
          sm:py-20
          lg:py-24
          grid
          md:grid-cols-2
          gap-12
          lg:gap-20
          items-center
        "
      >

        {/* =====================================================
            COLUMNA IZQUIERDA
        ====================================================== */}
        <div>

          {/* ETIQUETA SUPERIOR */}
          <span
            className="
              inline-flex
              items-center
              bg-[#EBD9F0]
              text-[#654A8A]
              text-xs
              font-bold
              rounded-full
              px-4
              py-2
              mb-5
              border
              border-[#D7A9E3]
            "
          >
            Simulacro de gobierno estudiantil 2026
          </span>


          {/* TÍTULO */}
          <h1
            className="
              font-sans
              font-extrabold
              text-4xl
              sm:text-5xl
              lg:text-6xl
              xl:text-[4rem]
              leading-[1.05]
              tracking-tight
              text-[#403B68]
            "
          >
            Aprende a votar,
            <br />

            <span className="text-[#7055A6]">
              tu voto cuenta
            </span>
          </h1>


          {/* DESCRIPCIÓN */}
          <p
            className="
              mt-5
              text-[#625E78]
              max-w-md
              lg:max-w-lg
              text-[15px]
              lg:text-base
              leading-relaxed
            "
          >
            Conoce los candidatos, los partidos y practica tu voto
            con nuestro simulacro interactivo. Infórmate, decide y participa.
          </p>


          {/* =====================================================
              BOTONES
          ====================================================== */}
          <div className="flex flex-wrap items-center gap-3 mt-8">

            {/* BOTÓN PRINCIPAL */}
            <a
              href="#practica"
              className="
                rounded-full
                bg-[#7055A6]
                text-white
                text-sm
                font-bold
                px-6
                py-3
                shadow-md
                shadow-[#7055A6]/20
                hover:bg-[#604795]
                hover:-translate-y-0.5
                transition-all
              "
            >
              Comenzar simulacro →
            </a>


            {/* BOTÓN SECUNDARIO */}
            <a
              href="#modulos"
              className="
                rounded-full
                bg-white
                text-[#5B4B82]
                text-sm
                font-bold
                px-6
                py-3
                border
                border-[#D7D2E8]
                hover:bg-[#F1EBF7]
                hover:-translate-y-0.5
                transition-all
              "
            >
              Ver módulos educativos
            </a>

          </div>


          {/* =====================================================
              TRES PUNTOS DE INFORMACIÓN
          ====================================================== */}
          <div
            className="
              grid
              sm:grid-cols-3
              gap-5
              lg:gap-6
              mt-10
              lg:mt-12
            "
          >

            {puntos.map(({ icon: Icon, titulo, texto }) => (

              <div
                key={titulo}
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                {/* ICONO */}
                <div
                  className="
                    w-11
                    h-11
                    lg:w-12
                    lg:h-12
                    shrink-0
                    rounded-2xl
                    bg-white
                    border
                    border-[#DDD8EC]
                    grid
                    place-items-center
                    shadow-sm
                  "
                >
                  <Icon size={22} />
                </div>


                {/* TEXTO */}
                <div>

                  <p
                    className="
                      text-sm
                      font-bold
                      leading-tight
                      text-[#403B68]
                    "
                  >
                    {titulo}
                  </p>

                  <p
                    className="
                      text-xs
                      text-[#77728A]
                      leading-tight
                      mt-1
                    "
                  >
                    {texto}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            COLUMNA DERECHA — AGORITA
        ====================================================== */}
        <div
          className="
            relative
            flex
            justify-center
            md:justify-end
          "
        >

          {/* =====================================================
              BURBUJA DETRÁS DE AGORITA
          ====================================================== */}
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              md:justify-end
            "
          >

            <div
              className="
                w-[300px]
                h-[300px]
                sm:w-[380px]
                sm:h-[380px]
                lg:w-[450px]
                lg:h-[450px]
                rounded-[48%_52%_60%_40%/50%_45%_55%_50%]
                bg-gradient-to-br
                from-[#D7A9E3]
                via-[#AAB8E5]
                to-[#B4F0EA]
                opacity-80
              "
            />

          </div>


          {/* =====================================================
              AGORITA
          ====================================================== */}
          <img
            src={agoritaImg}
            alt="Agorita, asistente virtual de Ágora"
            className="
              relative
              w-full
              max-w-[300px]
              sm:max-w-[360px]
              lg:max-w-[410px]
              object-contain
              drop-shadow-[0_18px_25px_rgba(64,59,104,0.15)]
              hover:-translate-y-2
              transition-transform
              duration-500
            "
          />

        </div>

      </div>

    </section>
  );
}