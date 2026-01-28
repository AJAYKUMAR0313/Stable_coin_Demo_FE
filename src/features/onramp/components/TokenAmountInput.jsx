import Input from "@/components/ui/Input";
import { useOnRampStore } from "../onrampStore";

export default function TokenAmountInput() {
  const { tokenAmount, setTokenAmount, selectedToken } = useOnRampStore();

  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only positive numbers
    if (value === "" || (Number(value) >= 0 && !isNaN(value))) {
      setTokenAmount(value);
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Input
          type="number"
          value={tokenAmount}
          onChange={handleChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          style={{
            fontSize: "32px",
            fontWeight: 600,
            padding: "12px 16px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
          }}
        />
        {selectedToken && (
          <div style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "18px",
            color: "#666",
            fontWeight: 500,
            pointerEvents: "none"
          }}>
            {selectedToken.symbol}
          </div>
        )}
      </div>
      
      {/* Quick amount buttons */}
      {selectedToken && (
        <div style={{
          display: "flex",
          gap: "8px",
          marginTop: "12px"
        }}>
          {[10, 50, 100, 500].map(amount => (
            <button
              key={amount}
              onClick={() => setTokenAmount(amount.toString())}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                background: tokenAmount === amount.toString() ? "#000" : "#fff",
                color: tokenAmount === amount.toString() ? "#fff" : "#000",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {amount}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}