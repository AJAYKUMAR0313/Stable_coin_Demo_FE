import { useState } from "react";
import { useOfframpStore } from "../offrampStore";
import OfframpForm from "../components/OfframpForm";
import OfframpSummary from "../components/OfframpSummary";
import OfframpResult from "../components/OfframpResult";

export default function OfframpPage() {
  const [step, setStep] = useState("input"); // 'input' | 'confirm' | 'result'
  const { withdrawalStatus, resetWithdrawal } = useOfframpStore();

  const handleContinue = () => {
    setStep("confirm");
  };

  const handleBack = () => {
    setStep("input");
  };

  const handleConfirm = async () => {
    setStep("result");
  };

  const handleNewWithdrawal = () => {
    resetWithdrawal();
    setStep("input");
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-2 py-2">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sell Tokens
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Convert your tokens to INR and withdraw to bank
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {/* Step 1 */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition-all ${
            step === "input" 
              ? "bg-black text-white" 
              : step === "confirm" || step === "result"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}>
            {step === "input" ? "1" : "✓"}
          </div>
          <span className="hidden sm:inline text-sm text-gray-600">Details</span>
        </div>

        <div className={`w-12 sm:w-16 h-0.5 transition-colors ${
          step === "confirm" || step === "result" ? "bg-green-500" : "bg-gray-200"
        }`} />

        {/* Step 2 */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition-all ${
            step === "confirm" 
              ? "bg-black text-white" 
              : step === "result"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}>
            {step === "result" ? "✓" : "2"}
          </div>
          <span className="hidden sm:inline text-sm text-gray-600">Review</span>
        </div>

        <div className={`w-12 sm:w-16 h-0.5 transition-colors ${
          step === "result" ? "bg-green-500" : "bg-gray-200"
        }`} />

        {/* Step 3 */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition-all ${
            step === "result" ? "bg-black text-white" : "bg-gray-200 text-gray-600"
          }`}>
            3
          </div>
          <span className="hidden sm:inline text-sm text-gray-600">Complete</span>
        </div>
      </div>

      {/* Content based on step */}
      {step === "input" && (
        <OfframpForm onContinue={handleContinue} />
      )}

      {step === "confirm" && (
        <OfframpSummary 
          onBack={handleBack}
          onConfirm={handleConfirm}
        />
      )}

      {step === "result" && (
        <OfframpResult
          onNewWithdrawal={handleNewWithdrawal}
          onGoToDashboard={handleGoToDashboard}
        />
      )}
    </div>
  );
}