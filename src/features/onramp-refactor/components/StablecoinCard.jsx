export default function StablecoinCard({ token, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(token)}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-200
        flex items-center justify-between
        hover:bg-blue-50 hover:border-blue-300
        ${isSelected 
          ? 'bg-blue-50 border-blue-500 shadow-sm' 
          : 'bg-white border-gray-200'
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Token Icon Circle */}
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
        `}>
          {token.symbol[0]}
        </div>

        {/* Token Info */}
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{token.symbol}</span>
            {isSelected && (
              <span className="text-blue-500 text-lg">✓</span>
            )}
          </div>
          <div className="text-sm text-gray-600">{token.name}</div>
          <div className="text-xs text-gray-500">Stable coins</div>
        </div>
      </div>

      {/* Rate Display */}
      <div className="text-right">
        <div className="font-semibold text-gray-900">₹{token.rateInr}</div>
        <div className="text-xs text-gray-500">/token</div>
      </div>
    </button>
  );
}