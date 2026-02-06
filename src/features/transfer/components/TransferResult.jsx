import { useTransferStore } from "../transferStore";

export default function TransferResult({ onNewTransfer, onGoToDashboard }) {
  const {
    transferStatus,
    transferResult,
    errorMessage,
    recipient,
    amount,
    selectedToken,
  } = useTransferStore();

  const shortAddress = recipient
    ? `${recipient.slice(0, 6)}...${recipient.slice(-4)}`
    : "";

  /* ---------------- PROCESSING ---------------- */
  if (transferStatus === "PROCESSING") {
    return (
      <div
        className="bg-white/10 backdrop-blur-xl
        border border-white/15 rounded-2xl
        max-w-lg w-full mx-auto p-6 text-center"
      >
        <div className="w-12 h-12 mx-auto mb-4
          border-4 border-white/20 border-t-cyan-400
          rounded-full animate-spin"
        />

        <h2 className="text-lg font-semibold text-white mb-1">
          Sending Transfer
        </h2>
        <p className="text-sm text-white/60">
          Please wait while we process your transaction…
        </p>
      </div>
    );
  }

  /* ---------------- SUCCESS ---------------- */
  if (transferStatus === "SUCCESS") {
    const shortTxHash = transferResult?.transactionId
      ? `${transferResult.transactionId.slice(0, 8)}...${transferResult.transactionId.slice(-6)}`
      : "";

    return (
      <div
        className="bg-white/10 backdrop-blur-xl
        border border-black/15 rounded-2xl
        max-w-lg w-full mx-auto p-5 flex flex-col gap-4"
      >
        {/* ICON */}
        <div className="text-5xl text-green-400 text-center">✓</div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-green-400 text-center">
          Transfer Successful
        </h2>

        <p className="text-sm text-black/70 text-center">
          {amount} {selectedToken?.symbol} sent to {shortAddress}
        </p>

        {/* TX HASH */}
        {transferResult?.transactionId && (
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-black/50 mb-1">Transaction ID</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs text-black/70 break-all">
                {shortTxHash}
              </code>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    transferResult.transactionId
                  )
                }
                className="text-xs px-2 py-1 rounded-md
                bg-white/10 hover:bg-white/20 transition"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {/* UPDATED BALANCE */}
        {transferResult?.newBalance !== undefined && (
          <div
            className="bg-green-500/10 border border-green-500/30
            rounded-xl p-3"
          >
            <p className="text-xs text-black/50 mb-1">
              Updated Balance
            </p>
            <p className="text-base font-semibold text-green-400">
              {transferResult.newBalance} {selectedToken?.symbol}
            </p>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onNewTransfer}
            className="flex-1 py-2 rounded-xl
            bg-white/10 border border-black/15
            text-sm text-black/80 hover:bg-white/20 transition"
          >
            Send Another
          </button>
          <button
            onClick={onGoToDashboard}
            className="flex-1 py-2 rounded-xl font-semibold
            bg-gradient-to-r from-cyan-400 to-blue-600
            text-black hover:scale-[1.02] transition"
          >
            Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (transferStatus === "ERROR") {
    return (
      <div
        className="bg-white/10 backdrop-blur-xl
        border border-black/15 rounded-2xl
        max-w-lg w-full mx-auto p-5 flex flex-col gap-4 text-center"
      >
        <div className="text-5xl text-red-400">✕</div>

        <h2 className="text-lg font-semibold text-red-400">
          Transfer Failed
        </h2>

        <p
          className="text-sm text-red-300 bg-red-500/10
          border border-red-500/30 rounded-lg p-3"
        >
          {errorMessage ||
            "An error occurred while processing your transfer."}
        </p>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onGoToDashboard}
            className="flex-1 py-2 rounded-xl
            bg-white/10 border border-black/15
            text-sm text-black/80 hover:bg-white/20 transition"
          >
            Cancel
          </button>
          <button
            onClick={onNewTransfer}
            className="flex-1 py-2 rounded-xl font-semibold
            bg-gradient-to-r from-cyan-400 to-blue-600
            text-black hover:scale-[1.02] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
