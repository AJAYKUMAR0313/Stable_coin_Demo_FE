import { useOnRampStore } from "../onrampStore";
import { Text } from "@/components/ui/Text";

export default function TransactionStatus() {
  const { transactionHash } = useOnRampStore();

  if (!transactionHash) return null;

  const shortHash = `${transactionHash.slice(0, 6)}...${transactionHash.slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionHash);
    // Could add a toast notification here
  };

  return (
    <div style={{
      marginTop: "16px",
      padding: "16px",
      background: "#f8f9fa",
      borderRadius: "12px",
      border: "1px solid #e0e0e0"
    }}>
      <Text.Muted style={{ marginBottom: "8px" }}>
        Transaction Hash
      </Text.Muted>
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "space-between"
      }}>
        <code style={{
          fontSize: "14px",
          fontFamily: "monospace",
          padding: "6px 12px",
          background: "#fff",
          borderRadius: "6px",
          border: "1px solid #e0e0e0"
        }}>
          {shortHash}
        </code>
        
        <button
          onClick={copyToClipboard}
          style={{
            padding: "6px 12px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            whiteSpace: "nowrap"
          }}
        >
          Copy
        </button>
      </div>

      {/* Optional: Add explorer link */}
      <a
        href={`https://etherscan.io/tx/${transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "12px",
          fontSize: "14px",
          color: "#666",
          textDecoration: "none"
        }}
      >
        View on Explorer →
      </a>
    </div>
  );
}