function Header({ module }) {
  return (
    <header className="bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-600 px-10 py-4 text-white">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
        MÓDULO DE APRENDIZAJE
      </p>

      <h2 className="mt-1 text-2xl font-bold md:text-3xl">
        {module.title}
      </h2>

      <div className="mt-2 h-1 w-20 rounded-full bg-white/80" />

      <p className="mt-2 max-w-3xl text-sm leading-6 text-white/90">
        {module.description}
      </p>
    </header>
  );
}

export default Header;