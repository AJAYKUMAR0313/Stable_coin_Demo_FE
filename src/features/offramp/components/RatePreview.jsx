import { useOfframpStore } from "../offrampStore";

export default function RatePreview() {
  const { amount, selectedToken, conversionRates } = useOfframpStore();

  if (!amount || !selectedToken || amount <= 0) return null;

  const rate = conversionRates[selectedToken.symbol]?.rateInr || 0;
  const subtotal = Number(amount) * rate;
  const platformFee = 0; // Set to 0 for free
  const total = subtotal - platformFee;

  return (
    <div className="mt-6 mb-8 p-5 bg-green-50 border-2 border-green-500 rounded-xl">
      <p className="text-xs text-gray-600 mb-3">Conversion Preview</p>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">You're selling</span>
          <span className="text-sm font-semibold text-gray-900">
            {amount} {selectedToken.symbol}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Conversion Rate</span>
          <span className="text-sm text-gray-900">
            ₹{rate.toFixed(2)} per {selectedToken.symbol}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm text-gray-900">
            ₹{subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between mb-3">
          <span className="text-sm text-gray-600">Platform Fee</span>
          <span className="text-sm text-green-600 font-medium">
            {platformFee === 0 ? "Free" : `₹${platformFee}`}
          </span>
        </div>

        <div className="pt-3 border-t-2 border-green-500 flex justify-between items-center">
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
    </div>
  );
}