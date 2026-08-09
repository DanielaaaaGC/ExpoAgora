import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Content from "./components/Content";
import Progress from "./components/Progress";
import modules from "./data/modules";
import Juegos from "./juegos/Juegos";

function App() {
  const firstModule = modules[0];
  const firstTopic = firstModule.topics[0];

  const [currentModuleId, setCurrentModuleId] = useState(firstModule.id);
  const [currentTopicId, setCurrentTopicId] = useState(firstTopic.id);

  const [view, setView] = useState("modules");

  const [completedTopics, setCompletedTopics] = useState(() => {
    const savedProgress = localStorage.getItem("agora-completed-topics");

    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "agora-completed-topics",
      JSON.stringify(completedTopics)
    );
  }, [completedTopics]);

  const currentModule =
    modules.find((module) => module.id === currentModuleId) ?? firstModule;

  const currentTopic =
    currentModule.topics.find((topic) => topic.id === currentTopicId) ??
    currentModule.topics[0];

  const allTopics = useMemo(
    () =>
      modules.flatMap((module) =>
        module.topics.map((topic) => ({
          ...topic,
          moduleId: module.id,
        }))
      ),
    []
  );

  const currentGlobalIndex = allTopics.findIndex(
    (topic) =>
      topic.moduleId === currentModuleId &&
      topic.id === currentTopicId
  );

  const previousTopic = allTopics[currentGlobalIndex - 1] ?? null;
  const nextTopic = allTopics[currentGlobalIndex + 1] ?? null;

  const selectTopic = (moduleId, topicId) => {
    setCurrentModuleId(moduleId);
    setCurrentTopicId(topicId);
    setView("modules");
  };

  const markTopicAsCompleted = (topicId) => {
    setCompletedTopics((previousTopics) => {
      if (previousTopics.includes(topicId)) {
        return previousTopics;
      }

      return [...previousTopics, topicId];
    });
  };

  const goToPreviousTopic = () => {
    if (!previousTopic) return;

    selectTopic(previousTopic.moduleId, previousTopic.id);
  };

  const goToNextTopic = () => {
    markTopicAsCompleted(currentTopic.id);

    if (!nextTopic) return;

    selectTopic(nextTopic.moduleId, nextTopic.id);
  };

  const isModuleCompleted = (module) =>
    module.topics.every((topic) =>
      completedTopics.includes(topic.id)
    );

  const progressPercentage =
    allTopics.length === 0
      ? 0
      : Math.round(
          (completedTopics.length / allTopics.length) * 100
        );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        modules={modules}
        currentModuleId={currentModuleId}
        currentTopicId={currentTopicId}
        completedTopics={completedTopics}
        isModuleCompleted={isModuleCompleted}
        onSelectTopic={selectTopic}
        onOpenGames={() => setView("games")}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {view === "games" ? (
          <Juegos volver={() => setView("modules")} />
        ) : (
          <>
            <Header module={currentModule} />

            <Progress
              completedCount={completedTopics.length}
              totalCount={allTopics.length}
              percentage={progressPercentage}
            />

            <Content
              module={currentModule}
              topic={currentTopic}
              previousTopic={previousTopic}
              nextTopic={nextTopic}
              isCompleted={completedTopics.includes(currentTopic.id)}
              onPrevious={goToPreviousTopic}
              onNext={goToNextTopic}
              onMarkCompleted={() =>
                markTopicAsCompleted(currentTopic.id)
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;