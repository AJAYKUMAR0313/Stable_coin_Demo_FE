import { useTransferStore } from "../transferStore";

export default function TransferSummary({ onBack, onConfirm }) {
  const { recipient, amount, selectedToken, note, transferStatus } =
    useTransferStore();

  const shortAddress = `${recipient.slice(0, 6)}...${recipient.slice(-4)}`;
  const remainingBalance = (
    selectedToken.balance - Number(amount)
  ).toFixed(6);

  return (
    <div
      className="bg-white/10 backdrop-blur-xl
      border border-black/15
      rounded-2xl max-w-lg w-full mx-auto
      p-4 flex flex-col gap-4"
    >
      {/* TITLE */}
      <h2 className="text-lg font-semibold text-black text-center">
        Review Transfer
      </h2>

      {/* FROM → TO */}
      <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-2">
        <div className="flex justify-between text-sm text-white/70">
          <span>From</span>
          <span className="font-medium text-white">Your Wallet</span>
        </div>

        <div className="flex justify-center text-white/40">↓</div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-/70">To</span>
          <code className="px-2 py-1 rounded-md text-xs bg-black/30 text-cyan-300">
            {shortAddress}
          </code>
        </div>
      </div>

      {/* TOKEN + AMOUNT */}
      <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Token</span>
          <span className="font-medium text-white">
            {selectedToken.name} ({selectedToken.symbol})
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-white/70">Amount</span>
          <span className="font-semibold text-red-400">
            {amount} {selectedToken.symbol}
          </span>
        </div>

        {note && (
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Note</span>
            <span className="italic text-white/70 max-w-[60%] text-right">
              “{note}”
            </span>
          </div>
        )}
      </div>

      {/* BALANCE */}
      <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Current Balance</span>
          <span className="text-white font-medium">
            {selectedToken.balance} {selectedToken.symbol}
          </span>
        </div>

        <div className="flex justify-between text-sm border-t border-white/10 pt-2">
          <span className="font-medium text-white">After Transfer</span>
          <span className="font-semibold text-green-400">
            {remainingBalance} {selectedToken.symbol}
          </span>
        </div>
      </div>

      {/* WARNING */}
      <div
        className="text-xs text-yellow-300
        bg-yellow-500/10 border border-yellow-500/30
        rounded-lg p-2"
      >
        ⚠️ Transfers cannot be reversed. Verify the address carefully.
      </div>

      {/* FULL ADDRESS */}
      <div className="bg-white/10 rounded-xl p-2">
        <p className="text-[10px] text-white/50 mb-1">
          Full Recipient Address
        </p>
        <code className="text-xs font-bold text-white/70 break-all">
          {recipient}
        </code>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-2 rounded-xl
          bg-white/10 border border-white/15
          text-sm text-white/80 hover:bg-white/20 transition"
        >
          Back
        </button>

        <button
          onClick={onConfirm}
          disabled={transferStatus === "PROCESSING"}
          className={`flex-1 py-2 rounded-xl font-semibold transition
            ${
              transferStatus === "PROCESSING"
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:scale-[1.02]"
            }
          `}
        >
          {transferStatus === "PROCESSING" ? "Sending..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
