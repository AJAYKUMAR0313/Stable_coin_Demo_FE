import { useEffect } from "react";

export default function TransactionDetailsModal({ tx, onClose }) {
  if (!tx) return null;

  /* Lock background scroll */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  const typeColor = {
    SENT: "text-red-400",
    RECEIVED: "text-green-400",
  };

  const statusColor = {
    SUCCESS: "bg-green-500/20 text-green-300",
    FAILED: "bg-red-500/20 text-red-300",
    PENDING: "bg-yellow-500/20 text-yellow-300",
  };

  return (
    <div
      className="
      fixed inset-0 z-50 flex items-center justify-center
      bg-black/60 backdrop-blur-md
      animate-fadeIn
      "
      onClick={onClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        w-full max-w-3xl
        rounded-2xl p-8
        bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]
        border border-white/10 shadow-2xl text-white
        transition-all duration-300
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold tracking-wide">
            Transaction Details
          </h2>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Status + Type */}
        <div className="flex gap-3 mb-8">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusColor[tx.status] || "bg-gray-500/20"
            }`}
          >
            {tx.status}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/10 ${
              typeColor[tx.transaction_type] || ""
            }`}
          >
            {tx.transaction_type}
          </span>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <Detail label="Asset" value={tx.asset} />
          <Detail label="Amount" value={`${tx.amount} ${tx.asset}`} />

          <Detail label="From Address" value={tx.from_address} />
          <Detail label="To Address" value={tx.to_address} />

          <Detail label="Timestamp" value={tx.timestamp} />

          <Detail
            label="Transaction Hash"
            value={tx.tx_hash}
            copy
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-10">
          <a
            href={`https://etherscan.io/tx/${tx.tx_hash}`}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 text-sm hover:underline"
          >
            View on Explorer →
          </a>

          <button
            onClick={onClose}
            className="
            px-5 py-2 rounded-lg
            bg-white/10 hover:bg-white/20
            transition text-sm
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* Detail row */
function Detail({ label, value, copy }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white/60 text-xs">{label}</span>

      <span className="font-medium break-all">
        {value}

        {copy && (
          <button
            onClick={() => navigator.clipboard.writeText(value)}
            className="ml-2 text-xs text-cyan-300 hover:underline"
          >
            Copy
          </button>
        )}
      </span>
    </div>
  );
}
