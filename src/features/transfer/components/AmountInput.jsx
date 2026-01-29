import { useState, useEffect } from "react";
import { useTransferStore } from "../transferStore";
import { Text } from "@/components/ui/Text";
import Input from "@/components/ui/Input";

export default function AmountInput({ error, setError }) {
  const { amount, setAmount, selectedToken } = useTransferStore();
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

    return null;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    
    // Allow only positive numbers and decimals
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
    <div style={{ marginBottom: "20px" }}>
      <Text.Label style={{ marginBottom: "12px", display: "block", fontSize: "15px" }}>
        Amount
      </Text.Label>

      <div style={{ position: "relative" }}>
        <Input
          type="text"
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0.00"
          disabled={!selectedToken}
          style={{
            fontSize: "clamp(14px, 5vw, 26px)",
            fontWeight: 500,
            padding: "10px 40px 10px 10px",
            border: `2px solid ${error && touched ? "#ef4444" : isValid ? "#22c55e" : "#e0e0e0"}`,
            borderRadius: "12px",
            textAlign: "left",
          }}
        />

        {selectedToken && (
          <div style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(16px, 3vw, 20px)",
            color: "#666",
            fontWeight: 600,
            pointerEvents: "none"
          }}>
            {selectedToken.symbol}
          </div>
        )}
      </div>

      {/* Quick Amount Buttons */}
      {selectedToken && (
        <div style={{
          display: "flex",
          gap: "8px",
          marginTop: "12px"
        }}>
          {[25, 50, 75, 100].map(percentage => (
            <button
              key={percentage}
              onClick={() => handleQuickAmount(percentage)}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                background: "#fff",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8f9fa";
                e.currentTarget.style.borderColor = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }}
            >
              {percentage}%
            </button>
          ))}
        </div>
      )}

      {/* Balance Info */}
      {selectedToken && (
        <div style={{
          marginTop: "12px",
          padding: "12px",
          background: "#f8f9fa",
          borderRadius: "8px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px"
          }}>
            <Text.Muted style={{ fontSize: "13px" }}>Available Balance</Text.Muted>
            <Text.Body style={{ fontSize: "13px", fontWeight: 600 }}>
              {selectedToken.balance} {selectedToken.symbol}
            </Text.Body>
          </div>

          {amount && !error && (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "6px",
              borderTop: "1px solid #e0e0e0"
            }}>
              <Text.Muted style={{ fontSize: "13px" }}>Remaining</Text.Muted>
              <Text.Body style={{ 
                fontSize: "13px", 
                fontWeight: 600,
                color: Number(remaining) >= 0 ? "#22c55e" : "#ef4444"
              }}>
                {remaining} {selectedToken.symbol}
              </Text.Body>
            </div>
          )}
        </div>
      )}

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

      {/* Disabled State Helper */}
      {!selectedToken && (
        <Text.Muted style={{ marginTop: "8px", fontSize: "12px" }}>
          Please select a token first
        </Text.Muted>
      )}
    </div>
  );
}