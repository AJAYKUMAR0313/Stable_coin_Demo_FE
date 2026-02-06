import { useState, useEffect, useRef } from "react";
import { useOfframpStore } from "../offrampStore";

export default function BankCard() {
  const { 
    selectedToken, 
    amount, 
    setAmount, 
    conversionRates, 
    connectedAccount 
  } = useOfframpStore();

  const rate = selectedToken ? conversionRates[selectedToken.symbol]?.rateInr || 0 : 0;
  
  // 1. Local state for smooth typing (prevents the input from "jumping" or fighting you)
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef(null);
  const isTypingRef = useRef(false);

  // 2. Sync from Store to Local State (Only when NOT typing)
  useEffect(() => {
    if (isTypingRef.current) return;

    if (!amount || parseFloat(amount) === 0) {
      setDisplayValue(""); // Clear input if amount is 0/empty
    } else {
      const fiat = (parseFloat(amount) * rate).toFixed(2);
      setDisplayValue(fiat);
    }
  }, [amount, rate]);

  const handleFocus = () => {
    isTypingRef.current = true;
  };

  const handleBlur = () => {
    isTypingRef.current = false;
    // Re-sync on blur to ensure precision formatting
    if (amount && parseFloat(amount) !== 0) {
      setDisplayValue((parseFloat(amount) * rate).toFixed(2));
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    
    // Allow valid inputs (empty, numbers, decimals)
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setDisplayValue(val);

      if (val === "" || parseFloat(val) === 0) {
        setAmount("");
      } else if (rate > 0) {
        // Update global store with crypto equivalent
        const cryptoAmount = (parseFloat(val) / rate).toFixed(6);
        setAmount(cryptoAmount);
      }
    }
  };

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
      <div className="text-xs text-gray-400 mb-4 tracking-wide">
        Depositing to Bank
      </div>

      <div className="mb-4 flex items-center">
        {/* Only show ₹ symbol if there is a value or focused, helps cleaner UI */}
        <span className={`text-5xl font-bold text-white mr-1 transition-opacity ${displayValue ? 'opacity-100' : 'opacity-50'}`}>₹</span>
        
        <input 
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="0.00"
          disabled={!selectedToken}
          className={`w-full bg-transparent text-5xl font-bold text-white outline-none placeholder-gray-700 ${
            !selectedToken ? 'cursor-not-allowed opacity-50' : ''
          }`}
        />
      </div>

      {connectedAccount && (
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          <span className="text-lg">🏦</span>
          <span>{connectedAccount.type} {connectedAccount.number}</span>
        </div>
      )}

      <div className="text-sm">
        <span className="text-gray-400">Fee: </span>
        <span className="text-green-400 font-semibold">₹0.00</span>
      </div>
    </div>
  );
}