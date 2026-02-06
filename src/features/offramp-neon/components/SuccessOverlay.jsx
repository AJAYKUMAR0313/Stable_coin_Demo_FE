import { useState } from "react";
import { useOfframpStore } from "../offrampStore";

export default function SuccessOverlay({ onNewWithdrawal, onGoToDashboard }) {
  const { withdrawalResult, selectedToken, amount, conversionRates } = useOfframpStore();
  const [copied, setCopied] = useState(false);

  const rate = selectedToken ? conversionRates[selectedToken.symbol]?.rateInr || 0 : 0;
  const total = amount && rate ? (Number(amount) * rate).toFixed(2) : 0;

  const shortTxHash = withdrawalResult?.transactionHash
    ? `${withdrawalResult.transactionHash.slice(0, 8)}...${withdrawalResult.transactionHash.slice(-6)}`
    : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(withdrawalResult.transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-pink-500 animate-particle"
            style={{
              left: '50%',
              top: '50%',
              animationDelay: `${i * 0.05}s`,
              '--tx': `${Math.cos(i * 12 * Math.PI / 180) * 300}px`,
              '--ty': `${Math.sin(i * 12 * Math.PI / 180) * 300}px`,
            }}
          />
        ))}
      </div>

      {/* Success Card */}
      <div 
        className="relative w-full max-w-md p-8 rounded-3xl animate-scale-in"
        style={{
          background: 'rgba(20, 30, 60, 0.95)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center animate-scale-in"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)',
            }}
          >
            <span className="text-white text-5xl font-bold">✓</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-400 to-green-400 bg-clip-text text-transparent">
          Withdrawal Successful!
        </h2>

        <p className="text-center text-gray-400 mb-6">
          {amount} {selectedToken?.symbol} → ₹{Number(total).toLocaleString('en-IN')}
        </p>

        {/* Transaction Hash */}
        {withdrawalResult?.transactionHash && (
          <div 
            className="p-4 rounded-xl mb-4"
            style={{
              background: 'rgba(10, 14, 26, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p className="text-xs text-gray-400 mb-2">Transaction Hash</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-black/40 rounded-lg text-xs font-mono text-white">
                {shortTxHash}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {/* Bank Info */}
        {withdrawalResult?.bankAccount && (
          <div 
            className="p-4 rounded-xl mb-6"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            <p className="text-sm text-green-400 font-semibold mb-1">
              To: {withdrawalResult.bankAccount.type} {withdrawalResult.bankAccount.number}
            </p>
            <p className="text-xs text-gray-400">
              Estimated arrival: 1-3 business days
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onNewWithdrawal}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-white border-2 border-gray-700 hover:border-pink-500 transition-all"
          >
            New Withdrawal
          </button>
          <button
            onClick={onGoToDashboard}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}