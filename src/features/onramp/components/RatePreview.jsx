import { Text } from "@/components/ui/Text";
import { useOnRampStore } from "../onrampStore";

export default function RatePreview() {
  const { tokenAmount, selectedToken } = useOnRampStore();

  if (!tokenAmount || !selectedToken || tokenAmount <= 0) return null;

  const total = tokenAmount * selectedToken.rateInr;

  return (
    <div style={{
      marginTop: "24px",
      padding: "16px",
      background: "#f8f9fa",
      borderRadius: "12px",
      border: "1px solid #e0e0e0"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        marginBottom: "8px"
      }}>
        <Text.Muted>You'll receive</Text.Muted>
        <Text.Body style={{ fontWeight: 600 }}>
          {tokenAmount} {selectedToken.symbol}
        </Text.Body>
      </div>
      
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        marginBottom: "12px"
      }}>
        <Text.Muted>Rate</Text.Muted>
        <Text.Body>₹{selectedToken.rateInr} per token</Text.Body>
      </div>

      <div style={{
        borderTop: "1px solid #e0e0e0",
        paddingTop: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Text.Body style={{ fontWeight: 600 }}>Total Amount</Text.Body>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "24px", fontWeight: 700 }}>
            ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}