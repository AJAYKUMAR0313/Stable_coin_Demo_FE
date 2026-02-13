export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* DIALOG */}
      <div
        className="
          relative z-10
          w-full max-w-sm
          rounded-2xl p-5
          bg-white/10 backdrop-blur-xl
          border border-white/15
          shadow-2xl
          animate-scale-in
        "
      >
        <h3 className="text-lg font-semibold text-white mb-2">
          {title}
        </h3>

        <p className="text-sm text-white/70 mb-5">
          {description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="
              flex-1 py-2 rounded-xl
              bg-white/10 border border-white/15
              text-sm text-white/80
              hover:bg-white/20 transition
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              flex-1 py-2 rounded-xl font-semibold transition
              ${
                loading
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }
            `}
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
