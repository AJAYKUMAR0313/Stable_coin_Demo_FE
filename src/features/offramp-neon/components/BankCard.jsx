import { useOfframpStore } from "../offrampStore";

export default function BankCard() {
  const { selectedToken, amount, conversionRates, connectedAccount } = useOfframpStore();

  const rate = selectedToken ? conversionRates[selectedToken.symbol]?.rateInr || 0 : 0;
  const total = amount && rate ? (Number(amount) * rate).toFixed(2) : 0;

  return (
    <div 
      className="relative p-6 rounded-3xl animate-breathe"
      style={{
        background: 'rgba(20, 30, 60, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        animationDelay: '1s'
      }}
    >
      {/* Label */}
      <div className="text-xs text-gray-400 mb-4 tracking-wide">
        Depositing to Bank
      </div>

      {/* Amount Display */}
      <div className="mb-4">
        <div className="text-5xl font-bold text-white">
          ₹{total ? Number(total).toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '0'}
        </div>
      </div>

      {/* Bank Info */}
      {connectedAccount && (
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          <span className="text-lg">🏦</span>
          <span>{connectedAccount.type} {connectedAccount.number}</span>
        </div>
      )}

      {/* Fee */}
      <div className="text-sm">
        <span className="text-gray-400">Fee: </span>
        <span className="text-green-400 font-semibold">₹0.00</span>
      </div>
    </div>
  );
}