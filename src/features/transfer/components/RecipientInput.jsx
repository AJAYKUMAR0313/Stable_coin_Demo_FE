// import { useState, useEffect } from "react";
import { useState } from "react";
import { Text } from "@/components/ui/Text";

export default function RecipientInput({ value, onChange, error, setError }) {
  const [touched, setTouched] = useState(false);

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

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (touched) {
      const validationError = validateWalletAddress(newValue);
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateWalletAddress(value);
    setError(validationError);
  };

  const isValid = !error && value && touched;

  return (
    <div style={{ marginBottom: "24px" }}>
      <Text.Label style={{ marginBottom: "8px", display: "block" }}>
        Recipient Wallet Address
      </Text.Label>
      
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
        //   onBlur={handleBlur}
          placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
          style={{
            width: "100%",
            padding: "14px 40px 14px 14px",
            fontSize: "14px",
            fontFamily: "monospace",
            border: `2px solid ${error && touched ? "#ef4444" : isValid ? "#22c55e" : "#e0e0e0"}`,
            borderRadius: "12px",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = "#000";
            }
          }}
          onBlur={(e) => {
            handleBlur();
            if (!error && !isValid) {
              e.target.style.borderColor = "#e0e0e0";
            }
          }}
        />
        
        {/* Validation Icon */}
        {touched && (
          <div style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "20px"
          }}>
            {isValid ? "✓" : error ? "✗" : ""}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && touched && (
        <div style={{
          marginTop: "8px",
          fontSize: "13px",
          color: "#ef4444",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Success Message */}
      {isValid && (
        <div style={{
          marginTop: "8px",
          fontSize: "13px",
          color: "#22c55e",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          ✓ Valid wallet address
        </div>
      )}

      {/* Helper Text */}
      {!touched && (
        <Text.Muted style={{ marginTop: "8px", fontSize: "12px" }}>
          Enter a valid Ethereum wallet address starting with 0x
        </Text.Muted>
      )}
    </div>
  );
}