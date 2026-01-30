import { useEffect } from "react";
import { useOfframpStore } from "../offrampStore";

export default function TokenSelector() {
  const { 
    availableTokens, 
    selectedToken, 
    selectToken, 
    loadAvailableTokens,
    conversionRates
  } = useOfframpStore();

  useEffect(() => {
    loadAvailableTokens();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Select Token to Sell
      </label>

      <div className="relative">
        <select
          value={selectedToken?.symbol || ""}
          onChange={(e) => {
            const token = availableTokens.find(t => t.symbol === e.target.value);
            selectToken(token);
          }}
          className="w-full px-4 py-1.5 text-base border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none appearance-none bg-white cursor-pointer transition-colors"
        >
          <option value="">Choose a token</option>
          {availableTokens.map(token => {
            const rate = conversionRates[token.symbol]?.rateInr || 0;
            return (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name} ({token.balance} available @ ₹{rate})
              </option>
            );
          })}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
          ▼
        </div>
      </div>

      {/* Selected Token Info */}
      {selectedToken && (
        <div className="mt-1 p-1.5 bg-gray-50 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {selectedToken.name}
            </div>
            <div className="text-xs text-gray-500">
              {selectedToken.symbol}
            </div>
          </div>
          <div className="text-right">
            <div className="text-base font-semibold text-gray-900">
              {selectedToken.balance}
            </div>
            <div className="text-xs text-gray-500">
              Available
            </div>
          </div>
        </div>
      )}
    </div>
  );
}