import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

export default function SummaryModal({ open, onClose, onProceed, token, amount }) {
  if (!token || !amount) return null;

  const total = Number(amount) * token.rateInr;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Order Summary
        </h2>

        {/* Token Display Card */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
            <div>
              <div className="text-sm text-gray-600 mb-1">Token</div>
              <div className="text-lg font-semibold text-gray-900">{token.name}</div>
              <div className="text-sm text-gray-600">{token.symbol}</div>
            </div>
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-xl font-bold text-gray-700 shadow-sm">
              {token.symbol[0]}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-gray-900">
                {amount} {token.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rate</span>
              <span className="text-gray-900">₹{token.rateInr} per token</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Platform Fee</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <div className="text-3xl font-bold text-gray-900">
                ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Modal>
  );
}