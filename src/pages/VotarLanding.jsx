import Hero from "../components/voting/Hero";
import CandidatosCarousel from "../components/voting/CandidatosCarousel";
import ModulosEducativos from "../components/voting/ModulosEducativos";
import PracticaVoto from "../components/voting/PracticaVoto";
import logoA from "../assets/img/logoA.png";

const NAV = [
  { href: "#partidos", label: "Partidos" },
  { href: "#modulos", label: "Módulos educativos" },
  { href: "#practica", label: "Practica tu voto" },
];

export default function VotarLanding() {
  return (
    <div className="min-h-screen bg-agora-bg">

      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-agora-bg/95 backdrop-blur-md border-b border-agora-purple/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-3.5 flex items-center gap-5">

          {/* LOGO */}
          <a
            href="#"
            className="flex items-center gap-3 mr-auto group"
          >
            <div className="w-11 h-11 rounded-2xl bg-agora-pink-light flex items-center justify-center shadow-sm group-hover:bg-agora-yellow-light transition-colors duration-200">
              <img
                src={logoA}
                alt="Logo de Ágora"
                className="w-8 h-8 object-contain"
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl text-agora-plum">
                Ágora
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-agora-muted mt-1">
                Aprende · Participa · Decide
              </span>
            </div>
          </a>

          {/* NAV */}
          <nav className="hidden lg:flex items-center gap-1 bg-agora-card-soft rounded-full p-1 border border-agora-border/60">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-agora-ink/70 hover:bg-agora-pink-light hover:text-agora-pink-dark transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* BOTÓN */}
          <a
            href="#practica"
            className="hidden sm:inline-flex items-center rounded-full bg-agora-lilac text-white text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-agora-plum hover:-translate-y-0.5 transition-all duration-200 shrink-0"
          >
            Practicar mi voto
          </a>
        </div>
      </header>

      <main>
        <Hero />

        <div id="partidos">
          <CandidatosCarousel />
        </div>

        <div id="modulos">
          <ModulosEducativos />
        </div>

        <div id="practica">
          <PracticaVoto />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-agora-border/60 mt-8 bg-agora-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-agora-pink-light flex items-center justify-center">
              <img
                src={logoA}
                alt="Logo de Ágora"
                className="w-7 h-7 object-contain"
              />
            </div>

            <div className="flex flex-col leading-none">
              <p className="font-display text-xl text-agora-plum">
                Ágora
              </p>
              <span className="text-[9px] uppercase tracking-[0.16em] text-agora-muted mt-1">
                Educación cívica
              </span>
            </div>
          </div>

          <p className="text-xs text-agora-muted max-w-md">
            Plataforma educativa de simulacro de gobierno estudiantil. Todo el contenido y los
            votos de esta herramienta son con fines pedagógicos y no tienen validez electoral
            oficial.
          </p>
        </div>
      </footer>
    </div>
  );
}
