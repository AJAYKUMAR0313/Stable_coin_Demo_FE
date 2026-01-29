import { useEffect } from "react";
import { useTransferStore } from "../transferStore";
import { Text } from "@/components/ui/Text";

export default function TokenSelector() {
  const { 
    availableTokens, 
    selectedToken, 
    selectToken, 
    loadAvailableTokens 
  } = useTransferStore();

  useEffect(() => {
    loadAvailableTokens();
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Text.Label style={{ marginBottom: "10px", display: "block", fontSize: "15px" }}>
        Select Token
      </Text.Label>

      <div style={{ position: "relative" }}>
        <select
          value={selectedToken?.symbol || ""}
          onChange={(e) => {
            const token = availableTokens.find(t => t.symbol === e.target.value);
            selectToken(token);
          }}
          style={{
            width: "100%",
            padding: "10px 40px 10px 10px",
            fontSize: "15px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            outline: "none",
            cursor: "pointer",
            appearance: "none",
            background: "#fff",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => e.target.style.borderColor = "#000"}
          onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        >
          <option value="">Choose a token</option>
          {availableTokens.map(token => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol} - {token.name} ({token.balance} available)
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          fontSize: "12px",
          color: "#666"
        }}>
          ▼
        </div>
      </div>

      {/* Selected Token Info */}
      {selectedToken && (
        <div style={{
          marginTop: "12px",
          padding: "12px 16px",
          background: "#f8f9fa",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>
              {selectedToken.name}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {selectedToken.symbol}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "16px", fontWeight: 600 }}>
              {selectedToken.balance}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              Available
            </div>
          </div>
        </div>
      )}
    </div>
  );
}