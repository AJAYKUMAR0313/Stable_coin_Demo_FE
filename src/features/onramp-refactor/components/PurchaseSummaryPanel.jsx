import { useOnRampStore } from "../onrampStore";

export default function PurchaseSummaryPanel({ onContinue }) {
  const { 
    selectedToken, 
    tokenAmount, 
    setTokenAmount, 
    availableBalance,
    hasInsufficientBalance 
  } = useOnRampStore();

  const isInsufficientBalance = hasInsufficientBalance();
  const totalInr = selectedToken && tokenAmount ? Number(tokenAmount) * selectedToken.rateInr : 0;
  const canContinue = selectedToken && tokenAmount > 0 && !isInsufficientBalance;

  const quickAmounts = [1000, 5000, 10000];

  const handleQuickAmount = (amount) => {
    if (!selectedToken) return;
    const tokens = (amount / selectedToken.rateInr).toFixed(2);
    setTokenAmount(tokens);
  };

  const handleMaxAmount = () => {
    if (!selectedToken) return;
    const maxTokens = (availableBalance / selectedToken.rateInr).toFixed(2);
    setTokenAmount(maxTokens);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
      {/* Available Balance */}
      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-1">Available Balance</div>
        <div className="text-2xl font-bold text-gray-900">
          ₹{availableBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Buy Amount Input */}
      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Buy Amount
        </label>
        <div className="relative">
          {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
            U
          </span> */}
          <input
  type="text"
  inputMode="decimal"
  value={tokenAmount ?? ""}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTokenAmount(value);
    }
  }}
  className={`
    w-full pl-12 pr-14 py-3
    text-lg font-semibold
    text-gray-900       /* 👈 FORCE TEXT COLOR */
    caret-gray-900     /* 👈 FORCE CURSOR COLOR */
    bg-white
    rounded-xl border-2 outline-none
    disabled:bg-gray-50 disabled:cursor-not-allowed
  `}
/>

          {selectedToken && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              {selectedToken.symbol}
            </span>
          )}
        </div>
        {isInsufficientBalance && (
          <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <span>⚠️</span>
            <span>Insufficient balance</span>
          </div>
        )}
      </div>

      {/* Quick Amount Buttons */}
      {/* {selectedToken && (
        <div className="flex gap-2 mb-6">
          {quickAmounts.map(amount => (
            <button
              key={amount}
              onClick={() => handleQuickAmount(amount)}
              className="flex-1 px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 
                       hover:bg-gray-50 transition-colors"
            >
              ₹{amount/1000}K
            </button>
          ))}
          <button
            onClick={handleMaxAmount}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 
                     hover:bg-gray-50 transition-colors"
          >
            Max
          </button>
        </div>
      )} */}

      <div className="border-t border-gray-200 pt-4 mb-4">
        {/* Conversion Preview */}
        {selectedToken && tokenAmount > 0 && (
          <>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">You'll receive</span>
              <span className="font-semibold text-gray-900">
                {tokenAmount} {selectedToken.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">Exchange Rate</span>
              <span className="text-gray-900">
                1 {selectedToken.symbol} = ₹{selectedToken.rateInr}
              </span>
            </div>
          </>
        )}

        {/* Total Amount */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total Amount</span>
            <div className="text-2xl font-bold text-gray-900">
              ₹{totalInr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className={`
          w-full py-3 rounded-xl font-semibold text-white transition-all
          ${canContinue
            ? 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow'
            : 'bg-gray-300 cursor-not-allowed'
          }
        `}
      >
        Continue to Buy
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Rates are indicative
      </p>
    </div>
  );
}