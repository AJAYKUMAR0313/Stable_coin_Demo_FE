import { useOnRampStore } from "../onrampStore";

export default function StablecoinSelector() {
  const { stablecoins, selectedToken, selectToken } = useOnRampStore();

  return (
    <div style={{ position: "relative" }}>
      <select
        value={selectedToken?.symbol || ""}
        onChange={(e) =>
          selectToken(stablecoins.find(t => t.symbol === e.target.value))
        }
        style={{
          width: "100%",
          padding: "14px 16px",
          fontSize: "16px",
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
        <option value="">Select a stablecoin</option>
        {stablecoins.map(token => (
          <option key={token.symbol} value={token.symbol}>
            {token.symbol} - {token.name} (₹{token.rateInr}/token)
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

      {/* Show selected token info */}
      {selectedToken && (
        <div style={{
          marginTop: "12px",
          padding: "12px",
          background: "#f8f9fa",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 500 }}>
              {selectedToken.name}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {selectedToken.symbol}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "16px", fontWeight: 600 }}>
              ₹{selectedToken.rateInr}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              per token
            </div>
          </div>
        </div>
      )}
    </div>
  );
}