function ModuleItem({
  module,
  isOpen,
  isCurrentModule,
  currentTopicId,
  completedTopics,
  isCompleted,
  onToggle,
  onSelectTopic,
}) {
  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition ${
          isCurrentModule
            ? "bg-teal-50 text-teal-800"
            : "text-slate-700 hover:bg-slate-50"
        }`}
      >
        <span className="font-semibold">{module.title}</span>

        <div className="flex items-center gap-3">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              isCompleted
                ? "bg-emerald-500 text-white"
                : isCurrentModule
                  ? "border-2 border-teal-500 bg-white text-teal-600"
                  : "border-2 border-slate-300 bg-white text-slate-400"
            }`}
          >
            {isCompleted ? "✓" : ""}
          </span>

          <span
            className={`text-lg transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            ›
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="bg-slate-50 px-3 py-2">
          {module.topics.map((topic) => {
            const isCurrentTopic = currentTopicId === topic.id;
            const isTopicCompleted = completedTopics.includes(topic.id);

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onSelectTopic(module.id, topic.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                  isCurrentTopic
                    ? "bg-teal-600 font-semibold text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    isCurrentTopic
                      ? "bg-white text-teal-600"
                      : isTopicCompleted
                        ? "bg-emerald-500 text-white"
                        : topic.type === "quiz"
                          ? "border-2 border-purple-400 bg-white"
                          : "border-2 border-slate-300 bg-white"
                  }`}
                >
                  {isTopicCompleted ? "✓" : ""}
                </span>

                <span>{topic.title}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ModuleItem;