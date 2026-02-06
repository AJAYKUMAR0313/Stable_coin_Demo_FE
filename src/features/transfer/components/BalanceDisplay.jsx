import { useTransferStore } from "../transferStore";

export default function BalanceDisplay() {
  const { selectedToken, amount } = useTransferStore();

  if (!selectedToken || !amount || amount === "") return null;

  const currentBalance = Number(selectedToken.balance);
  const sendAmount = Number(amount);
  const remainingBalance = (currentBalance - sendAmount).toFixed(6);

  const isNegative = Number(remainingBalance) < 0;

  return (
    <div
      className="rounded-xl
      bg-white/10 backdrop-blur-md
      border border-white/15
      px-4 py-3"
    >
      {/* CURRENT */}
      <div className="flex justify-between text-xs text-white/70 mb-1">
        <span>Current balance</span>
        <span className="font-medium text-white">
          {currentBalance} {selectedToken.symbol}
        </span>
      </div>

      {/* SEND */}
      <div className="flex justify-between text-xs text-white/70 mb-2">
        <span>Sending</span>
        <span className="font-medium text-red-400">
          − {sendAmount} {selectedToken.symbol}
        </span>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10 my-2" />

      {/* REMAINING */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/80 font-medium">
          Remaining
        </span>
        <span
          className={`text-lg font-semibold ${
            isNegative ? "text-red-400" : "text-green-400"
          }`}
        >
          {remainingBalance} {selectedToken.symbol}
        </span>
      </div>
    </div>
  );
}
