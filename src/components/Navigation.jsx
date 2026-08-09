function Navigation({
  previousTopic,
  nextTopic,
  isCompleted,
  onPrevious,
  onNext,
  onMarkCompleted,
}) {
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!previousTopic}
        className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Anterior
      </button>

      <div className="flex flex-col gap-3 sm:flex-row">
        {!isCompleted && (
          <button
            type="button"
            onClick={onMarkCompleted}
            className="rounded-xl border border-emerald-500 px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Marcar como completado
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
        >
          {nextTopic ? "Siguiente →" : "Finalizar módulo"}
        </button>
      </div>
    </div>
  );
}

export default Navigation;