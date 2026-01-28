import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

export default function SummaryCard({ open, onClose, onConfirm, token, amount, total }) {
  if (!token || !amount) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: "8px 0" }}>
        <Text.Title style={{ marginBottom: "24px" }}>
          Order Summary
        </Text.Title>

        <div style={{
          background: "#f8f9fa",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px"
        }}>
          {/* Token Info */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            paddingBottom: "16px",
            borderBottom: "1px solid #e0e0e0"
          }}>
            <div>
              <div style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>
                Token
              </div>
              <div style={{ fontSize: "16px", fontWeight: 600 }}>
                {token.name}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                {token.symbol}
              </div>
            </div>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 700
            }}>
              {token.symbol[0]}
            </div>
          </div>

          {/* Amount Details */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}>
              <Text.Muted>Amount</Text.Muted>
              <Text.Body style={{ fontWeight: 600 }}>
                {amount} {token.symbol}
              </Text.Body>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}>
              <Text.Muted>Rate</Text.Muted>
              <Text.Body>₹{token.rateInr} per token</Text.Body>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}>
              <Text.Muted>Platform Fee</Text.Muted>
              <Text.Body style={{ color: "#22c55e" }}>Free</Text.Body>
            </div>
          </div>

          {/* Total */}
          <div style={{
            borderTop: "2px solid #e0e0e0",
            paddingTop: "16px",
            marginTop: "16px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text.Body style={{ fontWeight: 600, fontSize: "16px" }}>
                Total Amount
              </Text.Body>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "28px", fontWeight: 700 }}>
                  ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            onClick={onClose}
            style={{
              background: "#fff",
              color: "#000",
              border: "2px solid #e0e0e0"
            }}
          >
            Back
          </Button>
          <Button onClick={onConfirm}>
            Proceed to Payment
          </Button>
        </div>
      </div>
    </Modal>
  );
}