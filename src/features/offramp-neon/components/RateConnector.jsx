import { useOfframpStore } from "../offrampStore";

export default function RateConnector() {
  const { selectedToken, conversionRates } = useOfframpStore();

  if (!selectedToken) return (
    <div className="flex flex-col md:flex-row items-center justify-center my-6 md:my-0 md:mx-6">
      <div className="text-gray-600 text-2xl md:hidden">↓</div>
      <div className="text-gray-600 text-2xl hidden md:block">→</div>
    </div>
  );

  const rate = conversionRates[selectedToken.symbol]?.rateInr || 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-3 md:my-0 md:mx-4 relative z-20">
      
      {/* Mobile Arrow (Down) */}
      <div className="text-gray-500 text-2xl mb-2 md:hidden">↓</div>
      
      {/* Desktop Arrow (Left) */}
      <div className="text-gray-500 text-2xl mr-2 hidden md:block">→</div>
      
      {/* Rate Pill */}
      <div 
        className="px-6 py-3 rounded-full animate-pulse-rate whitespace-nowrap"
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
      
      {/* Mobile Arrow (Down) */}
      <div className="text-gray-500 text-2xl mt-2 md:hidden">↓</div>

      {/* Desktop Arrow (Right) */}
      <div className="text-gray-500 text-2xl ml-2 hidden md:block">→</div>
    </div>
  );
}