import { useOfframpStore } from "../offrampStore";

export default function CryptoCard() {
  const { 
    selectedToken, 
    amount, 
    setAmount,
    setMaxAmount,
    openTokenDrawer,
    hasInsufficientBalance 
  } = useOfframpStore();

  const isInsufficientBalance = hasInsufficientBalance();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div 
      className="relative p-6 rounded-3xl animate-breathe"
      style={{
        background: 'rgba(20, 30, 60, 0.4)',
        backdropFilter: 'blur(20px)',
        border: isInsufficientBalance 
          ? '1px solid rgba(239, 68, 68, 0.5)' 
          : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isInsufficientBalance
          ? '0 8px 32px rgba(239, 68, 68, 0.2), 0 0 20px rgba(239, 68, 68, 0.3)'
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Label */}
      <div className="text-xs text-gray-400 mb-4 tracking-wide">
        Selling from Wallet
      </div>

      {/* Amount Input */}
      <div className="mb-4 relative">
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          disabled={!selectedToken}
          className={`w-full bg-transparent text-5xl font-bold text-white outline-none placeholder-gray-700 ${
            !selectedToken ? 'cursor-not-allowed opacity-50' : ''
          }`}
        />
        
        {/* Token Selector & MAX */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3">
          {selectedToken && (
            <button
              onClick={setMaxAmount}
              className="text-xs font-semibold text-pink-500 hover:text-pink-400 transition-colors"
            >
              MAX
            </button>
          )}
          
          <button
            onClick={openTokenDrawer}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              selectedToken 
                ? 'bg-[#141e3c] text-white border border-pink-500'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            <span className="font-semibold">
              {selectedToken ? selectedToken.symbol : 'Select'}
            </span>
            <span className="text-xs">▼</span>
          </button>
        </div>
      </div>

      {/* Balance */}
      {selectedToken && (
        <div className="text-sm text-gray-400">
          Balance: <span className="text-white font-semibold">{selectedToken.balance} {selectedToken.symbol}</span>
        </div>
      )}

      {/* Error Message */}
      {isInsufficientBalance && (
        <div className="mt-3 flex items-center gap-2 text-red-400 text-sm animate-shake">
          <span>⚠️</span>
          <span>Exceeds balance</span>
        </div>
      )}

      {!selectedToken && (
        <div className="text-sm text-gray-500 mt-3">
          Select a token to continue
        </div>
      )}
    </div>
  );
}