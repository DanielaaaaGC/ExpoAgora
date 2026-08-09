import FlipCard from "./FlipCard";
import Navigation from "./Navigation";
import Quiz from "./Quiz";

function Content({
  module,
  topic,
  previousTopic,
  nextTopic,
  isCompleted,
  onPrevious,
  onNext,
  onMarkCompleted,
}) {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-teal-600">
                {module.title}
              </p>

              <h3 className="mt-1 text-3xl font-bold text-slate-900">
                {topic.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {isCompleted && (
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  Completado
                </span>
              )}

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  topic.type === "quiz"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-teal-100 text-teal-700"
                }`}
              >
                {topic.type === "quiz" ? "Cuestionario" : "Contenido"}
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {topic.type === "quiz" ? (
            <div className="mt-7">
              <Quiz
                questions={topic.questions ?? []}
                onComplete={(result) => {
                  console.log("Resultado del quiz:", result);
                  onMarkCompleted();
                }}
              />
            </div>
          ) : (
            <>
              <p className="mt-7 text-lg leading-8 text-slate-700">
                {topic.content}
              </p>

              {topic.cards?.length > 0 && (
                <section className="mt-10">
                  <div className="mb-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
                      Conceptos clave
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-slate-900">
                      Explora las tarjetas
                    </h4>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {topic.cards.map((card) => (
                      <FlipCard
                        key={card.id}
                        title={card.title}
                        frontText={card.frontText}
                        backText={card.backText}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          <Navigation
            previousTopic={previousTopic}
            nextTopic={nextTopic}
            isCompleted={isCompleted}
            onPrevious={onPrevious}
            onNext={onNext}
            onMarkCompleted={onMarkCompleted}
          />
        </div>
      </div>
    </main>
  );
}

export default Content;