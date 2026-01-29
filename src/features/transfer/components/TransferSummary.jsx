import { useTransferStore } from "../transferStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

export default function TransferSummary({ onBack, onConfirm }) {
  const { recipient, amount, selectedToken, note } = useTransferStore();

  const shortAddress = `${recipient.slice(0, 6)}...${recipient.slice(-4)}`;
  const remainingBalance = (selectedToken.balance - Number(amount)).toFixed(6);

  return (
    <Card>
      <Text.Title style={{ marginBottom: "24px", textAlign: "center" }}>
        Review Transfer
      </Text.Title>

      <div style={{
        background: "#f8f9fa",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px"
      }}>
        {/* From/To Section */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }}>
            <Text.Muted>From</Text.Muted>
            <Text.Body style={{ fontWeight: 600 }}>Your Wallet</Text.Body>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            margin: "12px 0"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px"
            }}>
              ↓
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text.Muted>To</Text.Muted>
            <code style={{
              fontSize: "14px",
              fontFamily: "monospace",
              padding: "4px 8px",
              background: "#fff",
              borderRadius: "6px",
              fontWeight: 600
            }}>
              {shortAddress}
            </code>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: "1px solid #e0e0e0",
          margin: "16px 0"
        }} />

        {/* Amount Details */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px"
          }}>
            <Text.Muted>Token</Text.Muted>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>
                {selectedToken.name}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {selectedToken.symbol}
              </div>
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px"
          }}>
            <Text.Muted>Amount</Text.Muted>
            <Text.Body style={{ fontWeight: 700, fontSize: "18px" }}>
              {amount} {selectedToken.symbol}
            </Text.Body>
          </div>

          {note && (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
              alignItems: "flex-start"
            }}>
              <Text.Muted>Note</Text.Muted>
              <div style={{
                maxWidth: "60%",
                fontSize: "13px",
                textAlign: "right",
                fontStyle: "italic",
                color: "#666"
              }}>
                "{note}"
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{
          borderTop: "2px solid #e0e0e0",
          margin: "16px 0"
        }} />

        {/* Balance Summary */}
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px"
          }}>
            <Text.Muted>Current Balance</Text.Muted>
            <Text.Body style={{ fontWeight: 600 }}>
              {selectedToken.balance} {selectedToken.symbol}
            </Text.Body>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "8px",
            borderTop: "1px solid #e0e0e0"
          }}>
            <Text.Body style={{ fontWeight: 600 }}>After Transfer</Text.Body>
            <div style={{ textAlign: "right" }}>
              <div style={{ 
                fontSize: "18px", 
                fontWeight: 700,
                color: "#22c55e"
              }}>
                {remainingBalance} {selectedToken.symbol}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div style={{
        padding: "12px",
        background: "#fff3cd",
        border: "1px solid #ffc107",
        borderRadius: "8px",
        marginBottom: "24px"
      }}>
        <Text.Body style={{ fontSize: "13px", color: "#856404" }}>
          ⚠️ Please verify the recipient address carefully. Transfers cannot be reversed.
        </Text.Body>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "12px" }}>
        <Button
          onClick={onBack}
          style={{
            background: "#fff",
            color: "#000",
            border: "2px solid #e0e0e0"
          }}
        >
          ← Back
        </Button>
        <Button onClick={onConfirm}>
          Confirm Transfer
        </Button>
      </div>

      {/* Full Address Display */}
      <div style={{
        marginTop: "16px",
        padding: "12px",
        background: "#f8f9fa",
        borderRadius: "8px"
      }}>
        <Text.Muted style={{ fontSize: "11px", marginBottom: "4px" }}>
          Full Recipient Address:
        </Text.Muted>
        <code style={{
          fontSize: "11px",
          fontFamily: "monospace",
          wordBreak: "break-all",
          color: "#666"
        }}>
          {recipient}
        </code>
      </div>
    </Card>
  );
}