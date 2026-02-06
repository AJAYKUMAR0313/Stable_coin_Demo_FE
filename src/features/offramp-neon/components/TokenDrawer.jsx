import { useOfframpStore } from "../offrampStore";

export default function TokenDrawer() {
  const { 
    tokenDrawerOpen, 
    closeTokenDrawer, 
    availableTokens, 
    selectedToken,
    selectToken,
    conversionRates 
  } = useOfframpStore();

  const handleSelectToken = (token) => {
    selectToken(token);
    closeTokenDrawer();
  };

  if (!tokenDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeTokenDrawer}
      />

      {/* Drawer */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
        style={{
          background: '#0a0e1a',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          maxHeight: '80vh',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 rounded-full bg-gray-600" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">Select Token</h3>
        </div>

        {/* Token List */}
        <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
          {availableTokens.map((token) => {
            const rate = conversionRates[token.symbol]?.rateInr || 0;
            const isSelected = selectedToken?.symbol === token.symbol;

            return (
              <button
                key={token.symbol}
                onClick={() => handleSelectToken(token)}
                className={`w-full p-4 mb-3 rounded-2xl flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500'
                    : 'bg-[#141e3c] border-2 border-transparent hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Token Icon */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {token.symbol[0]}
                  </div>

                  {/* Token Info */}
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg">
                      {token.symbol}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {token.name}
                    </div>
                  </div>
                </div>

                {/* Balance & Rate */}
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {token.balance}
                  </div>
                  <div className="text-gray-400 text-sm">
                    ₹{rate.toLocaleString('en-IN')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}