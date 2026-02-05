import { useState, useRef, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useOnRampStore } from "../onrampStore";

export default function ConfirmationModal({ open, onClose, token, amount }) {
  const { userAccount, availableBalance, startConversion, pinError, pinAttempts } = useOnRampStore();
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (open) {
      // Reset PIN when modal opens
      setPin(["", "", "", "", "", ""]);
      setIsProcessing(false);
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [open]);

  const handlePinChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newPin = [...pin];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newPin[i] = pastedData[i];
    }
    setPin(newPin);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleConfirm = async () => {
    const pinString = pin.join("");
    if (pinString.length !== 6) return;

    setIsProcessing(true);
    const success = await startConversion(pinString);
    // const success = true;
    
    if (success) {
      // Modal will be closed by parent when status changes
    } else {
      setIsProcessing(false);
      setPin(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  if (!token || !amount || !userAccount) return null;

  const total = Number(amount) * token.rateInr;
  const isPinComplete = pin.every(digit => digit !== "");
  const isBlocked = pinAttempts >= 3;

  return (
    <Modal open={open} onClose={isProcessing ? undefined : onClose}>
      <div className="p-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Confirm Purchase
        </h2>

        {/* Account Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Debit from Savings Account
          </div>
          <div className="text-base font-semibold text-gray-900 mb-1">
            {userAccount.number}
          </div>
          <div className="text-sm text-gray-600">
            Available: ₹{availableBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          {/* Amount Details */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount to Debit</span>
              <span className="text-lg font-bold text-gray-900">
                ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">You'll receive</span>
              <span className="text-base font-semibold text-gray-900">
                {amount} {token.symbol}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          {/* PIN Input */}
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Enter Transaction PIN
          </label>
          <div className="flex gap-2 justify-center mb-3">
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
                disabled={isProcessing || isBlocked}
                className={`
                  w-12 h-14 text-center text-2xl font-bold rounded-lg
                  border-2 outline-none transition-all
                  ${isProcessing || isBlocked
                    ? 'bg-gray-100 cursor-not-allowed'
                    : 'bg-white focus:border-blue-500'
                  }
                  ${pinError ? 'border-red-500' : 'border-gray-300'}
                `}
              />
            ))}
          </div>

          {/* PIN Error */}
          {pinError && (
            <div className="text-sm text-red-600 text-center mb-4">
              ❌ {pinError}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isPinComplete || isProcessing || isBlocked}
            className={`
              flex-1 px-4 py-3 rounded-xl font-semibold text-white transition-colors
              ${isPinComplete && !isProcessing && !isBlocked
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              'Confirm Purchase'
            )}
          </button>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
          <span>🔒</span>
          <span>Secured by bank encryption</span>
        </div>
      </div>
    </Modal>
  );
}