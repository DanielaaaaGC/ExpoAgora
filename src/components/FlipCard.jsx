import { useState } from "react";

function FlipCard({ title, frontText, backText }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsFlipped(!isFlipped)}
      className="group h-64 w-full [perspective:1000px]"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-md [backface-visibility:hidden]">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-700">
            +
          </span>

          <h4 className="text-xl font-bold text-slate-900">
            {title}
          </h4>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {frontText}
          </p>

          <span className="mt-5 text-sm font-semibold text-teal-600">
            Haz clic para girar
          </span>
        </div>

        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-purple-600 p-6 text-center text-white shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h4 className="text-xl font-bold">
            {title}
          </h4>

          <p className="mt-4 leading-7 text-white/90">
            {backText}
          </p>

          <span className="mt-5 text-sm font-semibold text-white/80">
            Haz clic para volver
          </span>
        </div>
      </div>
    </button>
  );
}

export default FlipCard;