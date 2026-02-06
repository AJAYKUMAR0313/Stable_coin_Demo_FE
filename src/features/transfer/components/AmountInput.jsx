import { useState, useEffect } from "react";
import { useTransferStore } from "../transferStore";

export default function AmountInput({ error, setError }) {
  const { amount, setAmount, selectedToken } = useTransferStore();
  const [touched, setTouched] = useState(false);

  const validateAmount = (value) => {
    if (!value) return "Please enter an amount";

    const num = Number(value);
    if (isNaN(num)) return "Enter a valid number";
    if (num <= 0) return "Amount must be greater than 0";

    if (selectedToken && num > selectedToken.balance) {
      return "Insufficient balance";
    }

    return null;
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // allow only numbers + decimals
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);

      if (touched) {
        setError(validateAmount(value));
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateAmount(amount));
  };

  useEffect(() => {
    if (touched && amount) {
      setError(validateAmount(amount));
    }
  }, [selectedToken]);

  const isValid = touched && !error && amount;
  const remaining =
    selectedToken && amount
      ? (selectedToken.balance - Number(amount)).toFixed(6)
      : null;

  return (
    <div className="flex flex-col gap-1">
      {/* LABEL */}
      <label className="text-sm text-white/70">
        Amount
      </label>

      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0.00"
          disabled={!selectedToken}
          className={`
            w-full px-3 py-2 pr-12 rounded-xl
            bg-white/10 backdrop-blur-md
            border
            text-sm text-white
            placeholder-white/40
            focus:outline-none
            transition
            ${
              error && touched
                ? "border-red-400/60 focus:ring-2 focus:ring-red-400/40"
                : isValid
                ? "border-green-400/60 focus:ring-2 focus:ring-green-400/40"
                : "border-white/15 focus:ring-2 focus:ring-cyan-400/40"
            }
            ${!selectedToken ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />

        {/* TOKEN SYMBOL */}
        {selectedToken && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/60 font-semibold">
            {selectedToken.symbol}
          </span>
        )}
      </div>

      {/* BALANCE INFO */}
      {selectedToken && (
        <div
          className="mt-2 px-3 py-2 rounded-xl
          bg-white/10 border border-white/15
          text-xs text-white/70"
        >
          <div className="flex justify-between">
            <span>Available</span>
            <span className="font-medium">
              {selectedToken.balance} {selectedToken.symbol}
            </span>
          </div>

          {amount && !error && remaining !== null && (
            <div className="flex justify-between pt-1 mt-1 border-t border-white/10">
              <span>Remaining</span>
              <span
                className={`font-medium ${
                  Number(remaining) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {remaining} {selectedToken.symbol}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && touched && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          ⚠️ {error}
        </p>
      )}

      {/* HELPER */}
      {!selectedToken && (
        <p className="text-xs text-white/40">
          Select a token to enter amount
        </p>
      )}
    </div>
  );
}
