export default function StablecoinCard({ token, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(token)}
      className={`
        w-[92%] mx-auto px-3 py-2.5 rounded-xl border-2
        flex items-center justify-between
        transition-all duration-300 ease-out
        transform
        hover:-translate-y-0.5 hover:shadow-md
        active:scale-[0.98]
        ${
          isSelected
            ? 'bg-blue-50 border-blue-500 shadow-sm ring-2 ring-blue-100'
            : 'bg-white border-gray-200 hover:bg-blue-50/40 hover:border-blue-300'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Token Icon */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            text-sm font-bold transition-all duration-300
            ${
              isSelected
                ? 'bg-blue-500 text-white scale-105'
                : 'bg-gray-100 text-gray-700'
            }
          `}
        >
          {token.symbol[0]}
        </div>

        {/* Token Info */}
        <div className="text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-900 text-sm">
              {token.symbol}
            </span>

            {isSelected && (
              <span className="text-blue-500 text-sm animate-pulse">✓</span>
            )}
          </div>

          <div className="text-xs text-gray-600">{token.name}</div>
          <div className="text-[11px] text-gray-400">Stablecoin</div>
        </div>
      </div>

      {/* Rate */}
      <div className="text-right leading-tight">
        <div className="font-semibold text-gray-900 text-sm">
          ₹{token.rateInr}
        </div>
        <div className="text-[11px] text-gray-500">/token</div>
      </div>
    </button>
  );
}
