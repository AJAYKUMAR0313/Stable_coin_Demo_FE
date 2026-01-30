import { useOfframpStore } from "../offrampStore";

export default function OfframpSummary({ onBack, onConfirm }) {
  const { amount, selectedToken, selectedBankAccount, conversionRates } = useOfframpStore();

  const rate = conversionRates[selectedToken.symbol]?.rateInr || 0;
  const subtotal = Number(amount) * rate;
  const platformFee = 0;
  const total = subtotal - platformFee;
  const remainingBalance = (selectedToken.balance - Number(amount)).toFixed(6);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Review Withdrawal
      </h2>

      <div className="bg-gray-50 rounded-xl p-6 sm:p-7 mb-8">
        {/* Token & Amount Section */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">Token</span>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {selectedToken.name}
              </div>
              <div className="text-xs text-gray-500">
                {selectedToken.symbol}
              </div>
            </div>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="text-lg font-bold text-gray-900">
              {amount} {selectedToken.symbol}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-600">Conversion Rate</span>
            <span className="text-sm text-gray-900">
              ₹{rate.toFixed(2)} per {selectedToken.symbol}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm text-gray-900">
              ₹{subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-600">Platform Fee</span>
            <span className="text-sm text-green-600 font-medium">Free</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t-2 border-gray-200 pt-4 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">
              You'll Receive
            </span>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-4" />

        {/* Bank Account Details */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-3">Bank Account</p>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="mb-2">
              <div className="text-base font-semibold text-gray-900">
                {selectedBankAccount.accountHolder}
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-1">
              {selectedBankAccount.bankName}
            </div>

            <div className="text-sm text-gray-600 font-mono mb-1">
              {selectedBankAccount.accountNumber.length > 10 
                ? `****${selectedBankAccount.accountNumber.slice(-4)}`
                : selectedBankAccount.accountNumber}
            </div>

            <div className="text-xs text-gray-500">
              IFSC: {selectedBankAccount.ifscCode} • {selectedBankAccount.accountType}
            </div>
          </div>
        </div>

        {/* Balance Info */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Current Balance</span>
            <span className="text-sm font-semibold text-gray-900">
              {selectedToken.balance} {selectedToken.symbol}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm font-semibold text-gray-900">After Withdrawal</span>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {remainingBalance} {selectedToken.symbol}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-6">
        <p className="text-sm text-yellow-800 mb-2">
          <strong>⚠️ Important:</strong> Please verify your bank account details carefully.
        </p>
        <p className="text-xs text-yellow-700">
          Funds will arrive in your bank account within 1-3 business days. This transaction cannot be reversed.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-6 bg-white text-black border-2 border-gray-200 text-base font-semibold rounded-xl hover:border-black transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-4 px-6 bg-black text-white text-base font-semibold rounded-xl hover:bg-gray-800 transition-all"
        >
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
}