import { useState } from "react";
import { useOnRampStore } from "../onrampStore";

export default function TransactionStatus() {
  const { transactionHash } = useOnRampStore();
  const [copied, setCopied] = useState(false);

  const tenantId = localStorage.getItem("tenantId");

  let baseUrl = "https://etherscan.io";

  if (tenantId === "2") {
    baseUrl = "https://sepolia.etherscan.io";
  } else if (tenantId === "3") {
    baseUrl = "https://amoy.polygonscan.com";
  }

  if (!transactionHash) return null;

  const shortHash = `${transactionHash.slice(0, 6)}...${transactionHash.slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-2">Transaction Hash</div>

      <div className="flex items-center gap-3 justify-between">
        <code className="flex-1 px-3 py-2 bg-white text-sm font-mono rounded-lg border border-gray-200 text-gray-900">
          {shortHash}
        </code>

        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <a
        href={`${baseUrl}/tx/${tx.tx_hash}`}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-300 text-sm hover:underline"
      >
        View on Explorer →
      </a>
    </div>
  );
}
