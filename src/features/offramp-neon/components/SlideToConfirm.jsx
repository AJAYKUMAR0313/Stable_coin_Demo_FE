import { useOfframpStore } from "../offrampStore";

export default function ConfirmButton() {
  const { canSlide, openPinModal } = useOfframpStore();
  
  // Check if the action is allowed
  const isEnabled = canSlide();

  const handleClick = () => {
    if (!isEnabled) return;

    // Trigger haptic feedback (matching original success vibration)
    navigator?.vibrate?.(20);
    
    // Open the modal
    openPinModal();
  };

  return (
    <div className="mt-8">
      <button
        onClick={handleClick}
        disabled={!isEnabled}
        className={`
          relative w-full h-16 rounded-full font-bold text-lg tracking-wide transition-all duration-200
          flex items-center justify-center select-none
          ${isEnabled 
            ? 'text-white cursor-pointer active:scale-[0.98]' 
            : 'text-gray-500 cursor-not-allowed bg-gray-900/80 border border-white/5'
          }
        `}
        style={isEnabled ? {
          background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)'
        } : {}}
      >
        {/* Button Content */}
        <span>Confirm Transaction</span>
        
        {/* Optional: Right Arrow Icon to mimic forward motion */}
        {isEnabled && (
          <span className="absolute right-6 text-2xl leading-none opacity-80">
             »
          </span>
        )}
      </button>

      {/* Validation Message */}
      {!isEnabled && (
        <div className="mt-3 text-center text-xs text-gray-500 animate-pulse">
          Enter a valid amount to continue
        </div>
      )}
    </div>
  );
}