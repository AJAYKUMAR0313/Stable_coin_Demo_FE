import { useEffect } from "react";
import { useOfframpStore } from "../offrampStore";

export default function OfframpResult({ onNewWithdrawal, onGoToDashboard }) {
  const { 
    withdrawalStatus, 
    withdrawalResult, 
    errorMessage,
    executeWithdrawal,
    amount,
    selectedToken,
    selectedBankAccount,
    conversionRates
  } = useOfframpStore();

  useEffect(() => {
    if (withdrawalStatus === "IDLE") {
      executeWithdrawal();
    }
  }, []);

  const rate = selectedToken ? (conversionRates[selectedToken.symbol]?.rateInr || 0) : 0;
  const total = amount && rate ? (Number(amount) * rate).toFixed(2) : 0;

  // Processing State
  if (withdrawalStatus === "PROCESSING") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <div className="text-center py-10">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full mx-auto mb-6 animate-spin" />
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Processing Withdrawal
          </h2>
          
          <p className="text-gray-600">
            Please wait while we process your transaction...
          </p>
        </div>
      </div>
    );
  }

  // Success State
  if (withdrawalStatus === "SUCCESS") {
    const shortTxHash = withdrawalResult?.transactionHash 
      ? `${withdrawalResult.transactionHash.slice(0, 8)}...${withdrawalResult.transactionHash.slice(-6)}`
      : "";

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <div className="text-center py-5">
          <div className="text-7xl text-green-500 mb-4 animate-[scaleIn_0.5s_ease-out]">
            ✓
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
            Withdrawal Initiated!
          </h2>
          
          <p className="text-gray-600 mb-6">
            {amount} {selectedToken?.symbol} converted to ₹{total}
          </p>

          {/* Transaction Details */}
          {withdrawalResult?.transactionHash && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl mb-6">
              <p className="text-xs text-gray-600 mb-2">Transaction Hash</p>
              
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs font-mono px-3 py-1.5 bg-white border border-gray-200 rounded-lg flex-1">
                  {shortTxHash}
                </code>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(withdrawalResult.transactionHash);
                  }}
                  className="px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-gray-800 whitespace-nowrap"
                >
                  Copy
                </button>
              </div>

              {/* Full Transaction Hash */}
              <details className="mt-3">
                <summary className="text-xs text-gray-600 cursor-pointer select-none">
                  Show full transaction hash
                </summary>
                <code className="block mt-2 text-[10px] font-mono text-gray-600 p-2 bg-white rounded break-all">
                  {withdrawalResult.transactionHash}
                </code>
              </details>
            </div>
          )}

          {/* Bank Details */}
          {selectedBankAccount && (
            <div className="p-4 bg-green-50 border border-green-500 rounded-xl mb-6">
              <p className="text-xs text-gray-600 mb-2">Withdrawal Destination</p>
              <p className="text-base font-semibold text-gray-900 mb-1">
                {selectedBankAccount.bankName}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {selectedBankAccount.accountNumber.length > 10 
                  ? `****${selectedBankAccount.accountNumber.slice(-4)}`
                  : selectedBankAccount.accountNumber}
              </p>
              <p className="text-xs text-gray-500">
                Estimated arrival: 1-3 business days
              </p>
            </div>
          )}

          {/* Updated Balance */}
          {withdrawalResult?.newBalance !== undefined && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg mb-6">
              <p className="text-xs text-gray-600 mb-1">Updated Balance</p>
              <p className="text-lg font-bold text-gray-900">
                {withdrawalResult.newBalance} {selectedToken?.symbol}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onNewWithdrawal}
              className="flex-1 py-4 px-6 bg-white text-black border-2 border-gray-200 text-base font-semibold rounded-xl hover:border-black transition-all"
            >
              New Withdrawal
            </button>
            <button
              onClick={onGoToDashboard}
              className="flex-1 py-4 px-6 bg-black text-white text-base font-semibold rounded-xl hover:bg-gray-800 transition-all"
            >
              Go to Dashboard
            </button>
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
      </div>
    );
  }

  // Error State
  if (withdrawalStatus === "ERROR") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <div className="text-center py-5">
          <div className="text-7xl text-red-500 mb-4">
            ✗
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
            Withdrawal Failed
          </h2>
          
          <div className="p-4 bg-red-50 border border-red-500 rounded-xl my-6">
            <p className="text-sm text-red-900">
              {errorMessage || "An error occurred while processing your withdrawal. Please try again."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onGoToDashboard}
              className="flex-1 py-4 px-6 bg-white text-black border-2 border-gray-200 text-base font-semibold rounded-xl hover:border-black transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onNewWithdrawal}
              className="flex-1 py-4 px-6 bg-black text-white text-base font-semibold rounded-xl hover:bg-gray-800 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}