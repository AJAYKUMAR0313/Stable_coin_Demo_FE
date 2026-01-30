import { useState } from "react";
import { useOfframpStore } from "../offrampStore";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import RatePreview from "./RatePreview";
import BankAccountSelector from "./BankAccountSelector";

export default function OfframpForm({ onContinue }) {
  const { selectedToken, amount, selectedBankAccount } = useOfframpStore();
  
  const [amountError, setAmountError] = useState(null);

  const isFormValid = () => {
    return (
      selectedToken &&
      amount &&
      Number(amount) > 0 &&
      !amountError &&
      selectedBankAccount
    );
  };

  const handleContinue = () => {
    if (isFormValid()) {
      onContinue();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Withdrawal Details
      </h2>

      {/* Token Selector */}
      <TokenSelector />

      {/* Amount Input */}
      <AmountInput
        error={amountError}
        setError={setAmountError}
      />

      {/* Rate Preview */}
      <RatePreview />

      {/* Bank Account Selector */}
      <BankAccountSelector />

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isFormValid()}
        className="w-full py-4 px-6 bg-black text-white text-base font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Continue to Review
      </button>

      {/* Helper Text */}
      {!isFormValid() && (
        <p className="mt-3 text-center text-xs text-gray-500">
          {!selectedToken && "Select a token"}
          {selectedToken && !amount && " • Enter amount"}
          {selectedToken && amount && amountError && " • Fix amount"}
          {selectedToken && amount && !amountError && !selectedBankAccount && " • Select or add bank account"}
        </p>
      )}
    </div>
  );
}