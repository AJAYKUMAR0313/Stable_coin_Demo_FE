import { useOfframpStore } from "../offrampStore";

export default function ErrorOverlay({ onTryAgain, onCancel }) {
  const { errorMessage } = useOfframpStore();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative w-full max-w-md p-8 rounded-3xl animate-scale-in"
        style={{
          background: 'rgba(20, 30, 60, 0.95)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Error Icon */}
        <div className="text-center mb-6">
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center animate-scale-in"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)',
            }}
          >
            <span className="text-white text-5xl font-bold">✗</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-red-400 mb-4">
          Withdrawal Failed
        </h2>

        {/* Error Message */}
        <div 
          className="p-4 rounded-xl mb-6"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <p className="text-sm text-red-300 text-center">
            {errorMessage || "An error occurred while processing your withdrawal. Please try again."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-white border-2 border-gray-700 hover:border-gray-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onTryAgain}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}