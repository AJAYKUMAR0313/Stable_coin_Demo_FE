export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md mx-4
        bg-white/10 backdrop-blur-xl
        border border-black/15 rounded-2xl shadow-2xl p-5">
        {children}
      </div>
    </div>
  );
}
