import { useEffect, useState } from "react";
import { useOnRampStore } from "../onrampStore";
import StablecoinCard from "../components/StablecoinCard";
import PurchaseSummaryPanel from "../components/PurchaseSummaryPanel";
import SummaryModal from "../components/SummaryModal";
import ConfirmationModal from "../components/ConfirmationModal";
import TransactionStatus from "../components/TransactionStatus";

export default function FiatOnRamp() {
  const {
    stablecoins,
    selectedToken,
    tokenAmount,
    conversionStatus,
    loadStablecoins,
    loadUserBalance,
    selectToken,
    resetTransaction,
  } = useOnRampStore();

  const [showSummary, setShowSummary] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    loadStablecoins();
    loadUserBalance();
  }, []);

  const handleContinue = () => {
    setShowSummary(true);
  };

  const handleProceedToPayment = () => {
    setShowSummary(false);
    setShowConfirmation(true);
  };

  const handleStartNew = () => {
    resetTransaction();
    setShowSummary(false);
    setShowConfirmation(false);
  };

  // Close confirmation modal when transaction is confirmed
  useEffect(() => {
    if (conversionStatus === "CONFIRMED") {
      setShowConfirmation(false);
    }
  }, [conversionStatus]);

  // Success Screen
  if (conversionStatus === "CONFIRMED") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <span className="text-4xl text-green-600">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Transaction Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your tokens have been credited
            </p>

            <TransactionStatus />

            <button
              onClick={handleStartNew}
              className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Start New Transaction
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Processing Screen
  if (conversionStatus === "PENDING") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Transaction
            </h2>
            <p className="text-gray-600">
              Please wait while we send your tokens...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Purchase Page
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Token Selection (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Buy Stable Coins
              </h1>

              <div className="space-y-3">
                {stablecoins.map((token) => (
                  <StablecoinCard
                    key={token.symbol}
                    token={token}
                    isSelected={selectedToken?.symbol === token.symbol}
                    onSelect={selectToken}
                  />
                ))}
              </div>

              <button
                onClick={() => window.history.back()}
                className="mt-6 px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Right Column - Purchase Summary (1/3 width, sticky) */}
          <div className="lg:col-span-1">
            <PurchaseSummaryPanel onContinue={handleContinue} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <SummaryModal
        open={showSummary}
        onClose={() => setShowSummary(false)}
        onProceed={handleProceedToPayment}
        token={selectedToken}
        amount={tokenAmount}
      />

      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        token={selectedToken}
        amount={tokenAmount}
      />

      {/* Animations */}
      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}