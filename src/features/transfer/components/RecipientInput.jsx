import { useState, useEffect, useRef } from "react";
import { Text } from "@/components/ui/Text";
import { verifyRecipientAddress } from "../services"; // <-- your API call

export default function RecipientInput({ value, onChange, error, setError }) {
  const [touched, setTouched] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const debounceRef = useRef(null);

  /* ---------------- REGEX VALIDATION ---------------- */
  const validateWalletAddress = (address) => {
    if (!address) {
      return "Please enter a wallet address";
    }
    
    if (!address.startsWith("0x")) {
      return "Address must start with 0x";
    }
    
    if (address.length !== 42) {
      return "Address must be 42 characters long";
    }
    
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return "Invalid wallet address format";
    }
    
    return null;
  };

  /* ---------------- API VALIDATION ---------------- */
  const checkOnBlockchain = async (address) => {
    setIsChecking(true);
    try {
      const exists = await verifyRecipientAddress(address);

      if (!exists) {
        setError("Wallet address does not exist on blockchain");
      } else {
        setError(null);
      }
    } catch {
      // fallback: allow flow, backend will validate
      setError(null);
    } finally {
      setIsChecking(false);
    }
  };

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const newValue = e.target.value.trim();
    onChange(newValue);

    if (!touched) return;

    const validationError = validateWalletAddress(newValue);
    setError(validationError);

    // Only call API if regex passes
    if (!validationError) {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        checkOnBlockchain(newValue);
      }, 600); // debounce delay
    }
  };

  /* ---------------- HANDLE BLUR ---------------- */
  const handleBlur = () => {
    setTouched(true);

    const validationError = validateWalletAddress(value);
    setError(validationError);

    if (!validationError) {
      checkOnBlockchain(value);
    }
  };

  const isValid = !error && value && touched && !isChecking;

  return (
    <div style={{ marginBottom: "20px" }}>
      <Text.Label style={{ marginBottom: "8px", display: "block", fontSize: "15px" }}>
        Recipient Wallet Address
      </Text.Label>

      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
          style={{
            width: "100%",
            padding: "10px 30px 10px 10px",
            fontSize: "15px",
            fontFamily: "monospace",
            border: `2px solid ${
              error ? "#ef4444" : isValid ? "#22c55e" : "#e0e0e0"
            }`,
            borderRadius: "12px",
          }}
        />

        {/* Status Icon */}
        {touched && (
          <div
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "18px",
            }}
          >
            {isChecking ? "⏳" : isValid ? "✓" : error ? "✗" : ""}
          </div>
        )}
      </div>

      {/* Messages */}
      {error && touched && (
        <div style={{ marginTop: "8px", fontSize: "13px", color: "#ef4444" }}>
          ⚠️ {error}
        </div>
      )}

      {isChecking && (
        <div style={{ marginTop: "8px", fontSize: "13px", color: "#555" }}>
          Checking wallet on blockchain…
        </div>
      )}

      {isValid && (
        <div style={{ marginTop: "8px", fontSize: "13px", color: "#22c55e" }}>
          ✓ Wallet verified successfully
        </div>
      )}

      {!touched && (
        <Text.Muted style={{ marginTop: "8px", fontSize: "12px" }}>
          Enter a valid Ethereum wallet address
        </Text.Muted>
      )}
    </div>
  );
}