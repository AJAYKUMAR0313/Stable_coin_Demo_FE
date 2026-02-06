import { useState, useRef } from "react";
import { verifyRecipientAddress } from "../services";
import { useTransferStore } from "../transferStore";

export default function RecipientInput({ value, onChange, error, setError }) {
  const [touched, setTouched] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const debounceRef = useRef(null);
  const {
  setRecipient,
  setRecipientError,
  setCheckingRecipient,
} = useTransferStore();


  /* ---------------- REGEX VALIDATION ---------------- */
  const validateWalletAddress = (address) => {
    if (!address) return "Please enter a wallet address";
    if (!address.startsWith("0x")) return "Address must start with 0x";
    if (address.length !== 42) return "Address must be 42 characters long";
    if (!/^0x[a-fA-F0-9]{40}$/.test(address))
      return "Invalid wallet address format";
    return null;
  };

  /* ---------------- API VALIDATION ---------------- */
  const checkOnBlockchain = async (address) => {
    setIsChecking(true);
    setCheckingRecipient(true);
    try {
      const exists = await verifyRecipientAddress(address);
      setError(exists ? null : "Wallet address does not exist on blockchain");
    } catch {
      setError(null); // fallback
    } finally {
      setIsChecking(false);
      setCheckingRecipient(false);
    }
  };

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const newValue = e.target.value.trim();
    onChange(newValue);

    if (!touched) return;

    const validationError = validateWalletAddress(newValue);
    setError(validationError);

    if (!validationError) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(
        () => checkOnBlockchain(newValue),
        600
      );
    }
  };

  /* ---------------- HANDLE BLUR ---------------- */
  const handleBlur = () => {
    setTouched(true);
    const validationError = validateWalletAddress(value);
    setError(validationError);
    if (!validationError) checkOnBlockchain(value);
  };

  const isValid = !error && value && touched && !isChecking;

  return (
    <div className="flex flex-col gap-1">
      {/* LABEL */}
      <label className="text-sm text-white/80">
        Recipient Wallet Address
      </label>

      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
          className={`
            w-full px-3 py-2 pr-10 rounded-xl
            bg-white/10 backdrop-blur-md
            border text-sm font-mono
            text-white placeholder-white/40
            focus:outline-none focus:ring-2
            max-length[42]
            ${
              error
                ? "border-red-400 focus:ring-red-400/40"
                : isValid
                ? "border-green-400 focus:ring-green-400/40"
                : "border-white/15 focus:ring-cyan-400/40"
            }
          `}
        />

        {/* STATUS ICON */}
        {touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
            {isChecking && <span className="text-white/50">⏳</span>}
            {!isChecking && isValid && (
              <span className="text-green-400">✓</span>
            )}
            {!isChecking && error && (
              <span className="text-red-400">✕</span>
            )}
          </div>
        )}
      </div>

      {/* MESSAGES */}
      {error && touched && (
        <p className="text-xs text-red-400">
          ⚠ {error}
        </p>
      )}

      {isChecking && (
        <p className="text-xs text-white/70">
          Checking wallet on blockchain…
        </p>
      )}

      {isValid && (
        <p className="text-xs text-green-400">
          ✓ Wallet verified
        </p>
      )}

      {!touched && (
        <p className="text-xs text-white/40">
          Enter a valid Ethereum wallet address
        </p>
      )}
    </div>
  );
}
