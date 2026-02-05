import { useEffect, useState } from "react";
import { useOnRampStore } from "../onrampStore";
import StablecoinCard from "../components/StablecoinCard";
import PurchaseSummaryPanel from "../components/PurchaseSummaryPanel";
import SummaryModal from "../components/SummaryModal";
import ConfirmationModal from "../components/ConfirmationModal";
import TransactionStatus from "../components/TransactionStatus";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      <div
        className="min-h-screen bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]
      flex items-center justify-center p-6 text-white"
      >
        <div
          className="max-w-md w-full bg-white/10 backdrop-blur-xl
        border border-white/15 rounded-2xl shadow-2xl p-8 text-center"
        >
          <div
            className="w-20 h-20 bg-green-400/20 rounded-full
          flex items-center justify-center mx-auto mb-4 animate-scale-in"
          >
            <span className="text-4xl text-green-400">✓</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Transaction Successful</h2>
          <p className="text-white/70 mb-6">
            Your tokens have been credited to your wallet
          </p>

          <TransactionStatus />

          <button
            onClick={handleStartNew}
            className="w-full mt-6 px-4 py-3
          bg-gradient-to-r from-cyan-400 to-blue-600
          text-black font-semibold rounded-xl
          hover:scale-105 transition"
          >
            Start New Transaction
          </button>
        </div>
      </div>
    );
  }

  // Processing Screen
  if (conversionStatus === "PENDING") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]
      flex items-center justify-center p-6 text-white"
      >
        <div
          className="max-w-md w-full bg-white/10 backdrop-blur-xl
        border border-white/15 rounded-2xl shadow-2xl p-8 text-center"
        >
          <div
            className="w-16 h-16 border-4 border-white/20
          border-t-cyan-400 rounded-full animate-spin mx-auto mb-6"
          />

          <h2 className="text-2xl font-bold mb-2">Processing Transaction</h2>
          <p className="text-white/70">
            Please wait while we send your tokens…
          </p>
        </div>
      </div>
    );
  }

  // Main Purchase Page
 return (
  <div className="min-h-screen text-white
    bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]">

    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT – TOKEN SELECTION */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-xl
            border border-white/15 rounded-2xl shadow-2xl p-6">

            <h1 className="text-3xl font-bold mb-6">
              Buy Stablecoins
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
              onClick={() => navigate("/dashboard/stablecoin")}
              className="mt-6 px-6 py-2
              bg-white/10 border border-white/15
              text-white/80 rounded-lg
              hover:bg-white/20 transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <PurchaseSummaryPanel onContinue={handleContinue} />
          </div>
        </div>
      </div>
    </div>

    {/* Modals stay the same */}
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
  </div>
);

}
