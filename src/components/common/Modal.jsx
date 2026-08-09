import { IconCerrar } from "../icons/Icon";

export default function Modal({ titulo, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-[2px] px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg lg:max-w-2xl max-h-[85vh] overflow-y-auto p-7 lg:p-9 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5 lg:mb-6">
          <h3 className="font-display text-2xl lg:text-3xl pr-4">{titulo}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 shrink-0 grid place-items-center rounded-full hover:bg-agora-card-soft transition-colors"
          >
            <IconCerrar size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
