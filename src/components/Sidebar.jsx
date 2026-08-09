import { useEffect, useState } from "react";
import ModuleItem from "./ModuleItem";

function Sidebar({
  modules,
  currentModuleId,
  currentTopicId,
  completedTopics,
  isModuleCompleted,
  onSelectTopic,
  onOpenGames,
}) {
  const [openModuleId, setOpenModuleId] = useState(currentModuleId);

  useEffect(() => {
    setOpenModuleId(currentModuleId);
  }, [currentModuleId]);

  const toggleModule = (moduleId) => {
    setOpenModuleId((previousId) =>
      previousId === moduleId ? null : moduleId
    );
  };

  return (
    <aside className="flex h-screen w-80 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
          Plataforma educativa
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Ágora
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Aprende sobre democracia y participación ciudadana.
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {modules.map((module) => (
          <ModuleItem
            key={module.id}
            module={module}
            isOpen={openModuleId === module.id}
            isCurrentModule={currentModuleId === module.id}
            currentTopicId={currentTopicId}
            completedTopics={completedTopics}
            isCompleted={isModuleCompleted(module)}
            onToggle={() => toggleModule(module.id)}
            onSelectTopic={onSelectTopic}
            
          />
        ))}
        <button
  type="button"
  onClick={onOpenGames}
  className="mt-4 w-full border-t border-slate-200 px-5 py-4 text-left font-semibold text-purple-700 transition hover:bg-purple-50"
>
  Juegos
</button>
      </nav>
    </aside>
  );
}

export default Sidebar;