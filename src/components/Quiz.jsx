import { useState } from "react";

function Quiz({ questions = [], onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
        <p className="font-semibold text-amber-800">
          Este quiz todavía no tiene preguntas.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex = currentQuestion.correctAnswer;

  const selectAnswer = (optionIndex) => {
    if (showFeedback) return;

    setSelectedAnswer(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestionIndex]: selectedAnswer,
    }));

    setShowFeedback(true);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;

      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(answers[nextQuestionIndex] ?? null);
      setShowFeedback(false);
      return;
    }

    finishQuiz();
  };

  const finishQuiz = () => {
    const finalAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedAnswer,
    };

    const correctAnswers = questions.reduce(
      (total, question, questionIndex) => {
        return finalAnswers[questionIndex] === question.correctAnswer
          ? total + 1
          : total;
      },
      0
    );

    const totalQuestions = questions.length;
    const percentage = Math.round(
      (correctAnswers / totalQuestions) * 100
    );

    const finalResult = {
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      totalQuestions,
      percentage,
      score: correctAnswers,
      answers: finalAnswers,
    };

    setAnswers(finalAnswers);
    setResult(finalResult);
    setFinished(true);

    onComplete?.(finalResult);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setShowFeedback(false);
    setFinished(false);
    setResult(null);
  };

  if (finished && result) {
    const passed = result.percentage >= 70;

    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold ${
            passed
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {passed ? "✓" : "!"}
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
          Quiz finalizado
        </p>

        <h3 className="mt-2 text-4xl font-bold text-slate-900">
          {result.percentage}%
        </h3>

        <p className="mt-3 text-lg text-slate-600">
          Obtuviste {result.correctAnswers} de {result.totalQuestions} respuestas
          correctas.
        </p>

        <div className="mx-auto mt-7 grid max-w-lg gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-2xl font-bold text-emerald-700">
              {result.correctAnswers}
            </p>

            <p className="text-sm text-emerald-700">
              Respuestas correctas
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-2xl font-bold text-red-700">
              {result.incorrectAnswers}
            </p>

            <p className="text-sm text-red-700">
              Respuestas incorrectas
            </p>
          </div>
        </div>

        <p
          className={`mt-6 font-semibold ${
            passed ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          {passed
            ? "Has aprobado el cuestionario."
            : "Puedes volver a intentarlo para mejorar tu resultado."}
        </p>

        <button
          type="button"
          onClick={restartQuiz}
          className="mt-7 rounded-xl border border-purple-600 px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          Intentar nuevamente
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-purple-700">
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </p>

        <p className="text-sm font-semibold text-slate-500">
          {Math.round(
            ((currentQuestionIndex + 1) / questions.length) * 100
          )}
          %
        </p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-teal-500 transition-all duration-500"
          style={{
            width: `${
              ((currentQuestionIndex + 1) / questions.length) * 100
            }%`,
          }}
        />
      </div>

      <h3 className="mt-7 text-2xl font-bold leading-9 text-slate-900">
        {currentQuestion.question}
      </h3>

      <div className="mt-6 space-y-3">
        {currentQuestion.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === optionIndex;
          const isCorrect = optionIndex === correctAnswerIndex;

          let optionClasses =
            "border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50";

          if (!showFeedback && isSelected) {
            optionClasses =
              "border-purple-600 bg-purple-50 font-semibold text-purple-800";
          }

          if (showFeedback && isCorrect) {
            optionClasses =
              "border-emerald-500 bg-emerald-50 font-semibold text-emerald-800";
          }

          if (showFeedback && isSelected && !isCorrect) {
            optionClasses =
              "border-red-500 bg-red-50 font-semibold text-red-800";
          }

          return (
            <button
              key={`${currentQuestion.id}-${optionIndex}`}
              type="button"
              onClick={() => selectAnswer(optionIndex)}
              disabled={showFeedback}
              className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition ${optionClasses}`}
            >
              <span>{option}</span>

              {showFeedback && isCorrect && (
                <span className="font-bold text-emerald-700">✓</span>
              )}

              {showFeedback && isSelected && !isCorrect && (
                <span className="font-bold text-red-700">✕</span>
              )}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className={`mt-6 rounded-xl border p-5 ${
            selectedAnswer === correctAnswerIndex
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p
            className={`font-bold ${
              selectedAnswer === correctAnswerIndex
                ? "text-emerald-800"
                : "text-red-800"
            }`}
          >
            {selectedAnswer === correctAnswerIndex
              ? "Respuesta correcta"
              : "Respuesta incorrecta"}
          </p>

          {currentQuestion.explanation && (
            <p className="mt-2 leading-6 text-slate-700">
              {currentQuestion.explanation}
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        {!showFeedback ? (
          <button
            type="button"
            onClick={checkAnswer}
            disabled={selectedAnswer === null}
            className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Comprobar respuesta
          </button>
        ) : (
          <button
            type="button"
            onClick={goToNextQuestion}
            className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            {currentQuestionIndex === questions.length - 1
              ? "Ver resultado"
              : "Siguiente pregunta →"}
          </button>
        )}
      </div>
    </section>
  );
}

export default Quiz;