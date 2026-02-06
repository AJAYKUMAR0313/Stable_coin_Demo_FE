import { useRef, useEffect } from "react";
import { useOfframpStore } from "../offrampStore";

export default function PinModal() {
  const { 
    showPinModal, 
    closePinModal, 
    pin, 
    setPin, 
    clearPin,
    pinError, 
    pinAttempts,
    executeWithdrawal 
  } = useOfframpStore();

  const inputRefs = useRef([]);

  useEffect(() => {
    if (showPinModal) {
      clearPin();
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [showPinModal]);

  const handlePinChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    setPin(index, value);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      setPin(i, pastedData[i]);
    }

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleConfirm = async () => {
    const pinString = pin.join("");
    if (pinString.length !== 6) return;
    await executeWithdrawal();
  };

  const isPinComplete = pin.every(digit => digit !== "");
  const isBlocked = pinAttempts >= 3;

  if (!showPinModal) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={closePinModal}
      >
        {/* Modal */}
        <div 
          className="relative w-full max-w-md p-8 rounded-3xl animate-scale-in"
          style={{
            background: 'rgba(20, 30, 60, 0.95)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closePinModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 text-center">
            Enter Transaction PIN
          </h3>
          <p className="text-sm text-gray-400 mb-8 text-center">
            Confirm your withdrawal
          </p>

          {/* PIN Input */}
          <div className="flex gap-3 justify-center mb-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isBlocked}
                className={`w-14 h-16 text-center text-2xl font-bold rounded-xl outline-none transition-all ${
                  isBlocked
                    ? 'bg-gray-800 cursor-not-allowed text-gray-600'
                    : 'bg-[#141e3c] text-white focus:ring-2 focus:ring-pink-500'
                } ${
                  pinError ? 'ring-2 ring-red-500' : 'border border-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Error Message */}
          {pinError && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-center animate-shake">
              <p className="text-sm text-red-400">
                ❌ {pinError}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!isPinComplete || isBlocked}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
              isPinComplete && !isBlocked
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                : 'bg-gray-700 cursor-not-allowed opacity-50'
            }`}
            style={{
              boxShadow: isPinComplete && !isBlocked
                ? '0 0 20px rgba(236, 72, 153, 0.5)'
                : 'none'
            }}
          >
            Confirm Withdrawal
          </button>

          {/* Security Notice */}
          <div className="mt-4 text-center text-xs text-gray-500">
            🔒 Secured by bank encryption
          </div>
        </div>
      </div>
    </>
  );
}