import { useEffect } from "react";
import { useTransferStore } from "../transferStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

export default function TransferResult({ onNewTransfer, onGoToDashboard }) {
  const { 
    transferStatus, 
    transferResult, 
    errorMessage,
    executeTransfer,
    recipient,
    amount,
    selectedToken
  } = useTransferStore();

  useEffect(() => {
    // Execute transfer when component mounts
    if (transferStatus === "IDLE") {
      executeTransfer();
    }
  }, []);

  const shortAddress = recipient ? `${recipient.slice(0, 6)}...${recipient.slice(-4)}` : "";

  // Processing State
  if (transferStatus === "PROCESSING") {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ 
            width: "64px", 
            height: "64px", 
            border: "4px solid #f0f0f0",
            borderTop: "4px solid #000",
            borderRadius: "50%",
            margin: "0 auto 24px",
            animation: "spin 1s linear infinite"
          }} />
          
          <Text.Title style={{ marginBottom: "8px" }}>
            Sending Transfer
          </Text.Title>
          
          <Text.Muted>
            Please wait while we process your transaction...
          </Text.Muted>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Card>
    );
  }

  // Success State
  if (transferStatus === "SUCCESS") {
    const shortTxHash = transferResult?.transactionId 
      ? `${transferResult.transactionId.slice(0, 8)}...${transferResult.transactionId.slice(-6)}`
      : "";

    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ 
            fontSize: "72px", 
            marginBottom: "16px",
            animation: "scaleIn 0.5s ease-out"
          }}>
            ✓
          </div>
          
          <Text.Title style={{ 
            marginBottom: "8px",
            color: "#22c55e",
            fontSize: "24px"
          }}>
            Transfer Successful!
          </Text.Title>
          
          <Text.Muted style={{ marginBottom: "24px" }}>
            {amount} {selectedToken?.symbol} sent to {shortAddress}
          </Text.Muted>

          {/* Transaction Details */}
          {transferResult?.transactionId && (
            <div style={{
              padding: "16px",
              background: "#f8f9fa",
              borderRadius: "12px",
              marginBottom: "24px",
              border: "1px solid #e0e0e0"
            }}>
              <Text.Muted style={{ marginBottom: "8px", fontSize: "13px" }}>
                Transaction ID
              </Text.Muted>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px"
              }}>
                <code style={{
                  fontSize: "12px",
                  fontFamily: "monospace",
                  padding: "6px 12px",
                  background: "#fff",
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  flex: 1
                }}>
                  {shortTxHash}
                </code>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(transferResult.transactionId);
                  }}
                  style={{
                    padding: "6px 12px",
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    whiteSpace: "nowrap"
                  }}
                >
                  Copy
                </button>
              </div>

              {/* Full Transaction Hash */}
              <details style={{ marginTop: "12px" }}>
                <summary style={{
                  fontSize: "12px",
                  color: "#666",
                  cursor: "pointer",
                  userSelect: "none"
                }}>
                  Show full transaction ID
                </summary>
                <code style={{
                  display: "block",
                  marginTop: "8px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  color: "#666",
                  padding: "8px",
                  background: "#fff",
                  borderRadius: "4px"
                }}>
                  {transferResult.transactionId}
                </code>
              </details>
            </div>
          )}

          {/* Updated Balance */}
          {transferResult?.newBalance !== undefined && (
            <div style={{
              padding: "12px 16px",
              background: "#f0fdf4",
              border: "1px solid #22c55e",
              borderRadius: "8px",
              marginBottom: "24px"
            }}>
              <Text.Muted style={{ fontSize: "13px", marginBottom: "4px" }}>
                Updated Balance
              </Text.Muted>
              <Text.Body style={{ fontWeight: 700, fontSize: "18px" }}>
                {transferResult.newBalance} {selectedToken?.symbol}
              </Text.Body>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <Button
              onClick={onNewTransfer}
              style={{
                background: "#fff",
                color: "#000",
                border: "2px solid #e0e0e0"
              }}
            >
              Send Another
            </Button>
            <Button onClick={onGoToDashboard}>
              Go to Dashboard
            </Button>
          </div>
        </div>

        <style>{`
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </Card>
    );
  }

  // Error State
  if (transferStatus === "ERROR") {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ 
            fontSize: "72px", 
            marginBottom: "16px",
            color: "#ef4444"
          }}>
            ✗
          </div>
          
          <Text.Title style={{ 
            marginBottom: "8px",
            color: "#ef4444",
            fontSize: "24px"
          }}>
            Transfer Failed
          </Text.Title>
          
          <div style={{
            padding: "16px",
            background: "#fef2f2",
            border: "1px solid #ef4444",
            borderRadius: "12px",
            marginTop: "24px",
            marginBottom: "24px"
          }}>
            <Text.Body style={{ fontSize: "14px", color: "#991b1b" }}>
              {errorMessage || "An error occurred while processing your transfer. Please try again."}
            </Text.Body>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              onClick={onGoToDashboard}
              style={{
                background: "#fff",
                color: "#000",
                border: "2px solid #e0e0e0"
              }}
            >
              Cancel
            </Button>
            <Button onClick={onNewTransfer}>
              Try Again
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return null;
}