import { useTransferStore } from "../transferStore";
import { Text } from "@/components/ui/Text";

export default function BalanceDisplay() {
  const { selectedToken, amount } = useTransferStore();

  if (!selectedToken || !amount || amount === "") return null;

  const currentBalance = selectedToken.balance;
  const sendAmount = Number(amount);
  const remainingBalance = (currentBalance - sendAmount).toFixed(6);

  return (
    <div style={{
      padding: "20px",
      background: "#f8f9fa",
      borderRadius: "12px",
      border: "1px solid #e0e0e0",
      marginBottom: "32px"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px"
      }}>
        <Text.Muted>Current Balance</Text.Muted>
        <Text.Body style={{ fontWeight: 600 }}>
          {currentBalance} {selectedToken.symbol}
        </Text.Body>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px"
      }}>
        <Text.Muted>Amount to Send</Text.Muted>
        <Text.Body style={{ fontWeight: 600 }}>
          -{sendAmount} {selectedToken.symbol}
        </Text.Body>
      </div>

      <div style={{
        borderTop: "2px solid #e0e0e0",
        paddingTop: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Text.Body style={{ fontWeight: 600 }}>Remaining Balance</Text.Body>
        <div style={{ textAlign: "right" }}>
          <div style={{ 
            fontSize: "20px", 
            fontWeight: 700,
            color: Number(remainingBalance) >= 0 ? "#000" : "#ef4444"
          }}>
            {remainingBalance} {selectedToken.symbol}
          </div>
        </div>
      </div>
    </div>
  );
}