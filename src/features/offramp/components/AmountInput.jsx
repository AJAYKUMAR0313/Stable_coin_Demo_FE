import { useState, useEffect } from "react";
import { useOfframpStore } from "../offrampStore";

export default function AmountInput({ error, setError }) {
  const { amount, setAmount, selectedToken } = useOfframpStore();
  const [touched, setTouched] = useState(false);

  const validateAmount = (value) => {
    if (!value || value === "") {
      return "Please enter an amount";
    }

    const numValue = Number(value);

    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }

    if (numValue <= 0) {
      return "Amount must be greater than 0";
    }

    if (selectedToken && numValue > selectedToken.balance) {
      return "Insufficient balance";
    }

    if (numValue < 10) {
      return "Minimum withdrawal is 10 tokens";
    }

    return null;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      
      if (touched) {
        const validationError = validateAmount(value);
        setError(validationError);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateAmount(amount);
    setError(validationError);
  };

  const handleQuickAmount = (percentage) => {
    if (selectedToken) {
      const quickAmount = (selectedToken.balance * percentage / 100).toFixed(6);
      setAmount(quickAmount);
      setTouched(true);
      const validationError = validateAmount(quickAmount);
      setError(validationError);
    }
  };

  useEffect(() => {
    if (touched && amount) {
      const validationError = validateAmount(amount);
      setError(validationError);
    }
  }, [selectedToken]);

  const isValid = !error && amount && touched;
  const remaining = selectedToken && amount 
    ? (selectedToken.balance - Number(amount)).toFixed(6)
    : null;

  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Amount to Sell
      </label>

      <div className="relative">
        <input
          type="text"
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0.00"
          disabled={!selectedToken}
          className={`w-full px-4 py-3 text-2xl sm:text-4xl font-semibold border-2 rounded-xl focus:outline-none transition-colors ${
            error && touched 
              ? "border-red-500" 
              : isValid 
              ? "border-green-500" 
              : "border-gray-200 focus:border-black"
          } ${!selectedToken ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
        />

        {selectedToken && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-base sm:text-xl text-gray-500 font-semibold pointer-events-none">
            {selectedToken.symbol}
          </div>
        )}
      </div>

      {/* Quick Amount Buttons
      {selectedToken && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[25, 50, 75, 100].map(percentage => (
            <button
              key={percentage}
              onClick={() => handleQuickAmount(percentage)}
              className="py-2 px-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 hover:border-black text-sm font-medium transition-all"
            >
              {percentage}%
            </button>
          ))}
        </div>
      )} */}

      {/* Balance Info */}
      {selectedToken && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-gray-600">Available Balance</span>
            <span className="text-xs font-semibold text-gray-900">
              {selectedToken.balance} {selectedToken.symbol}
            </span>
          </div>

          {amount && !error && (
            <div className="flex justify-between pt-1.5 border-t border-gray-200">
              <span className="text-xs text-gray-600">Remaining After Sale</span>
              <span className={`text-xs font-semibold ${
                Number(remaining) >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {remaining} {selectedToken.symbol}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && touched && (
        <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Disabled State Helper */}
      {!selectedToken && (
        <p className="mt-2 text-xs text-gray-500">
          Please select a token first
        </p>
      )}
    </div>
  );
}