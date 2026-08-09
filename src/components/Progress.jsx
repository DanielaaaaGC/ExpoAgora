function Progress({ completedCount, totalCount, percentage }) {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-4 md:px-10">
      <div className="mx-auto flex max-w-5xl items-center gap-5">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-700">
              Progreso general
            </p>

            <p className="text-sm font-bold text-teal-700">
              {percentage}%
            </p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-purple-600 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <p className="shrink-0 text-sm text-slate-500">
          {completedCount} de {totalCount}
        </p>
      </div>
    </section>
  );
}

export default Progress;