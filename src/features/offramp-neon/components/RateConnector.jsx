import { useOfframpStore } from "../offrampStore";

export default function RateConnector() {
  const { selectedToken, conversionRates } = useOfframpStore();

  if (!selectedToken) return (
    <div className="flex flex-col items-center my-6">
      <div className="text-gray-600 text-2xl">↓</div>
    </div>
  );

  const rate = conversionRates[selectedToken.symbol]?.rateInr || 0;

  return (
    <div className="flex flex-col items-center my-3">
      {/* Arrow */}
      <div className="text-gray-500 text-2xl mb-2">↓</div>
      
      {/* Rate Pill */}
      <div 
        className="px-6 py-3 rounded-full animate-pulse-rate"
        style={{
          background: 'rgba(20, 30, 60, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="text-sm text-white font-medium">
          1 {selectedToken.symbol} ≈ ₹{rate.toLocaleString('en-IN')}
        </div>
      </div>
      
      {/* Arrow */}
      <div className="text-gray-500 text-2xl mt-2">↓</div>
    </div>
  );
}