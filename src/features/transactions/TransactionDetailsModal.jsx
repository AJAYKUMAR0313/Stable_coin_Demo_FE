import { useEffect } from "react";
import TransactionHistory from "./TransactionHistory";
import { formatDate } from "./commonFunctions";

export default function TransactionDetailsModal({ tx, onClose }) {
  if (!tx) return null;

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; // lock background scroll

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const transactionTypeColor = {
    RECEIVED: "text-green-600",
    SENT: "text-red-600",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // close on backdrop click
    >
      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Transaction Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Status */}
        <div className="mb-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              transactionTypeColor[tx.transaction_status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {tx.transaction_status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-4 text-sm">
          <Detail label="Transaction Hash" value={tx.tx_hash} copy />
          <Detail
            label="Type"
            value={tx.transaction_type}
            className={
              transactionTypeColor[tx.transaction_type] || "text-gray-600"
            }
          />

          <Detail label="Asset" value={tx.asset} />
          <Detail label="Amount (ETH)" value={tx.amount} />
          <Detail
            label="Amount (Wei)"
            value={tx.asset?.startsWith("Token:") ? "USDC" : tx.asset}
          />
          <Detail label="From" value={tx.from_address} />
          <Detail label="To" value={tx.to_address} />
          <Detail label="Timestamp" value={formatDate(tx.timestamp)} />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center">
          <a
            href={`https://etherscan.io/tx/${tx.tx_hash}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm hover:underline"
          >
            View on Explorer →
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, className = "", copy }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>

      <span className={`font-medium break-all text-right ${className}`}>
        {value}

        {copy && (
          <button
            onClick={() => navigator.clipboard.writeText(value)}
            className="ml-2 text-xs text-blue-500 hover:underline"
          >
            Copy
          </button>
        )}
      </span>
    </div>
  );
}
